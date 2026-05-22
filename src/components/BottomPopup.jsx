import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import laptopImage from '../assets/laptop_hi.png';
import mobileImage from '../assets/hi.jpg';

export default function BottomPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('petric_download_popup_seen');

    if (hasSeenPopup) {
      return;
    }

    sessionStorage.setItem('petric_download_popup_seen', 'true');

    requestAnimationFrame(() => {
      setIsEntering(true);

      document.body.classList.add('popup-open');

      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    });

    return () => {
      document.body.classList.remove('popup-open');
    };
  }, []);

  // Auto-close when scrolling near footer
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate when footer image would be near the popup
      const footerSection = document.querySelector('[class*="p-6 sm:p-8 md:p-10"]') ||
                           document.querySelector('footer');

      if (footerSection) {
        const footerRect = footerSection.getBoundingClientRect();
        const footerTop = scrollY + footerRect.top;

        // If user scrolled so that footer is within 300px of viewport bottom
        if (footerTop - scrollY < windowHeight + 200) {
          handleClose();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handleClose = () => {
    document.body.classList.remove('popup-open');

    setIsClosing(true);

    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
      setIsEntering(false);
    }, 800);
  };

  if (!isEntering) return null;

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-700 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        } ${!isVisible ? 'pointer-events-none' : ''}`}
        onClick={handleClose}
      />

      {/* Popup Container */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 ${
          isClosing
            ? 'animate-slideDownOut'
            : 'animate-slideUpIn'
        }`}
      >
        <div className="relative w-full max-w-7xl px-2 sm:px-4 md:px-6 py-2 mx-auto">
          {/* Image */}
          <div className="relative overflow-hidden shadow-2xl rounded-2xl sm:rounded-3xl">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 backdrop-blur border border-gray-200 rounded-full p-1.5 sm:p-2 z-20 "
              aria-label="Close popup"
            >
              <FiX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
            <img
              src={laptopImage}
              alt="Welcome to Petric"
              className="hidden md:block w-full max-h-[320px] object-cover"
            />
            <img
              src={mobileImage}
              alt="Welcome to Petric"
              className="md:hidden w-full max-h-[260px] object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}