import React, { useEffect, useRef, useState } from 'react';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import useCart from '../hooks/useCart';

export default function VariantPopup({ isOpen, onClose, product, onAddToCart, onAnimateToCart }) {
  const [isClosing, setIsClosing] = useState(false);
  const imageRef = useRef(null);
  const { cartItems, handleUpdateQuantity } = useCart();

  useEffect(() => {
    if (!isOpen) setIsClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const getVariantCartItem = (variant) => {
    const productId = product?.productId || product?.id || product?._id;
    return cartItems.find(
      (item) =>
        String(item.productId) === String(productId) &&
        String(item.variantId || '') === String(variant.id || variant._id || '')
    );
  };

  const buildVariantProduct = (variant) => ({
    ...product,
    id: `${product.id}-${variant.id || variant._id}`,
    productId: product.productId || product.id || product._id,
    variantId: variant.id || variant._id,
    variantName: variant.weight || variant.name || '',
    weight: variant.weight || variant.name || '',
    unit: variant.unit || '',
    price: variant.price,
    oldPrice: variant.oldPrice,
    originalPrice: variant.originalPrice,
    discountedPrice: variant.discountedPrice,
    discount: variant.discount,
    quantity: 1,
  });

  const handleAddVariant = (variant) => {
    if (!product) return;

    if (imageRef.current && onAnimateToCart) {
      onAnimateToCart(imageRef.current, product.img, product.name);
    }

    onAddToCart?.(buildVariantProduct(variant));

    if (!localStorage.getItem('petric_token') || !localStorage.getItem('petric_delivery_location')) {
      handleClose();
    }
  };

  const handleMinusVariant = (variant) => {
    const cartItem = getVariantCartItem(variant);
    if (!cartItem) return;

    handleUpdateQuantity(cartItem.id, cartItem.quantity - 1);
  };

  const handlePlusVariant = (variant) => {
    handleAddVariant(variant);
  };

  const totalVariantQty = product?.variants?.reduce((total, variant) => {
    const cartItem = getVariantCartItem(variant);
    return total + (Number(cartItem?.quantity) || 0);
  }, 0);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[150] transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-[160] bg-white rounded-t-3xl md:rounded-3xl md:top-1/2 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md shadow-2xl transition-all duration-300 ${
          isClosing
            ? 'translate-y-full md:translate-y-[100%] md:opacity-0 md:scale-95'
            : 'translate-y-0 md:-translate-y-1/2 md:opacity-100 md:scale-100'
        }`}
      >
        <div className="relative flex max-h-[85vh] flex-col p-5 md:p-6">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
            aria-label="Close popup"
          >
            <FiX className="h-5 w-5 text-gray-700" />
          </button>

          <h3 className="mb-4 pr-10 text-xl font-bold text-gray-900">
            Select Variant
          </h3>

          {product && (
            <>
              <div className="mb-5 flex items-center gap-4 border-b border-gray-100 pb-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
                  <img
                    ref={imageRef}
                    src={product.img}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="min-w-0">
                  <h4 className="line-clamp-2 text-sm font-bold text-gray-800 md:text-base">
                    {product.name}
                  </h4>

                  {totalVariantQty > 0 && (
                    <p className="mt-1 text-xs font-semibold text-green-700">
                      {totalVariantQty} item{totalVariantQty > 1 ? 's' : ''} in cart
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-grow overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
                <div className="space-y-3">
                  {product.variants?.map((variant, idx) => {
                    const cartItem = getVariantCartItem(variant);
                    const quantity = Number(cartItem?.quantity) || 0;

                    return (
                      <div
                        key={variant.id || variant._id || idx}
                        className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#FFD000]"
                      >
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900">
                            {variant.weight || variant.name}
                          </p>

                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-black">
                              {variant.price}
                            </span>

                            {variant.oldPrice && variant.oldPrice !== variant.price && (
                              <span className="text-xs text-gray-400 line-through">
                                {variant.oldPrice}
                              </span>
                            )}

                            {variant.discount && variant.discount !== '0%' && (
                              <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-[#FF5757]">
                                {variant.discount} OFF
                              </span>
                            )}
                          </div>
                        </div>

                        {quantity > 0 ? (
                          <div className="flex h-9 min-w-[112px] items-center overflow-hidden rounded-lg border border-[#FFD000] bg-[#FFD000]">
                            <button
                              type="button"
                              onClick={() => handleMinusVariant(variant)}
                              className="grid h-9 w-9 place-items-center bg-[#FFD000] hover:bg-[#ffdb33]"
                            >
                              <FiMinus className="h-4 w-4" />
                            </button>

                            <span className="grid h-9 flex-1 place-items-center border-x border-yellow-300 bg-white text-sm font-extrabold">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => handlePlusVariant(variant)}
                              className="grid h-9 w-9 place-items-center bg-[#FFD000] hover:bg-[#ffdb33]"
                            >
                              <FiPlus className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddVariant(variant)}
                            className="h-9 min-w-[82px] rounded-lg bg-[#FFD000] px-4 text-sm font-extrabold text-black transition-colors hover:bg-[#ffdb33]"
                          >
                            ADD
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}