import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { BsLightningFill } from 'react-icons/bs';
import logo from '../assets/logo.png';

export default function LogoBar() {
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [locationName, setLocationName] = useState('');

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
    <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-3 w-full md:w-auto">
      <Link to="/" className="flex-shrink-0">
        <img src={logo} alt="Petric Logo" className="h-12 md:h-16 object-contain" />
      </Link>

      {/* Divider */}
      <div className="hidden md:block w-[2px] h-10 bg-gray-200 ml-4 md:ml-8 lg:ml-12 rounded-full" />
      
      {/* Delivery Info UI */}
      <div 
        onClick={openModal}
        className="flex flex-col justify-center cursor-pointer ml-auto mr-4 md:mr-6 md:ml-8 lg:ml-12"
      >
        <div className="flex items-center gap-1 md:gap-1.5">
           <BsLightningFill className="text-[#FFC107] h-4 w-4 md:h-5 md:w-5 drop-shadow-sm" />
           <span className="text-base md:text-lg font-extrabold text-black tracking-tight leading-none">
             {deliveryTime ? `${deliveryTime} minutes` : 'Check Time'}
           </span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 md:mt-1 max-w-[130px] md:max-w-[200px]">
           <span className="text-[10px] md:text-[12px] text-gray-800 font-medium truncate leading-none">
             {locationName || 'Select Location'}
           </span>
           <FiChevronDown className="h-3 w-3 md:h-4 md:w-4 text-black shrink-0" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
