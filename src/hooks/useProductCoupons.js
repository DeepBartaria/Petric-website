import { useEffect, useState } from 'react';
import { get } from '../helper/api';
import { normalizeProductCoupons } from '../utils/productCoupon';

const GUEST_PRODUCT_COUPONS = [
  {
    couponName: 'Flat 8% off upto ₹200 above ₹1,299',
    couponPromoCode: 'EXTRA8',
    couponMinimumAmount: 1299,
    couponMaximumAmount: 200,
    couponType: '0',
    couponPrice: 8,
    isActive: true,
    isDeleted: false,
  },
  {
    couponName: 'Flat 5% off upto ₹175 above ₹999',
    couponPromoCode: 'EXTRA5',
    couponMinimumAmount: 999,
    couponMaximumAmount: 175,
    couponType: '0',
    couponPrice: 5,
    isActive: true,
    isDeleted: false,
  },
  {
    couponName: 'Flat ₹250 off above ₹3,999',
    couponPromoCode: 'FLAT250',
    couponMinimumAmount: 3999,
    couponMaximumAmount: 250,
    couponType: '1',
    couponPrice: 250,
    isActive: true,
    isDeleted: false,
  },
  {
    couponName: 'Flat ₹300 off above ₹5,999',
    couponPromoCode: 'FLAT300',
    couponMinimumAmount: 5999,
    couponMaximumAmount: 300,
    couponType: '1',
    couponPrice: 300,
    isActive: true,
    isDeleted: false,
  },
  {
    couponName: 'Flat ₹500 off above ₹9,999',
    couponPromoCode: 'FLAT500',
    couponMinimumAmount: 9999,
    couponMaximumAmount: 500,
    couponType: '1',
    couponPrice: 500,
    isActive: true,
    isDeleted: false,
  },
  {
    couponName: 'Flat ₹1000 off above ₹19,999',
    couponPromoCode: 'FLAT1000',
    couponMinimumAmount: 19999,
    couponMaximumAmount: 1000,
    couponType: '1',
    couponPrice: 1000,
    isActive: true,
    isDeleted: false,
  },
];

const guestCoupons = normalizeProductCoupons(GUEST_PRODUCT_COUPONS);

export default function useProductCoupons() {
  const [coupons, setCoupons] = useState(guestCoupons);

  useEffect(() => {
    const fetchCoupons = async () => {
      const token = localStorage.getItem('petric_token');

      if (!token) {
        setCoupons(guestCoupons);
        return;
      }

      try {
        const response = await get('coupon?type=3', {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });

        const backendCoupons = normalizeProductCoupons(response?.coupons || []);

        setCoupons(backendCoupons.length > 0 ? backendCoupons : guestCoupons);
      } catch {
        setCoupons(guestCoupons);
      }
    };

    fetchCoupons();
  }, []);

  return coupons;
}