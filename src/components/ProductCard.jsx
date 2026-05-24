import React, { useRef, useState } from 'react';
import { FiChevronDown, FiMinus, FiPlus, FiTag } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import { getBestCouponTextForProduct } from '../utils/productCoupon';
import { getBestVariantDiscountText } from '../utils/variantDiscount';

const getNumber = (value) => {
  return Number(String(value ?? 0).replace(/[^\d.]/g, '')) || 0;
};

export default function ProductCard({
  product,
  coupons = [],
  mobileMode = 'grid',
  desktopMode = 'grid',
  onOpenProduct,
  onAddToCart,
  onOpenVariants,
  onAnimateToCart,
  className = '',
}) {
  const hasMultipleVariants = product.variants && product.variants.length > 1;
  const couponText = getBestCouponTextForProduct(product, coupons);
  const bestVariantDiscountText = getBestVariantDiscountText(product);
  const { cartItems, handleUpdateQuantity } = useCart();

  const imageRef = useRef(null);
  const [btnBounce, setBtnBounce] = useState(false);

  const originalPrice = getNumber(product.originalPrice || product.oldPrice);
  const discountedPrice = getNumber(product.discountedPrice || product.price);

  const calculatedDiscount =
    originalPrice > discountedPrice
      ? `${Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%`
      : '';

  const discount = product.discount || calculatedDiscount;

  const mobileSizeClass =
    mobileMode === 'carousel'
      ? 'w-[calc((100vw-52px)/2)] min-w-[145px] shrink-0'
      : 'w-full min-w-0';

  const desktopSizeClass =
    desktopMode === 'carousel'
      ? 'md:w-[220px] lg:w-[240px] md:max-w-[240px]'
      : 'md:w-full md:max-w-none';

  const handleAddClick = (event) => {
    event.stopPropagation();

    setBtnBounce(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setBtnBounce(true)));

    if (hasMultipleVariants) {
      onOpenVariants?.(product);
      return;
    }

    if (imageRef.current && onAnimateToCart) {
      onAnimateToCart(imageRef.current, product.img, product.name);
    }

    onAddToCart?.(product);
  };

  const handleVariantClick = (event) => {
    event.stopPropagation();

    if (hasMultipleVariants) {
      onOpenVariants?.(product);
    }
  };

  const productId = product.productId || product.id || product._id;

  const productCartItems = cartItems.filter(
    (item) => String(item.productId) === String(productId)
  );

  const totalCartQuantity = productCartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const cartItem = productCartItems.find(
    (item) =>
      String(item.variantId || '') === String(product.variantId || '') ||
      !hasMultipleVariants
  );

  return (
    <article
      onClick={() => onOpenProduct?.(product)}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${mobileSizeClass} ${desktopSizeClass} ${className}`}
    >
      <div className="relative flex h-[132px] w-full items-center justify-center overflow-hidden bg-gray-50 p-2 md:h-[145px]">
        <img
          ref={imageRef}
          src={product.img}
          alt={product.name}
          className="h-[112%] w-[112%] max-w-none object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-110"
        />

        {discount && discount !== '0%' && (
          <div className="absolute right-1.5 top-1.5 rounded-md bg-[#2563EB] px-2 py-1 text-[9px] font-bold leading-tight text-white shadow-sm">
            {discount} off
          </div>
        )}

        {couponText && (
          <div className="absolute right-1.5 top-8 inline-flex max-w-[78%] items-center gap-1 rounded-md border border-dashed border-green-500 bg--50 px-2 py-1 text-[9px] font-bold leading-tight text-green-700 shadow-sm">
            <FiTag className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">{couponText}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5">
        <h3 className="mb-1.5 line-clamp-2 h-[32px] overflow-hidden text-[12px] font-semibold leading-[16px] text-gray-950 md:h-[34px] md:text-[13px] md:leading-[17px]">
          {product.name}
        </h3>

        <div className="mb-1.5 flex min-w-0 items-center">
          <button
            type="button"
            onClick={handleVariantClick}
            className={`flex max-w-full items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-left text-[11px] font-semibold text-gray-700 ${hasMultipleVariants ? 'hover:bg-gray-200' : ''
              }`}
          >
            <span className="truncate">
              {product.weight || product.variantName || product.unit}
            </span>

            {hasMultipleVariants && <FiChevronDown className="h-3.5 w-3.5 shrink-0" />}
          </button>
        </div>

        {/* 
        <div className="mb-2 min-h-[10px] min-w-0 truncate text-[9px] font-medium leading-none text-green-600">
          {bestVariantDiscountText && (
            <>
              <span className="mr-0.5 text-[8px] leading-none">▲</span>
              {bestVariantDiscountText}
            </>
          )}
        </div>
        */}

        <div className="mb-2 flex items-baseline gap-1.5">
          <span className="text-[17px] font-extrabold leading-none text-black">
            {product.price}
          </span>

          {product.oldPrice && product.oldPrice !== product.price && (
            <span className="text-[10px] font-semibold leading-none text-gray-400 line-through">
              {product.oldPrice}
            </span>
          )}
        </div>

        {totalCartQuantity > 0 ? (
          <div
            className="mt-auto flex h-10 items-center overflow-hidden rounded-lg border border-[#FFD000] bg-[#FFD000] shadow-sm"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="grid h-10 w-10 place-items-center bg-[#FFD000] hover:bg-[#ffdb33] transition-colors"
              onClick={(event) => {
                event.stopPropagation();

                if (hasMultipleVariants) {
                  onOpenVariants?.(product);
                  return;
                }

                if (cartItem) {
                  handleUpdateQuantity(cartItem.id, cartItem.quantity - 1);
                }
              }}
            >
              <FiMinus className="h-3.5 w-3.5" />
            </button>

            <span className="grid h-10 flex-1 place-items-center bg-white text-sm font-extrabold border-x border-yellow-300">
              {totalCartQuantity}
            </span>

            <button
              className="grid h-10 w-10 place-items-center bg-[#FFD000] hover:bg-[#ffdb33] transition-colors"
              onClick={(event) => {
                event.stopPropagation();

                if (hasMultipleVariants) {
                  onOpenVariants?.(product);
                  return;
                }

                onAddToCart?.(product);
              }}
            >
              <FiPlus className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAddClick}
            onAnimationEnd={() => setBtnBounce(false)}
            className={`mt-auto h-10 w-full rounded-lg bg-[#FFD000] text-[13px] font-black text-black shadow-sm transition-all hover:bg-[#ffdb33] active:scale-[0.98]${btnBounce ? ' animate-add-btn-bounce' : ''
              }`}
          >
            ADD
          </button>
        )}
      </div>
    </article>
  );
}