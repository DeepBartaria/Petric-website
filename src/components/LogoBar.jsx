import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { BsLightningFill, BsArrowRepeat } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { logActivity } from '../helper/analytics';
import useCart from '../hooks/useCart';

export default function LogoBar() {
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [locationName, setLocationName] = useState('');
  const { cartItems } = useCart();
  const itemCount = cartItems?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const prevCountRef = React.useRef(itemCount);
  const [countPop, setCountPop] = useState(false);

  useEffect(() => {
    if (itemCount !== prevCountRef.current && itemCount > 0) {
      prevCountRef.current = itemCount;
      setCountPop(false);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setCountPop(true))
      );
    } else {
      prevCountRef.current = itemCount;
    }
  }, [itemCount]);

  useEffect(() => {
    const fetchLocation = () => {
      const storedTime = localStorage.getItem('petric_delivery_time');
      if (storedTime) setDeliveryTime(storedTime);

      const storedLoc = localStorage.getItem('petric_delivery_location');
      if (storedLoc) {
        try {
          const parsed = JSON.parse(storedLoc);
          if (typeof parsed === 'string') {
            setLocationName(parsed);
          } else if (parsed && parsed.address) {
            setLocationName(parsed.address);
          } else {
            setLocationName("Location Selected");
          }
        } catch (e) {
          setLocationName(storedLoc);
        }
      }
    };

    fetchLocation();

    const handleDeliveryTimeUpdate = (e) => {
      if (e.detail) setDeliveryTime(e.detail);
      fetchLocation(); // Re-fetch location when delivery time updates
    };
    
    window.addEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);
    return () => window.removeEventListener('deliveryTimeUpdated', handleDeliveryTimeUpdate);
  }, []);

  const openModal = () => {
    window.dispatchEvent(new CustomEvent('openDeliveryLocation'));
  };

  return (
    <div className="flex items-center justify-between md:justify-start px-5 py-2 md:px-8 md:py-3 w-full md:w-auto relative">
      
      {/* Logo */}
      <Link
        to="/"
        onClick={() => logActivity('User Click Home Petric Logo', 'Web_LogoClick')}
        className="flex-shrink-0"
      >
        <img src={logo} alt="Petric Logo" className="h-10 sm:h-12 md:h-14 object-contain" />
      </Link>

      {/* Divider */}
      <div className="hidden md:block w-[2px] h-10 bg-gray-200 ml-4 md:ml-6 lg:ml-10 rounded-full" />

      {/* Delivery Info UI */}
      <div 
        onClick={openModal}
        className="flex flex-col justify-center cursor-pointer ml-auto md:ml-6 lg:ml-10"
      >
        <div className="flex items-center justify-end md:justify-start gap-1 md:gap-1.5">
           <BsLightningFill className="text-[#FFC107] h-3 w-3 md:h-5 md:w-5 drop-shadow-sm" />
           <span className="text-[12px] sm:text-xs md:text-lg font-extrabold text-black tracking-tight leading-none">
             {deliveryTime ? (String(deliveryTime).includes('By') ? deliveryTime : `${deliveryTime} minutes`) : 'Check Time'}
           </span>
        </div>
        <div className="flex items-center justify-end md:justify-start gap-1 mt-0.5 md:mt-1 max-w-[110px] sm:max-w-[130px] md:max-w-[200px] ml-auto md:ml-0">
           <span className="text-[10px] md:text-[12px] text-gray-800 font-medium truncate leading-none">
             {locationName 
               ? (locationName.length > 15 ? locationName.slice(0, 15) + '...' : locationName) 
               : 'Select Location'}
           </span>
           <FiChevronDown className="h-3 w-3 md:h-4 md:w-4 text-black shrink-0" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
