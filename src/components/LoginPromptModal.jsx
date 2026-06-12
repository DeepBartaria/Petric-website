import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

export default function LoginPromptModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openLoginPrompt', handleOpen);
    return () => window.removeEventListener('openLoginPrompt', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FFD000]">
          <FiAlertCircle className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2 font-serif">Sign In Required</h3>
        <p className="text-gray-600 text-sm mb-6">
          Please sign in to continue adding products to your cart and complete your purchase.
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setIsOpen(false);
              window.dispatchEvent(
                new CustomEvent('openCart', {
                  detail: { step: 'mobile', mode: 'loginOnly' },
                })
              );
            }}
            className="w-full bg-[#FFD000] text-black font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Sign In to Continue
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              // Clear pending cart product if user cancels
              window.dispatchEvent(new CustomEvent('clearPendingCartProduct'));
            }}
            className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
