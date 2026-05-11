import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import laptopImage from '../assets/laptop_hi.png';
import mobileImage from '../assets/hi.jpg';

export default function BottomPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    // Start animation after render
    requestAnimationFrame(() => {
      setIsEntering(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    });
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
        <div className="relative w-full px-6 sm:px-8 md:px-10 py-2 mx-auto">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full p-2 shadow-xl z-10 hover:bg-gray-100 hover:scale-110 transition-all duration-300 active:scale-95"
            aria-label="Close popup"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          {/* Image */}
          <div className="relative overflow-hidden shadow-2xl rounded-t-2xl sm:rounded-t-3xl">
            <img
              src={laptopImage}
              alt="Welcome to Petric"
              className="hidden md:block w-full object-cover"
            />
            <img
              src={mobileImage}
              alt="Welcome to Petric"
              className="md:hidden w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}