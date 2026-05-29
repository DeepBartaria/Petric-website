import { useState, useEffect, useCallback } from 'react';
import { trackAddToCart } from '../helper/metaPixel';
import {
  getBackendProductCart,
  addProductToBackendCart,
  updateBackendCartQuantity,
  removeBackendCartProduct,
  getStoredDeliveryLocation,
  checkProductAvailableForLocation,
} from '../api/cartApi';

const isLoggedIn = () => Boolean(localStorage.getItem('petric_token'));

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [pendingCartProduct, setPendingCartProduct] = useState(null);

  const syncCartFromBackend = useCallback(async () => {
    const response = await getBackendProductCart();
    const items = response?.type === 'success' ? response.cartItems : [];
    setCartItems(items);
    return items;
  }, []);

  

  // Initial sync on mount (and whenever login state changes — re-mounts will pick this up)
  useEffect(() => {
    if (isLoggedIn()) syncCartFromBackend();
  }, [syncCartFromBackend]);

  useEffect(() => {
    const handleCartUpdated = async (event) => {
      if (event.detail?.cartItems) {
        setCartItems(event.detail.cartItems);
        return;
      }

      if (isLoggedIn()) {
        await syncCartFromBackend();
      }
    };

    window.addEventListener('cartUpdated', handleCartUpdated);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdated);
    };
  }, [syncCartFromBackend]);

  // Add to cart — checks current cart first so duplicates increment instead of stacking
  const addProductToCart = useCallback(async (product) => {
    if (!isLoggedIn()) {
      setPendingCartProduct(product);
      setIsCartOpen(true);
      window.dispatchEvent(new CustomEvent('openCart', { detail: { step: 'mobile' } }));
      return { type: 'pending-login' };
    }

    const productId = product.productId || product.id || product._id;
    const variantId = product.variantId || null;

    if (!variantId) {
      alert('Please select a product variant before adding to cart.');
      return { type: 'error', message: 'Variant is required' };
    }

    const deliveryLocation = getStoredDeliveryLocation();

    if (!deliveryLocation) {
      setPendingCartProduct(product);
      setIsCartOpen(false);
      window.dispatchEvent(new CustomEvent('openDeliveryLocation'));
      return { type: 'pending-location' };
    }

    const availability = await checkProductAvailableForLocation({
      productId,
      variantId,
      lat: deliveryLocation.lat,
      lng: deliveryLocation.lng,
    });

    if (availability?.type !== 'success') {
      alert(availability?.message || 'This product is not available at your delivery location.');
      return availability;
    }

    const addQty = product.quantity || 1;

    // --- Optimistic UI Update ---
    let nextCart;
    const existingInPrev = cartItems.find(
      (i) => String(i.productId) === String(productId) &&
             (i.variantId ? String(i.variantId) : null) === (variantId ? String(variantId) : null)
    );

    if (existingInPrev) {
      nextCart = cartItems.map((item) => 
        (String(item.productId) === String(productId) && (item.variantId ? String(item.variantId) : null) === (variantId ? String(variantId) : null))
          ? { ...item, quantity: item.quantity + addQty }
          : item
      );
    } else {
      const newItem = {
        id: `temp-${Date.now()}`,
        productId: String(productId),
        variantId: variantId ? String(variantId) : null,
        quantity: addQty,
        name: product.name || '',
        img: product.img || product.productImage || '',
        weight: product.weight || product.variantName || product.unit || '',
        price: String(product.price || product.discountedPrice || '0'),
        oldPrice: String(product.oldPrice || product.originalPrice || '0'),
        product: { name: product.name, productImage: product.img },
        variant: { name: product.weight, discountedPrice: product.discountedPrice || product.price, originalPrice: product.originalPrice || product.oldPrice }
      };
      nextCart = [...cartItems, newItem];
    }
    
    setCartItems(nextCart);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: nextCart } }));

    // --- Background Network Request ---
    const current = await getBackendProductCart();
    const currentItems = current?.cartItems || [];
    const existing = currentItems.find(
      (i) => String(i.productId) === String(productId) &&
             (i.variantId ? String(i.variantId) : null) === (variantId ? String(variantId) : null)
    );

    let resp;
    if (existing) {
      resp = await updateBackendCartQuantity({
        productId,
        variantId,
        quantity: existing.quantity + addQty,
      });
    } else {
      resp = await addProductToBackendCart(product);
    }

    if (resp?.type !== 'success') {
      alert(resp?.message || 'Failed to add product to cart');
      const syncedItems = await syncCartFromBackend();
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: syncedItems } }));
      return resp;
    }
    
    trackAddToCart(product);
    
    const syncedItems = await syncCartFromBackend();
    window.dispatchEvent(
      new CustomEvent('cartUpdated', {
        detail: { cartItems: syncedItems },
      })
    );

    return resp;
  }, [cartItems, syncCartFromBackend]);

  // +/- and remove — always hits backend, then re-syncs
  const handleUpdateQuantity = useCallback(async (id, newQuantity) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    // --- Optimistic UI Update ---
    let nextCart;
    if (newQuantity < 1) {
      nextCart = cartItems.filter((i) => i.id !== id);
    } else {
      nextCart = cartItems.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i));
    }
    
    setCartItems(nextCart);
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: nextCart } }));
    if (nextCart.length === 0) setIsCartOpen(false);

    // --- Background Network Request ---
    let resp;
    if (newQuantity < 1) {
      resp = await removeBackendCartProduct({
        productId: item.productId,
        variantId: item.variantId,
      });
    } else {
      resp = await updateBackendCartQuantity({
        productId: item.productId,
        variantId: item.variantId,
        quantity: newQuantity,
      });
    }

    if (resp?.type !== 'success' && resp?.message) {
      console.warn('Cart update failed:', resp.message);
      const syncedItems = await syncCartFromBackend();
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: syncedItems } }));
      return;
    }

    const items = await syncCartFromBackend();
    window.dispatchEvent(
      new CustomEvent('cartUpdated', {
        detail: { cartItems: items },
      })
    );
  }, [cartItems, syncCartFromBackend]);

  const handleLoginSuccess = useCallback(async () => {
    if (pendingCartProduct) {
      const result = await addProductToCart(pendingCartProduct);

      if (result?.type !== 'pending-location' && result?.type !== 'pending-login') {
        setPendingCartProduct(null);
      }

      return;
    }

    await syncCartFromBackend();
  }, [pendingCartProduct, addProductToCart, syncCartFromBackend]);

  useEffect(() => {
    const handleDeliveryLocationUpdated = async () => {
      if (!pendingCartProduct) return;

      const productToAdd = pendingCartProduct;
      setPendingCartProduct(null);
      await addProductToCart(productToAdd);
    };

    window.addEventListener('deliveryLocationUpdated', handleDeliveryLocationUpdated);

    return () => {
      window.removeEventListener('deliveryLocationUpdated', handleDeliveryLocationUpdated);
    };
  }, [pendingCartProduct, addProductToCart]);

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    pendingCartProduct,
    setPendingCartProduct,
    addProductToCart,
    handleUpdateQuantity,
    handleLoginSuccess,
    syncCartFromBackend,
  };
}