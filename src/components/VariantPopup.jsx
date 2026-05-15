import React, { useState, useEffect } from 'react';
import { FiX, FiCheck } from 'react-icons/fi';

export default function VariantPopup({ isOpen, onClose, product, onAddToCart }) {
  const [isClosing, setIsClosing] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    if (isOpen && product?.variants?.length > 0) {
      const defaultVariant = product.variants.find(v => v.weight === product.weight) || product.variants[0];
      setSelectedVariant(defaultVariant);
    } else {
        setSelectedVariant(null);
    }
  }, [isOpen, product]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 400);
  };

  const handleAdd = () => {
    if (selectedVariant && product) {
      onAddToCart({
        ...product,
        id: `${product.id}-${selectedVariant.weight}`,
        weight: selectedVariant.weight,
        price: selectedVariant.price,
        oldPrice: selectedVariant.oldPrice,
        discount: selectedVariant.discount
      });
      handleClose();
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-400 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-3xl md:rounded-3xl md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md shadow-2xl transition-all duration-400 ${
          isClosing
            ? 'translate-y-full md:translate-y-[100%] md:opacity-0 md:scale-95'
            : 'translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100'
        }`}
      >
        <div className="relative p-6 flex flex-col h-full max-h-[85vh]">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors z-10"
            aria-label="Close popup"
          >
            <FiX className="w-5 h-5 text-gray-700" />
          </button>

          <h3 className="text-xl font-bold text-gray-900 mb-4 pr-8">Select Variant</h3>
          
          {product && (
            <>
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 flex items-center justify-center shrink-0">
                  <img src={product.img} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h4 className="font-bold text-sm md:text-base text-gray-800 line-clamp-2">{product.name}</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-lg text-black">{selectedVariant?.price || product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{selectedVariant?.oldPrice || product.oldPrice}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto mb-6 flex-grow pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="space-y-3">
                  {product.variants?.map((variant, idx) => {
                    const isSelected = selectedVariant?.weight === variant.weight;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedVariant(variant)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected ? 'border-[#FFD000] bg-[#FFD000]/10' : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{variant.weight}</span>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-semibold text-sm text-black">{variant.price}</span>
                            <span className="text-xs text-gray-400 line-through">{variant.oldPrice}</span>
                            <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 px-1.5 py-0.5 rounded">{variant.discount} OFF</span>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          isSelected ? 'border-[#FFD000] bg-[#FFD000]' : 'border-gray-300'
                        }`}>
                          {isSelected && <FiCheck className="w-4 h-4 text-black" strokeWidth={3} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-[#FFD000] text-black font-bold text-lg py-4 rounded-xl hover:bg-[#ffdb33] transition-all hover:shadow-lg active:scale-95"
              >
                Add to Cart
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
