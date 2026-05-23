import { useEffect, useState } from 'react';
import { get } from '../helper/api';

const isUsableCoupon = (coupon) => {
  if (!coupon) return false;
  if (coupon.isActive === false) return false;
  if (coupon.isDeleted === true) return false;
  return true;
};

const formatCouponText = (coupon) => {
  const value = Number(coupon?.couponPrice || 0);

  if (!value) return '';

  if (coupon?.couponType === '0') {
    return `Get extra ${value}% Off`;
  }

  return `Get extra ₹${value} Off`;
};

export default function useProductCouponText() {
  const [couponText, setCouponText] = useState('');

  useEffect(() => {
    const fetchCouponText = async () => {
      const token = localStorage.getItem('petric_token');

      try {
        const response = await get('coupon?type=3', {
          headers: token ? { Authorization: token } : {},
        });

        const coupons = (response?.coupons || []).filter(isUsableCoupon);

        const extra8Coupon = coupons.find(
          (coupon) => coupon.couponPromoCode?.toUpperCase() === 'EXTRA8'
        );

        if (!token) {
          setCouponText(formatCouponText(extra8Coupon || coupons[0]) || 'Get extra 8% Off');
          return;
        }

        if (extra8Coupon) {
          setCouponText(formatCouponText(extra8Coupon) || 'Get extra 8% Off');
          return;
        }

        setCouponText('Get extra 5% Off');
      } catch {
        setCouponText(token ? 'Get extra 5% Off' : 'Get extra 8% Off');
      }
    };

    fetchCouponText();
  }, []);

  return couponText;
}