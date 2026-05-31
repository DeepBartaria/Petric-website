import React, { useEffect, useState } from 'react';
import {
  FiArrowLeft,
  FiShare2,
  FiInfo,
  FiPlus,
  FiMinus,
  FiChevronRight,
  FiCheck,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiNavigation,
  FiLoader,
  FiTag,
} from 'react-icons/fi';

import { BsClockHistory } from 'react-icons/bs';
import { post, get, put, del } from '../helper/api';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { addSavedAddress, getSavedAddresses, setDefaultAddress } from '../api/addressApi';
import { getBackendProductCart } from '../api/cartApi';
import { trackInitiateCheckout, trackPurchase } from '../helper/metaPixel';
import loaderGif from '../assets/loader.gif';

const ADDRESS_TYPES = {
  1: { label: 'Home', icon: FiHome },
  2: { label: 'Work', icon: FiBriefcase },
  3: { label: 'Others', icon: FiMapPin },
};

const STORE_COORDINATES = { lat: 28.4416870, lng: 77.0759438 };
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090 };
const LIBRARIES = ['places'];

const emptyAddressForm = {
  username: '',
  mobileNo: '',
  fullAddress: '',
  landmark: '',
  pincode: '',
  area: '',
  city: '',
  state: '',
  country: 'India',
  type: '1',
  lat: '',
  lng: '',
  address: '',
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('petric_user')) || {};
  } catch {
    return {};
  }
};

