const getNumber = (value) => {
  return Number(String(value ?? 0).replace(/[^\d.]/g, '')) || 0;
};

const getVariantName = (variant) => {
  return variant?.weight || variant?.name || variant?.unit || '';
};

const getVariantDiscountPercent = (variant) => {
  const originalPrice = getNumber(variant?.originalPrice || variant?.oldPrice);
  const discountedPrice = getNumber(variant?.discountedPrice || variant?.price);

  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
    return 0;
  }

  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const getVisibleVariantDiscountPercent = (product) => {
  return getVariantDiscountPercent({
    originalPrice: product?.originalPrice || product?.oldPrice,
    discountedPrice: product?.discountedPrice || product?.price,
  });
};

export const getBestVariantDiscountText = (product) => {
  const variants = product?.variants || [];

  if (variants.length <= 1) {
    return '';
  }

  const visibleDiscount = getVisibleVariantDiscountPercent(product);
  const visibleVariantId = String(product?.variantId || '');
  const visibleVariantName = String(
    product?.weight || product?.variantName || product?.unit || ''
  ).toLowerCase();

  const variantsWithDiscount = variants
    .map((variant) => ({
      ...variant,
      discountPercent: getVariantDiscountPercent(variant),
      variantName: getVariantName(variant),
    }))
    .filter((variant) => variant.discountPercent > 0 && variant.variantName);

  if (variantsWithDiscount.length === 0) {
    return '';
  }

  const bestVariant = variantsWithDiscount.sort((a, b) => {
    if (b.discountPercent !== a.discountPercent) {
      return b.discountPercent - a.discountPercent;
    }

    return getNumber(b.originalPrice || b.oldPrice) - getNumber(a.originalPrice || a.oldPrice);
  })[0];

  if (!bestVariant) {
    return '';
  }

  const bestVariantId = String(bestVariant.id || bestVariant._id || '');
  const bestVariantName = String(bestVariant.variantName || '').toLowerCase();

  const isVisibleVariantBest =
    bestVariant.discountPercent <= visibleDiscount &&
    (
      !visibleVariantId ||
      !bestVariantId ||
      bestVariantId === visibleVariantId ||
      bestVariantName === visibleVariantName
    );

  if (isVisibleVariantBest) {
    return '';
  }

  if (bestVariant.discountPercent <= visibleDiscount) {
    return '';
  }

  return `${bestVariant.discountPercent}% off on ${bestVariant.variantName}`;
};