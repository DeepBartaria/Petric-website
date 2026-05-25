import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';

/**
 * Floating cart button (bottom-right).
 *
 * Animation props added:
 *   shake {boolean} — triggers the cart-shake keyframe when true
 *
 * The ref is forwarded so useCartAnimation can read its position to aim the
 * flying product image at it.
 */
const CartFloatingButton = forwardRef(function CartFloatingButton(
  { cartItems = [], isCartOpen = false, isOrdersOpen = false, onClick, shake = false },
  ref
) {
  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  // Detect count changes → pop badge animation
  const prevCountRef = useRef(itemCount);
  const [countPop, setCountPop] = useState(false);

  useEffect(() => {
    if (itemCount !== prevCountRef.current && itemCount > 0) {
      prevCountRef.current = itemCount;
      setCountPop(false);
      // Force animation restart via a double-rAF
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setCountPop(true))
      );
    } else {
      prevCountRef.current = itemCount;
    }
  }, [itemCount]);

  if (itemCount < 1 || isCartOpen || isOrdersOpen) return null;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      data-cart-button=""
      aria-label="Open My Cart"
      className="hidden md:block fixed z-50 bottom-6 right-6 group"
    >
      {/* Count badge — pops when the number increments */}
      <span
        className={`absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#FFD000] text-black text-xs font-bold rounded-full flex items-center justify-center shadow-md${
          countPop ? ' animate-count-pop' : ''
        }`}
        onAnimationEnd={() => setCountPop(false)}
      >
        {itemCount}
      </span>

      {/* Cart icon circle — shakes when a flying item lands */}
      <span
        className={`w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center transition group-hover:scale-110${
          shake ? ' animate-cart-shake' : ''
        }`}
      >
        <FiShoppingCart className="w-6 h-6" />
      </span>
    </button>
  );
});

export default CartFloatingButton;
