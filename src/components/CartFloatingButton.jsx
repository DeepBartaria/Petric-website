import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FiShoppingCart, FiChevronRight } from 'react-icons/fi';

/**
 * Floating cart button (bottom-center).
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
      className={`fixed z-50 bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 group bg-[#FFD000] text-black rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-between px-4 md:px-5 py-2 md:py-2.5 h-14 md:h-auto transition-transform hover:scale-105 active:scale-95 w-[210px] sm:w-[240px] md:w-[320px] ${
        shake ? 'animate-cart-shake' : ''
      }`}
    >
      <div className="flex items-center gap-2 md:gap-4">
        {/* Shopping Cart Icon */}
        <FiShoppingCart className="w-5 h-5 md:w-6 md:h-6 shrink-0" strokeWidth={2.5} />
        
        {/* Texts */}
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[14px] md:text-[17px] font-black">View Cart</span>
          <span className="text-[10px] md:text-[13px] font-bold">{itemCount} Item{itemCount !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Right Arrow Button */}
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-[1.5px] border-black flex items-center justify-center shrink-0 group-hover:bg-[#f5c600] transition-colors">
        <FiChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" strokeWidth={2} />
      </div>
    </button>
  );
});

export default CartFloatingButton;
