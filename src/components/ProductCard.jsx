import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function ProductCard({
  product,
  onOpenProduct,
  onAddToCart,
  onOpenVariants,
  className = '',
}) {
  const hasMultipleVariants = product.variants && product.variants.length > 1;
  const hasDiscount = product.discount && product.discount !== '0%';

  const handleAddClick = (event) => {
    event.stopPropagation();

    if (hasMultipleVariants) {
      onOpenVariants?.(product);
      return;
    }

    onAddToCart?.(product);
  };

  const handleVariantClick = (event) => {
    event.stopPropagation();

    if (hasMultipleVariants) {
      onOpenVariants?.(product);
    }
  };

  return (
    <article
      onClick={() => onOpenProduct?.(product)}
      className={`group flex min-h-[310px] w-[58vw] min-w-[190px] max-w-[230px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:min-h-0 md:w-full md:max-w-none md:rounded-3xl md:p-4 ${className}`}
    >
      <div className="relative mb-3 flex h-[155px] w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-2 md:h-40 md:rounded-2xl">
        <img
          src={product.img}
          alt={product.name}
          className="h-[118%] w-[118%] max-w-none object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-125"
        />

        {hasDiscount && (
          <div className="absolute right-2 top-2 rounded-full bg-[#FF5757] px-2 py-1 text-[10px] font-extrabold leading-none text-white shadow-sm md:text-[10px]">
            {product.discount} Off
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <h3 className="mb-1.5 line-clamp-2 text-[14px] font-semibold leading-[1.3] text-black md:text-sm">
          {product.name}
        </h3>

        <button
          type="button"
          onClick={handleVariantClick}
          className={`mb-2 flex w-fit max-w-full items-center gap-1 rounded-md text-left text-[12px] font-semibold text-gray-500 md:text-xs ${
            hasMultipleVariants
              ? 'bg-gray-50 px-1.5 py-0.5 hover:bg-gray-100 hover:text-black'
              : ''
          }`}
        >
          <span className="truncate">
            {product.weight || product.variantName || product.unit}
          </span>

          {hasMultipleVariants && (
            <FiChevronDown className="h-3.5 w-3.5 shrink-0" />
          )}
        </button>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0">
            {product.oldPrice && product.oldPrice !== product.price && (
              <p className="text-[11px] font-semibold leading-tight text-gray-400 line-through md:text-[10px]">
                {product.oldPrice}
              </p>
            )}

            <p className="truncate text-[20px] font-black leading-tight text-black md:text-lg">
              {product.price}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddClick}
            className="shrink-0 rounded-xl bg-[#FFD000] px-4 py-2 text-[12px] font-black text-black shadow-sm transition-all hover:scale-105 hover:bg-[#ffdb33] hover:shadow-md md:rounded-full md:px-6 md:text-sm"
          >
            ADD
          </button>
        </div>
      </div>
    </article>
  );
}