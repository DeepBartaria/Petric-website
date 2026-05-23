import { useState, useCallback, useRef } from 'react';

/**
 * Manages the add-to-cart animation state:
 *  - flying product image from card → cart button
 *  - cart button shake on landing
 *  - "Added to cart" toast notification
 *
 * Usage:
 *   const { cartRef, flyItems, toasts, cartShake, triggerFlyToCart, onFlyComplete, dismissToast } = useCartAnimation();
 *   <CartFloatingButton ref={cartRef} shake={cartShake} ... />
 *   <CartAnimationLayer flyItems={flyItems} toasts={toasts} onFlyComplete={onFlyComplete} onDismissToast={dismissToast} />
 *   <ProductCard onAnimateToCart={triggerFlyToCart} ... />
 */
export default function useCartAnimation() {
  const cartRef = useRef(null);
  const [flyItems, setFlyItems] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [cartShake, setCartShake] = useState(false);
  const shakeTimerRef = useRef(null);

  /**
   * Call this when the ADD button is clicked.
   * @param {HTMLElement} imageEl  - The <img> (or its container) to fly from
   * @param {string}      imageUrl - src URL used to render the flying clone
   * @param {string}      name     - Product name shown in the toast
   */
  const triggerFlyToCart = useCallback((imageEl, imageUrl, name) => {
    if (!imageEl) return;

    const sourceRect = imageEl.getBoundingClientRect();

    // Resolve cart button position — fall back to bottom-right if not yet visible
    const cartEl = cartRef.current || document.querySelector('[data-cart-button]');
    let endX, endY;
    if (cartEl) {
      const r = cartEl.getBoundingClientRect();
      endX = r.left + r.width / 2;
      endY = r.top + r.height / 2;
    } else {
      endX = window.innerWidth - 52;
      endY = window.innerHeight - 52;
    }

    const id = `fly-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    setFlyItems((prev) => [
      ...prev,
      {
        id,
        imageUrl,
        startX: sourceRect.left + sourceRect.width / 2,
        startY: sourceRect.top + sourceRect.height / 2,
        endX,
        endY,
      },
    ]);

    // Show toast, auto-dismiss after 3.2 s
    setToasts((prev) => [...prev, { id, name }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  /** Called by CartAnimationLayer when a flying image finishes its arc. */
  const onFlyComplete = useCallback((id) => {
    setFlyItems((prev) => prev.filter((i) => i.id !== id));

    // Shake the cart button
    if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
    setCartShake(true);
    shakeTimerRef.current = setTimeout(() => setCartShake(false), 750);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { cartRef, flyItems, toasts, cartShake, triggerFlyToCart, onFlyComplete, dismissToast };
}