const getAddressPart = (components, type) => {
  return components.find((item) => item.types.includes(type))?.long_name || '';
};

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onLoginSuccess, loginBackCloses = false }) {
  const scrollContainerRef = React.useRef(null);
  const totalMrp = cartItems.reduce((total, item) => {
    const priceStr = item.oldPrice ? item.oldPrice : item.price;
    const numericPrice = parseInt(priceStr.replace('₹', '').replace(',', '')) || 0;
    return total + (numericPrice * item.quantity);
  }, 0);
  
  const itemsTotal = cartItems.reduce((total, item) => {
    const numericPrice = parseInt(item.price.replace('₹', '').replace(',', '')) || 0;
    return total + (numericPrice * item.quantity);
  }, 0);

  const mrpDiscount = totalMrp - itemsTotal;
  
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginOnlyMode, setLoginOnlyMode] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState(emptyAddressForm);
  const [isAddressSaving, setIsAddressSaving] = useState(false);
  const [isAddressLoading, setIsAddressLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Online');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [isCouponsLoading, setIsCouponsLoading] = useState(false);
  
  const [codSettings, setCodSettings] = useState({
    minPrice: 0,
    maxPrice: 0,
    ordersEnabled: true,
    perUserLimit: 999,
    userOrderCount: 0,
    isLoaded: false,
  });

  const { isLoaded: isMapLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });
  const [map, setMap] = useState(null);
  const onMapLoad = React.useCallback((m) => setMap(m), []);
  const onMapUnmount = React.useCallback(() => setMap(null), []);
  const autocompleteRef = React.useRef(null);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        panToLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  useEffect(() => {
    if (checkoutStep === 'addAddress' && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [checkoutStep]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalPayable = itemsTotal - couponDiscount;

  // Check COD constraints dynamically
  const isCODAllowed = React.useMemo(() => {
    if (!codSettings.isLoaded) return true; // Default allow while loading
    if (!codSettings.ordersEnabled) return false;
    if (codSettings.userOrderCount >= codSettings.perUserLimit) return false;
    if (totalPayable < codSettings.minPrice || totalPayable > codSettings.maxPrice) return false;
    return true;
  }, [totalPayable, codSettings]);

  useEffect(() => {
    if (!isCODAllowed && paymentMethod === 'COD') {
      setPaymentMethod('Online');
    }
  }, [isCODAllowed, paymentMethod]);

  useEffect(() => {
    const fetchCodRules = async () => {
      try {
        const token = localStorage.getItem('petric_token');
        const [settingsRes, countRes] = await Promise.all([
          get('settings').catch(() => null),
          token ? get('booking/cod/orderCount', { headers: { Authorization: token } }).catch(() => null) : Promise.resolve(null)
        ]);
        
        if (settingsRes?.setting) {
          setCodSettings({
            minPrice: settingsRes.setting.codMinPrice || 0,
            maxPrice: settingsRes.setting.codMaxPrice || Infinity,
            ordersEnabled: settingsRes.setting.codOrders ?? true,
            perUserLimit: settingsRes.setting.codPerUser || 999,
            userOrderCount: countRes?.codOrderCount || 0,
            isLoaded: true,
          });
        }
      } catch (err) {
        console.error("Failed to fetch COD settings", err);
      }
    };
    
    if (isOpen) {
      fetchCodRules();
    }
  }, [isOpen, isLoggedIn]);

  // Re-validate / recompute the applied coupon whenever the cart total changes.
  // 1) If items drop below the minimum, the coupon is auto-removed.
  // 2) For percentage coupons, the discount is recomputed against the new total.
  useEffect(() => {
    if (!appliedCoupon) return;

    // Auto-remove when cart drops below the minimum
    if (
      appliedCoupon.couponMinimumAmount &&
      itemsTotal < appliedCoupon.couponMinimumAmount
    ) {
      setAppliedCoupon(null);
      setCouponCode('');
      setCouponError(
        `Coupon "${appliedCoupon.code}" removed — minimum order ₹${appliedCoupon.couponMinimumAmount} not met.`
      );
      return;
    }

    // Keep the discount in sync for percentage coupons (cart can grow/shrink)
    if (appliedCoupon.couponType === "0") {
      let recalculated = (itemsTotal * appliedCoupon.couponPrice) / 100;
      if (
        appliedCoupon.couponMaximumAmount &&
        recalculated > appliedCoupon.couponMaximumAmount
      ) {
        recalculated = appliedCoupon.couponMaximumAmount;
      }
      const rounded = Math.round(recalculated);
      if (rounded !== appliedCoupon.discount) {
        setAppliedCoupon({ ...appliedCoupon, discount: rounded });
      }
    }
  }, [itemsTotal, appliedCoupon]);

  const [deliveryTime, setDeliveryTime] = useState(16);

  const loadSavedAddresses = async () => {
    const token = localStorage.getItem('petric_token');
    if (!token) return;

    setIsAddressLoading(true);

    const response = await getSavedAddresses();
    const addressList = response?.type === 'success' ? response.address || [] : [];

    setSavedAddresses(addressList);

    setSelectedAddress((currentAddress) => {
      if (currentAddress) {
        const stillExists = addressList.find((item) => item._id === currentAddress._id);
        if (stillExists) return stillExists;
      }

      return addressList.find((item) => item.isDefault) || addressList[0] || null;
    });

    setIsAddressLoading(false);
  };

  const calculateFallbackTime = (dest) => {
    const R = 6371;
    const dLat = (dest.lat - STORE_COORDINATES.lat) * Math.PI / 180;
    const dLon = (dest.lng - STORE_COORDINATES.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(STORE_COORDINATES.lat * Math.PI / 180) * Math.cos(dest.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.ceil((R * c / 20) * 60) + 20;
  };

  const updateDeliveryTimeForLocation = (location) => {
    if (!window.google) return;
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [STORE_COORDINATES],
        destinations: [location],
        travelMode: 'DRIVING',
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        const time =
          status === 'OK' && response.rows[0].elements[0].status === 'OK'
            ? Math.ceil(response.rows[0].elements[0].duration.value / 60) + 20
            : calculateFallbackTime(location);

        const deliveryLocation = {
          lat: location.lat,
          lng: location.lng,
          time,
        };

        setDeliveryTime(time);
        localStorage.setItem('petric_delivery_time', time.toString());
        localStorage.setItem('petric_delivery_location', JSON.stringify(deliveryLocation));

        window.dispatchEvent(new CustomEvent('deliveryTimeUpdated', { detail: time }));
        window.dispatchEvent(new CustomEvent('deliveryLocationUpdated', { detail: deliveryLocation }));
      }
    );
  };

  const panToLocation = (location) => {
    setAddressForm((prev) => ({
      ...prev,
      lat: location.lat,
      lng: location.lng,
    }));
    if (map) {
      map.panTo(location);
      map.setZoom(15);
    }
    
    // Reverse geocode to fill in address
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const result = results[0];
          const components = result.address_components || [];
          setAddressForm((prev) => ({
            ...prev,
            address: result.formatted_address || '',
            pincode: getAddressPart(components, 'postal_code') || prev.pincode,
            city: getAddressPart(components, 'locality') || getAddressPart(components, 'administrative_area_level_3') || prev.city,
            state: getAddressPart(components, 'administrative_area_level_1') || prev.state,
            area: getAddressPart(components, 'sublocality_level_1') || getAddressPart(components, 'sublocality_level_2') || prev.area,
            landmark: getAddressPart(components, 'premise') || getAddressPart(components, 'neighborhood') || prev.landmark,
          }));
        }
      });
    }
  };

  const onMapClick = (e) => {
    if (e.latLng) panToLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const onMarkerDragEnd = (e) => {
    if (e.latLng) panToLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const openAddAddressForm = () => {
    const user = getStoredUser();

    setAddressError('');
    setAddressForm({
      ...emptyAddressForm,
      username: user?.name || user?.username || '',
      mobileNo: user?.mobileNo || user?.mobile || '',
    });

    setCheckoutStep('addAddress');
  };

  const handleAddressChange = (field, value) => {
    setAddressForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDetectAddressLocation = () => {
    if (!navigator.geolocation) {
      setAddressError('Location is not supported in this browser.');
      return;
    }

    setIsLocationLoading(true);
    setAddressError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        panToLocation({ lat, lng });
        setIsLocationLoading(false);
      },
      () => {
        setAddressError('Please allow location permission to detect your address.');
        setIsLocationLoading(false);
      }
    );
  };

  const handleSaveCheckoutAddress = async (event) => {
    event.preventDefault();

    if (!addressForm.lat || !addressForm.lng) {
      setAddressError('Please select a location on the map.');
      return;
    }

    if (
      !addressForm.username ||
      !addressForm.mobileNo ||
      !addressForm.fullAddress ||
      !addressForm.pincode
    ) {
      setAddressError('Please fill full name, mobile number, full address and pincode.');
      return;
    }

    setIsAddressSaving(true);
    setAddressError('');

    try {
      const response = await addSavedAddress({
        ...addressForm,
        type: String(addressForm.type),
        country: addressForm.country || 'India',
      });

      if (response?.type === 'success') {
        const newAddress = response.address;

        if (newAddress?._id) {
          setSelectedAddress(newAddress);
          updateDeliveryTimeForLocation({ lat: Number(newAddress.lat), lng: Number(newAddress.lng) });
        }

        await loadSavedAddresses();
        setCheckoutStep('cart');
      } else {
        setAddressError(response?.message || 'Could not save address.');
      }
    } catch (error) {
      setAddressError('Could not save address. Please try again.');
    } finally {
      setIsAddressSaving(false);
    }
  };

  const handleSelectAddress = async (address) => {
    setSelectedAddress(address);

    if (address.lat && address.lng) {
      updateDeliveryTimeForLocation({ lat: Number(address.lat), lng: Number(address.lng) });
    }

    if (!address.isDefault) {
      await setDefaultAddress(address._id);
      await loadSavedAddresses();
    }

    setCheckoutStep('cart');
  };

  const isMobileValid = mobileNumber.length === 10;
  const isOtpValid = otpValue.length === 4;

  useEffect(() => {
    const token = localStorage.getItem('petric_token');
    setIsLoggedIn(Boolean(token));

    if (isOpen && token) {
      loadSavedAddresses();
    }
    
    const storedDeliveryTime = localStorage.getItem('petric_delivery_time');
    if (storedDeliveryTime) {
      setDeliveryTime(storedDeliveryTime);
    }

    const handleDeliveryTimeUpdate = (e) => {
      setDeliveryTime(e.detail);
    };

    const handleOpenCart = (e) => {
      setLoginOnlyMode(e.detail?.mode === 'loginOnly');

      if (e.detail?.step) {
        setCheckoutStep(e.detail.step);
      }
    };

    const handleCloseCart = () => {
      onClose?.();
    };

    window.addEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);
    window.addEventListener('openCart', handleOpenCart);
    window.addEventListener('closeCart', handleCloseCart);
    
    if (!isOpen) {
      setCheckoutStep('cart');
      setLoginOnlyMode(false);
      setMobileNumber('');
      setOtpValue('');
      setResendTimer(60);
    }
    
    return () => {
      window.removeEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);
      window.removeEventListener('openCart', handleOpenCart);
      window.removeEventListener('closeCart', handleCloseCart);
    };
  }, [isOpen]);

  useEffect(() => {
    if (checkoutStep !== 'otp' || resendTimer === 0) {
      return;
    }

    const timer = setTimeout(() => {
      setResendTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [checkoutStep, resendTimer]);

  const handleBack = () => {
    if (checkoutStep === 'addresses' || checkoutStep === 'addAddress' || checkoutStep === 'coupons') {
      setCheckoutStep('cart');
      return;
    }

    if (checkoutStep === 'otp') {
      setCheckoutStep('mobile');
      return;
    }

    if (checkoutStep === 'mobile') {
      if (loginBackCloses || loginOnlyMode) {
        onClose();
        return;
      }

      setCheckoutStep('cart');
      return;
    }

    onClose();
  };

  const handleMobileChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(digitsOnly);
  };

  const handleOtpChange = (event) => {
    const digitsOnly = event.target.value.replace(/\D/g, '').slice(0, 4);
    setOtpValue(digitsOnly);
  };

  const handleContinueToOtp = async () => {
    if (!isMobileValid) return;

    try {
      const res = await post('user/sendOtp', { mobileNo: mobileNumber });
      if (res && res.type === 'error' && res.message === 'Account not found') {
        const regRes = await post('user/register', { mobileNo: mobileNumber });
        if (regRes && regRes.type === 'success') {
          setCheckoutStep('otp');
          setOtpValue('');
          setResendTimer(60);
        } else {
          alert(regRes?.message || 'Registration failed');
        }
      } else if (res && res.type === 'success') {
        setCheckoutStep('otp');
        setOtpValue('');
        setResendTimer(60);
      } else {
        alert(res?.message || 'Failed to send OTP');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer !== 0) return;

    try {
      const res = await post('user/sendOtp', { mobileNo: mobileNumber });
      if (res && res.type === 'success') {
        setResendTimer(60);
        setOtpValue('');
      } else {
        alert(res?.message || 'Failed to resend OTP');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!isOtpValid) return;

    try {
      const res = await post('user/verifyOtp', { mobileNo: mobileNumber, otp: otpValue, type: 'user' });
      if (res && res.type === 'success') {
        const loggedInUser = {
          _id: res._id,
          name: res.name,
          mobileNo: res.mobileNo,
        };

        localStorage.setItem('petric_token', res.token);
        localStorage.setItem('petric_user', JSON.stringify(loggedInUser));

        setIsLoggedIn(true);

        window.dispatchEvent(
          new CustomEvent('petricLoginSuccess', {
            detail: { user: loggedInUser },
          })
        );

        onLoginSuccess?.(loggedInUser);

        if (loginOnlyMode) {
          setLoginOnlyMode(false);
          onClose();
          return;
        }

        setCheckoutStep('cart');
      } else {
        alert(res?.message || 'Invalid OTP');
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
    }
  };

  const formatBookingDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const createBooking = async (deliveryLat, deliveryLng) => {
    const cartResponse = await getBackendProductCart();

    if (cartResponse?.type !== 'success' || !cartResponse.cart?._id) {
      return {
        type: 'error',
        message: cartResponse?.message || 'Cart not found. Please add product again.',
      };
    }

    const bookingPayload = {
      type: '3',
      status: paymentMethod === 'COD' ? 'accepted' : 'awaitingPayment',
      totalPrice: itemsTotal,
      totalPayable,
      couponDiscountedAmount: couponDiscount > 0 ? couponDiscount : undefined,
      platformFee: 0,
      deliveryCharge: 0,
      paymentStatus: paymentMethod === 'COD' ? 'pending' : undefined,
      paymentType: paymentMethod === 'COD' ? 'Cash' : 'Online',
      isLivePaymentTest: false,
      date: formatBookingDate(),
      typeOfBooking: 'Order',
      address: selectedAddress._id,
      lat: deliveryLat,
      lng: deliveryLng,
      cartId: cartResponse.cart._id,
    };

    return await post('booking/add/webhook/test', bookingPayload, {
      headers: {
        Authorization: localStorage.getItem('petric_token'),
        'Content-Type': 'application/json',
      },
    });
  };

  const handlePayment = async () => {
    setIsProcessingOrder(true);
    try {
      if (!selectedAddress) {
      if (savedAddresses.length > 0) {
        setCheckoutStep('addresses');
      } else {
        openAddAddressForm();
      }
      setIsProcessingOrder(false);
      return;
    }

    const deliveryLat = Number(selectedAddress.lat);
    const deliveryLng = Number(selectedAddress.lng);

    if (!deliveryLat || !deliveryLng) {
      alert('Selected address needs location. Please add address again using current location.');
      setIsProcessingOrder(false);
      return;
    }

    trackInitiateCheckout(cartItems, totalPayable);

    const bookingResponse = await createBooking(deliveryLat, deliveryLng);

    if (bookingResponse?.type !== 'success' || !bookingResponse.booking?._id) {
      alert(bookingResponse?.message || 'Failed to create booking');
      setIsProcessingOrder(false);
      return;
    }

    if (paymentMethod === 'COD') {
      const booking = bookingResponse.booking;
      
      trackPurchase({
        cartItems,
        totalPayable,
        orderId: booking._id,
      });

      try {
        await del('cart/delete?type=2', {
          headers: {
            Authorization: localStorage.getItem('petric_token'),
          },
        });
      } catch(delErr) {
        console.error('Cart already deleted or failed:', delErr);
      }
      
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: [] } }));

      try {
        await post(
          'logs/add',
          {
            description: `Placed an order of ₹${totalPayable} via COD`,
            type: 'Order',
          },
          {
            headers: {
              Authorization: localStorage.getItem('petric_token'),
            },
          }
        );
      } catch (logErr) {
        console.error('Failed to log order:', logErr);
      }

      // Show loader for an artificial 4-5 seconds for COD
      await new Promise(resolve => setTimeout(resolve, 4500));

      setIsProcessingOrder(false);
      setPaymentSuccess(true);
      
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 3000);
      return;
    }

    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsProcessingOrder(false);
      return;
    }

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    if (!razorpayKey) {
      alert('Razorpay key is missing.');
      setIsProcessingOrder(false);
      return;
    }

    const user = getStoredUser();
    const booking = bookingResponse.booking;

    const options = {
      key: razorpayKey,
      amount: totalPayable * 100,
      currency: 'INR',
      name: 'Petric',
      description: 'Petric Order',
      image: '/logo.png',
      notes: {
        bookingId: booking._id,
        contact: user?.mobileNo || '',
        name: user?.name || '',
      },
      prefill: {
        name: user?.name || 'Petric User',
        contact: user?.mobileNo || '',
      },
      handler: async function (response) {
        const paymentId = response.razorpay_payment_id;

        const bookingUpdateResponse = await put(
          `booking/update/${booking._id}`,
          {
            status: 'accepted',
            paymentStatus: 'paid',
            paymentId,
            razorpayPaymentId: paymentId,
            razorpayPaymentStatus: 'PAID',
            paymentMode: 'RzrPay',
          },
          {
            headers: {
              Authorization: localStorage.getItem('petric_token'),
              'Content-Type': 'application/json',
            },
          }
        );

        if (bookingUpdateResponse?.type === 'success') {
          trackPurchase({
            cartItems,
            totalPayable,
            orderId: booking._id,
          });
        }

        try {
          await del('cart/delete?type=2', {
            headers: {
              Authorization: localStorage.getItem('petric_token'),
            },
          });
        } catch(delErr) {
          console.error('Cart already deleted or failed:', delErr);
        }

        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cartItems: [] } }));

        try {
          await post(
            'logs/add',
            {
              description: `Placed an order of ₹${totalPayable}`,
              type: 'Order',
            },
            {
              headers: {
                Authorization: localStorage.getItem('petric_token'),
              },
            }
          );
        } catch (logErr) {
          console.error('Failed to log order:', logErr);
        }

        setPaymentSuccess(true);

        setTimeout(() => {
          setPaymentSuccess(false);
          setIsProcessingOrder(false);
          onClose();
        }, 3000);
      },
      modal: {
        ondismiss: function() {
          setIsProcessingOrder(false);
        }
      },
      theme: {
        color: '#FFD000',
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on('payment.failed', function (response) {
      alert(`Payment failed: ${response.error.description}`);
      setIsProcessingOrder(false);
    });

    paymentObject.open();
    
    } catch (globalErr) {
      console.error('HandlePayment Global Error:', globalErr);
      alert('An unexpected error occurred processing your payment.');
      setIsProcessingOrder(false);
    }
  };


  const fetchCoupons = async () => {
    setIsCouponsLoading(true);
    try {
      const token = localStorage.getItem('petric_token');
      const res = await get('coupon?type=3', { headers: token ? { Authorization: token } : {} });
      if (res && res.coupons) {
        setAvailableCoupons(res.coupons);
      }
    } catch (e) {
      console.error("Failed to fetch coupons", e);
    }
    setIsCouponsLoading(false);
  };

  const applySpecificCoupon = async (codeToApply) => {
    if (!codeToApply.trim()) return;
    setCouponCode(codeToApply);
    setCouponError('');
    try {
      const token = localStorage.getItem('petric_token');
      if (!token) {
        setCouponError('Please login to apply coupon');
        setCheckoutStep('mobile');
        return;
      }
      const res = await get('coupon?type=3', { headers: { Authorization: token } });
      if (res && res.coupons) {
        const found = res.coupons.find(c => c.couponPromoCode && c.couponPromoCode.toLowerCase() === codeToApply.toLowerCase());
        if (found) {
          let discountAmt = 0;
          if (found.couponType === "0") { // Percentage
             discountAmt = (itemsTotal * found.couponPrice) / 100;
             if (found.couponMaximumAmount && discountAmt > found.couponMaximumAmount) {
                 discountAmt = found.couponMaximumAmount;
             }
          } else { // Flat
             discountAmt = found.couponPrice;
          }
          if (found.couponMinimumAmount && itemsTotal < found.couponMinimumAmount) {
             setCouponError(`Minimum order amount should be ₹${found.couponMinimumAmount}`);
             return;
          }

          setAppliedCoupon({
            code: found.couponPromoCode,
            discount: Math.round(discountAmt),
            couponType: found.couponType,
            couponPrice: found.couponPrice,
            couponMinimumAmount: found.couponMinimumAmount || 0,
            couponMaximumAmount: found.couponMaximumAmount || 0,
          });

        } else {
          setCouponError('Invalid coupon code');
        }
      } else {
        setCouponError('Invalid coupon code');
      }
    } catch (e) {
      setCouponError('Failed to apply coupon');
    }
  };

  const handleApplyCoupon = () => applySpecificCoupon(couponCode);
  // (handleApplyCoupon contents moved to applySpecificCoupon)

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[240] transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#f8f9fa] z-[250] flex flex-col shadow-2xl transform transition-transform duration-300 translate-x-0 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <FiArrowLeft className="h-5 w-5 text-black" strokeWidth={2.5} />
            </button>
            <h2 className="text-lg font-bold text-black leading-none">
              {checkoutStep === 'mobile' || checkoutStep === 'otp'
                ? 'Login'
                : checkoutStep === 'addresses'
                  ? 'Select Address'
                  : checkoutStep === 'addAddress'
                    ? 'Add Address'
                    : checkoutStep === 'coupons'
                      ? 'Select Promo Code'
                      : 'My Cart'}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-28">
          {checkoutStep === 'cart' && (
            <>

              {/* Cart Items */}
              <div className="bg-white rounded-2xl p-3 shadow-sm flex flex-col divide-y divide-[#FFF1B8]">
                {cartItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-[64px_minmax(0,1fr)] gap-3 items-start py-3 first:pt-0 last:pb-0">
                    <div className="h-16 w-16 border rounded-lg p-1 shrink-0 bg-white">
                      <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 leading-[18px] line-clamp-2">
                        {item.name}
                      </h4>

                      <div className="mt-1 flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          {item.weight && (
                            <p className="max-w-full truncate text-xs text-gray-500 leading-tight">
                              {item.weight}
                            </p>
                          )}

                          <div className="mt-1.5 flex items-baseline gap-1.5">
                            <p className="font-bold text-black text-sm leading-none">{item.price}</p>

                            {item.oldPrice && item.oldPrice !== item.price && (
                              <span className="text-[11px] text-gray-400 line-through font-semibold">
                                {item.oldPrice}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex h-6 items-center overflow-hidden rounded-md bg-[#FFD000] text-black shadow-sm shrink-0">
                          <button
                            className="grid h-6 w-7 place-items-center hover:bg-black/10"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <FiMinus className="h-2.5 w-2.5" strokeWidth={3} />
                          </button>

                          <span className="grid h-6 w-7 place-items-center bg-white text-[12px] font-bold text-black">
                            {item.quantity}
                          </span>

                          <button
                            className="grid h-6 w-7 place-items-center hover:bg-black/10"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <FiPlus className="h-2.5 w-2.5" strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    fetchCoupons();
                    setCheckoutStep('coupons');
                  }}
                  className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <FiTag className="h-5 w-5 shrink-0 fill-green-600 text-green-600" />

                    <span className="truncate text-sm font-semibold text-black">
                      {appliedCoupon ? 'Coupon Applied' : 'Apply Coupon'}
                    </span>

                    {appliedCoupon && (
                      <span className="shrink-0 rounded-full bg-green-600 px-2 py-0.5 text-[11px] font-bold uppercase text-white">
                        {appliedCoupon.code}
                      </span>
                    )}
                  </div>

                  {appliedCoupon ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setAppliedCoupon(null);
                        setCouponCode('');
                        setCouponError('');
                      }}
                      className="ml-2 shrink-0 text-lg leading-none text-black"
                    >
                      ×
                    </button>
                  ) : (
                    <FiChevronRight className="ml-2 h-4 w-4 shrink-0 text-gray-600" />
                  )}
                </button>

                {couponError && <p className="mt-2 text-xs text-red-500">{couponError}</p>}
              </div>

              {couponError && <p className="text-red-500 text-xs -mt-2">{couponError}</p>}

              {/* Bill Details */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-black pb-3 mb-3 border-b border-[#FFF1B8]">
                  Bill details
                </h3>

                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Total MRP</span>
                    <span className="font-medium">₹{totalMrp}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>MRP Discount</span>
                    <span className="font-medium text-green-600">-₹{mrpDiscount}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Coupon Discount</span>
                    <span className="font-medium">
                      {couponDiscount > 0 ? (
                        <span className="text-green-600">-₹{couponDiscount}</span>
                      ) : (
                        '₹0'
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Platform Fee</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>

                  <div className="border-t border-[#FFF1B8] my-0.5"></div>

                  <div className="flex justify-between text-black font-bold text-base mt-0.5">
                    <span>Total Payable Amount</span>
                    <span>₹{totalPayable}</span>
                  </div>
                </div>
              </div>

            </>
          )}

          {checkoutStep === 'coupons' && (
            <>
              {isCouponsLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#FFD000] border-t-transparent"></div>
                </div>
              ) : availableCoupons.length === 0 ? (
                <div className="text-center py-10 text-gray-500 font-medium">No coupons available at the moment.</div>
              ) : (
                availableCoupons.map((c) => {
                  const isEligible = !c.couponMinimumAmount || itemsTotal >= c.couponMinimumAmount;

                  let desc = "";
                  if (c.couponType === "0") {
                    desc = `Flat ${c.couponPrice}% off`;
                    if (c.couponMaximumAmount) desc += ` upto ₹${c.couponMaximumAmount}`;
                  } else {
                    desc = `Flat ₹${c.couponPrice} off`;
                  }
                  if (c.couponMinimumAmount) desc += ` above ₹${c.couponMinimumAmount}`;

                  return (
                    <div key={c._id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="bg-[#FFF9CC] text-black text-xs font-bold px-3 py-1.5 rounded-md">
                          {c.couponPromoCode}
                        </div>
                        <button
                          onClick={() => {
                            if (isEligible) {
                              setCheckoutStep('cart');
                              applySpecificCoupon(c.couponPromoCode);
                            }
                          }}
                          className={`text-sm font-bold px-5 py-1.5 rounded-lg transition-colors ${isEligible ? 'bg-[#FFD000] text-black hover:bg-[#E6BC00]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                          Apply
                        </button>
                      </div>
                      <p className="text-sm font-medium text-black">{desc}</p>
                      {!isEligible && c.couponMinimumAmount && (
                        <p className="text-[11px] text-gray-500 font-medium">
                          Add ₹{c.couponMinimumAmount - itemsTotal} more to unlock this coupon
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}

          {checkoutStep === 'mobile' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-2">Enter Mobile Number</h3>
              <p className="text-sm text-gray-500 mb-4">We will send an OTP to continue your checkout.</p>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden focus-within:border-black transition-colors">
                <span className="px-4 py-3 text-sm font-bold text-gray-700 bg-gray-50 border-r border-gray-300">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="Enter 10 digit number"
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isMobileValid) handleContinueToOtp();
                  }}
                  maxLength={10}
                  className="w-full px-4 py-3 text-sm text-black outline-none"
                />
                <button
                  type="button"
                  onClick={handleContinueToOtp}
                  disabled={!isMobileValid}
                  className={`m-1.5 w-10 h-10 rounded-lg flex shrink-0 items-center justify-center transition-all duration-300 ${
                    isMobileValid 
                      ? 'bg-[#FFD000] hover:bg-[#ffdb33] text-black cursor-pointer shadow-sm transform hover:scale-105' 
                      : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <FiCheck className="w-5 h-5" strokeWidth={3} />
                </button>
              </div>
            </div>
          )}

          {checkoutStep === 'otp' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-xl font-bold text-black mb-2">Enter OTP</h3>
              <p className="text-sm text-gray-500 mb-4">OTP sent to +91 {mobileNumber}</p>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="Enter 4 digit OTP"
                value={otpValue}
                onChange={handleOtpChange}
                maxLength={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-black transition-colors"
              />
              <div className="mt-4">
                <p className="text-sm text-gray-500">Resend in {resendTimer} sec</p>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer !== 0}
                  className={`text-sm font-bold mt-2 transition-colors ${resendTimer === 0 ? 'text-black hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}
          {checkoutStep === 'addresses' && (
            <div className="flex flex-col gap-3">
              {isAddressLoading ? (
                <div className="bg-white rounded-2xl p-5 text-center text-gray-500">
                  Loading addresses...
                </div>
              ) : (
                <>
                  {savedAddresses.map((address) => {
                    const meta = ADDRESS_TYPES[address.type] || ADDRESS_TYPES[3];
                    const Icon = meta.icon;
                    const isSelected = selectedAddress?._id === address._id;

                    return (
                      <button
                        key={address._id}
                        type="button"
                        onClick={() => handleSelectAddress(address)}
                        className={`bg-white rounded-2xl p-4 text-left shadow-sm border ${
                          isSelected ? 'border-black' : 'border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#FFF9CC] flex items-center justify-center shrink-0">
                            <Icon className="text-black" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-black">{meta.label}</p>
                              {address.isDefault && (
                                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-gray-500 mt-1">
                              {address.username} | {address.mobileNo}
                            </p>

                            <p className="text-sm text-gray-700 mt-2 leading-5">
                              {address.fullAddress}
                            </p>

                            <p className="text-xs text-gray-500 mt-1">
                              {[address.landmark, address.area, address.city, address.pincode]
                                .filter(Boolean)
                                .join(', ')}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={openAddAddressForm}
                    className="w-full bg-[#FFD000] text-black rounded-xl p-4 font-bold flex items-center justify-center gap-2"
                  >
                    <FiPlus />
                    Add New Address
                  </button>
                </>
              )}
            </div>
          )}

          {checkoutStep === 'addAddress' && (
            <form onSubmit={handleSaveCheckoutAddress} className="bg-white rounded-2xl p-4 shadow-sm">
              <button
                type="button"
                onClick={handleDetectAddressLocation}
                className="mb-4 w-full border border-black rounded-xl p-3 font-bold text-black flex items-center justify-center gap-2 transition-colors hover:bg-gray-50"
              >
                {isLocationLoading ? <FiLoader className="animate-spin" /> : <FiNavigation />}
                Use current location
              </button>

              <div className="mb-4 flex flex-col gap-3">
                <p className="text-sm font-bold text-gray-700">Select location on map</p>
                {isMapLoaded && (
                  <Autocomplete
                    onLoad={(ac) => (autocompleteRef.current = ac)}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      type="text"
                      placeholder="Search for your area or address..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black shadow-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') e.preventDefault();
                      }}
                    />
                  </Autocomplete>
                )}
                <div className="w-full h-[220px] rounded-xl overflow-hidden border border-gray-200">
                  {isMapLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={
                        addressForm.lat && addressForm.lng
                          ? { lat: Number(addressForm.lat), lng: Number(addressForm.lng) }
                          : DEFAULT_CENTER
                      }
                      zoom={addressForm.lat && addressForm.lng ? 15 : 10}
                      onLoad={onMapLoad}
                      onUnmount={onMapUnmount}
                      onClick={onMapClick}
                      options={{ disableDefaultUI: true, zoomControl: true }}
                    >
                      {addressForm.lat && addressForm.lng && (
                        <Marker
                          position={{ lat: Number(addressForm.lat), lng: Number(addressForm.lng) }}
                          draggable
                          onDragEnd={onMarkerDragEnd}
                        />
                      )}
                    </GoogleMap>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-50">
                      <FiLoader className="animate-spin text-gray-400 h-6 w-6" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Click on the map or drag the pin to set your exact location
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const nameInput = document.getElementById('address-name-input');
                    if (nameInput) nameInput.focus();
                  }}
                  className="w-full bg-[#FFD000] text-black rounded-xl p-3 font-bold mt-2 hover:bg-[#ffdb33] transition-colors shadow-sm"
                >
                  Confirm Location
                </button>
              </div>

              {addressError && (
                <p className="mb-3 text-sm text-red-600 font-medium">{addressError}</p>
              )}

              <div className="flex flex-col gap-3">
                <input
                  id="address-name-input"
                  value={addressForm.username}
                  onChange={(e) => handleAddressChange('username', e.target.value)}
                  placeholder="Full name"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  value={addressForm.mobileNo}
                  onChange={(e) => handleAddressChange('mobileNo', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Mobile number"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                />

                <textarea
                  value={addressForm.fullAddress}
                  onChange={(e) => handleAddressChange('fullAddress', e.target.value)}
                  placeholder="Full address"
                  rows="3"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                />

                <input
                  value={addressForm.landmark}
                  onChange={(e) => handleAddressChange('landmark', e.target.value)}
                  placeholder="Landmark"
                  className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={addressForm.area}
                    onChange={(e) => handleAddressChange('area', e.target.value)}
                    placeholder="Area"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                  />

                  <input
                    value={addressForm.pincode}
                    onChange={(e) => handleAddressChange('pincode', e.target.value)}
                    placeholder="Pincode"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                  />

                  <input
                    value={addressForm.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    placeholder="City"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                  />

                  <input
                    value={addressForm.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    placeholder="State"
                    className="border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2">Save address as</p>

                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(ADDRESS_TYPES).map(([type, meta]) => {
                      const Icon = meta.icon;
                      const isActive = addressForm.type === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleAddressChange('type', type)}
                          className={`rounded-xl border p-3 text-sm font-bold flex items-center justify-center gap-1 ${
                            isActive
                              ? 'bg-[#FFD000] border-black text-black'
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          <Icon />
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAddressSaving || !addressForm.lat || !addressForm.lng}
                  className="w-full bg-black text-white rounded-xl p-4 font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isAddressSaving && <FiLoader className="animate-spin" />}
                  Save Address
                </button>
              </div>
            </form>
          )}
        </div>

        {checkoutStep === 'cart' && (
          <div className="absolute bottom-0 w-full p-4 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
            {isLoggedIn && selectedAddress && (
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-gray-700">
                    Delivering to{' '}
                    <span className="font-bold text-black">
                      {(ADDRESS_TYPES[selectedAddress.type] || ADDRESS_TYPES[3]).label}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-1">
                    {selectedAddress.fullAddress}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('addresses')}
                  className="shrink-0 text-sm font-bold text-black"
                >
                  Change
                </button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-[25%] min-w-0 relative cursor-pointer group">
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase leading-none text-gray-500">
                    PAY USING
                    <span className="mt-0.5 h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-black"></span>
                  </div>
                  <p className="mt-1 truncate text-xs font-semibold leading-none text-black">
                    {paymentMethod}
                  </p>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  >
                    <option value="Online">Online</option>
                    {isCODAllowed && <option value="COD">COD</option>}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setCheckoutStep('mobile');
                      return;
                    }

                    if (!selectedAddress) {
                      openAddAddressForm();
                      return;
                    }

                    if (!isProcessingOrder) {
                      handlePayment();
                    }
                  }}
                  disabled={isProcessingOrder}
                  className={`w-[75%] bg-[#FFD000] hover:bg-[#ffdb33] text-black rounded-xl px-4 py-3 flex items-center justify-center transition-colors shadow-md ${isProcessingOrder ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoggedIn && !selectedAddress ? (
                    <div className="flex items-center justify-center gap-2 font-bold text-base">
                      <FiPlus />
                      Add Address
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 font-bold text-base">
                      {isLoggedIn ? 'Place Order' : 'Login'}
                      <FiChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </div>
                  )}
                </button>
              </div>

              {!isCODAllowed && codSettings.isLoaded && codSettings.ordersEnabled && codSettings.userOrderCount < codSettings.perUserLimit && (
                <p className="text-[10px] text-gray-500 max-w-[200px] leading-tight">
                  COD is available only for orders between ₹{codSettings.minPrice} and ₹{codSettings.maxPrice}.
                </p>
              )}
            </div>
          </div>
        )}

        {checkoutStep === 'mobile' && (
          <div className="absolute bottom-0 w-full p-4 bg-[#f8f9fa] border-t">
            <button
              type="button"
              onClick={handleContinueToOtp}
              disabled={!isMobileValid}
              className={`w-full rounded-xl p-4 text-lg font-medium transition-colors shadow-md ${isMobileValid ? 'bg-[#FFD000] hover:bg-[#ffdb33] text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Continue
            </button>
          </div>
        )}

        {checkoutStep === 'otp' && (
          <div className="absolute bottom-0 w-full p-4 bg-[#f8f9fa] border-t">
            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={!isOtpValid}
              className={`w-full rounded-xl p-4 text-lg font-medium transition-colors shadow-md ${isOtpValid ? 'bg-[#FFD000] hover:bg-[#ffdb33] text-black' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Loading Overlay */}
        {isProcessingOrder && (
          <div className="absolute inset-0 z-[300] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <img src={loaderGif} alt="Processing" className="w-48 h-auto mb-4" />
            <p className="font-semibold text-gray-700">Processing your order...</p>
          </div>
        )}

        {/* Payment Success Overlay */}
        {paymentSuccess && (
          <div className="absolute inset-0 z-[300] bg-white flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-[0_0_0_15px_rgba(220,252,231,0.5)] animate-[bounce_1s_ease-in-out_infinite]">
              <FiCheck className="w-12 h-12 text-green-600 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 font-medium text-center px-8">
              Thank you for shopping with Petric. Your order has been placed successfully.
            </p>
          </div>
        )}

      </div>
    </>
  );
}
