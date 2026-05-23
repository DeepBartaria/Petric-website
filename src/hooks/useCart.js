import { useState, useEffect, useCallback } from 'react';
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

    // Always fetch fresh — protects against app/web concurrent edits
    const current = await getBackendProductCart();
    const currentItems = current?.cartItems || [];

    
    const addQty = product.quantity || 1;

    const existing = currentItems.find(
      (i) => i.productId === String(productId) &&
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
      return resp;
    }

    await syncCartFromBackend();
    return resp;
  }, [syncCartFromBackend]);

  // +/- and remove — always hits backend, then re-syncs
  const handleUpdateQuantity = useCallback(async (id, newQuantity) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

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
    }

    const items = await syncCartFromBackend();
    if (items.length === 0) setIsCartOpen(false);
  }, [cartItems, syncCartFromBackend]);

  const handleLoginSuccess = useCallback(async () => {
    if (pendingCartProduct) {
      await addProductToCart(pendingCartProduct);
      setPendingCartProduct(null);
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