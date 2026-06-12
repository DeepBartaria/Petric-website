import React from 'react';
import { FiPackage } from 'react-icons/fi';

export default function OrdersFloatingButton({ isCartOpen = false, isOrdersOpen = false, onClick }) {
  if (isCartOpen || isOrdersOpen) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open My Orders"
      className="fixed z-50 bottom-[5.5rem] right-6 group"
    >
      <span className="w-14 h-14 rounded-full bg-white border border-gray-200 text-black shadow-lg flex items-center justify-center transition group-hover:scale-110 group-hover:bg-gray-50">
        <FiPackage className="w-6 h-6" />
      </span>
    </button>
  );
}
