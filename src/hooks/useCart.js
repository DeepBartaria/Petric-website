import { useState, useEffect, useCallback } from 'react';
import {
  getBackendProductCart,
  addProductToBackendCart,
  updateBackendCartQuantity,
  removeBackendCartProduct,
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

    // Always fetch fresh — protects against app/web concurrent edits
    const current = await getBackendProductCart();
    const currentItems = current?.cartItems || [];

    const productId = product.productId || product.id || product._id;
    const variantId = product.variantId || null;
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
    setIsCartOpen(true);
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