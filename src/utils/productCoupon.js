export const DEFAULT_PRODUCT_CARD_COUPON_TEXT = 'Additional Flat 8% off';

const getNumber = (value) => {
  return Number(String(value ?? 0).replace(/[^\d.]/g, '')) || 0;
};

export const getProductVisibleFinalPrice = (product) => {
  return getNumber(product?.discountedPrice || product?.price);
};

export const getProductCardCouponText = (coupon) => {
  const couponName = coupon?.couponName || '';

  if (!couponName) return '';

  const match = couponName.match(/^(.*?\boff\b)/i);

  if (!match?.[1]) return '';

  return `Additional ${match[1].trim()}`;
};

export const normalizeProductCoupon = (coupon) => {
  const productCardCouponText = getProductCardCouponText(coupon);

  return {
    ...coupon,
    couponMinimumAmount: getNumber(coupon.couponMinimumAmount),
    couponMaximumAmount: getNumber(coupon.couponMaximumAmount),
    couponPrice: getNumber(coupon.couponPrice),
    productCard_coupon_text: productCardCouponText || DEFAULT_PRODUCT_CARD_COUPON_TEXT,
  };
};

export const normalizeProductCoupons = (coupons = []) => {
  return coupons
    .filter((coupon) => {
      if (!coupon) return false;
      if (coupon.isActive === false) return false;
      if (coupon.isDeleted === true) return false;
      return true;
    })
    .map(normalizeProductCoupon);
};

export const getBestCouponForProduct = (product, coupons = []) => {
  const finalPrice = getProductVisibleFinalPrice(product);

  if (!finalPrice) return null;

  const applicableCoupons = coupons.filter((coupon) => {
    return Number(coupon.couponMinimumAmount || 0) < finalPrice;
  });

  if (applicableCoupons.length === 0) return null;

  return applicableCoupons.sort((a, b) => {
    const minAmountDiff =
      Number(b.couponMinimumAmount || 0) - Number(a.couponMinimumAmount || 0);

    if (minAmountDiff !== 0) return minAmountDiff;

    return Number(b.couponPrice || 0) - Number(a.couponPrice || 0);
  })[0];
};

export const getBestCouponTextForProduct = (product, coupons = []) => {
  const bestCoupon = getBestCouponForProduct(product, coupons);

  return bestCoupon?.productCard_coupon_text || DEFAULT_PRODUCT_CARD_COUPON_TEXT;
};