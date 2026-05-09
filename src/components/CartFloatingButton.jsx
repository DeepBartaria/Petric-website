import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';

export default function CartFloatingButton({ cartItems = [], isCartOpen = false, onClick }) {
  const itemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  if (itemCount < 1 || isCartOpen) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open My Cart"
      className="fixed z-50 bottom-6 right-6 group"
    >
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-[#FFD000] text-black text-xs font-bold rounded-full flex items-center justify-center shadow-md">
        {itemCount}
      </span>
      <span className="w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center transition group-hover:scale-110">
        <FiShoppingCart className="w-6 h-6" />
      </span>
    </button>
  );
}
