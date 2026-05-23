import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

import desktopPopupImage from '../assets/App_download_popup/desktop_popup.png';
import mobilePopupImage from '../assets/App_download_popup/mobile_popup.png';

const POPUP_DELAY_MS = 10000;

export default function BottomPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('petric_download_popup_seen');

    if (hasSeenPopup) {
      return;
    }

    const popupTimer = setTimeout(() => {
      sessionStorage.setItem('petric_download_popup_seen', 'true');

      setIsEntering(true);
      document.body.classList.add('popup-open');

      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, POPUP_DELAY_MS);

    return () => {
      clearTimeout(popupTimer);
      document.body.classList.remove('popup-open');
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const footerSection =
        document.querySelector('[class*="p-6 sm:p-8 md:p-10"]') ||
        document.querySelector('footer');

      if (!footerSection) return;

      const footerRect = footerSection.getBoundingClientRect();

      if (footerRect.top < window.innerHeight + 200) {
        handleClose();
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
      <div
        className={`fixed inset-0 z-[9998] bg-black/60 transition-opacity duration-700 ${
          isClosing || !isVisible ? 'opacity-0' : 'opacity-100'
        } ${!isVisible ? 'pointer-events-none' : ''}`}
        onClick={handleClose}
      />

      <div
        className={`fixed inset-x-0 bottom-0 z-[9999] ${
          isClosing ? 'animate-slideDownOut' : 'animate-slideUpIn'
        }`}
      >
        <div className="relative mx-auto w-full max-w-7xl px-3 pb-3 sm:px-5 sm:pb-5 md:px-8 md:pb-6">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-2 top-2 z-20 rounded-full border border-white/40 bg-black/75 p-2 text-white backdrop-blur transition hover:bg-black sm:right-3 sm:top-3"
              aria-label="Close download app popup"
            >
              <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <img
              src={desktopPopupImage}
              alt="Download the Petric app"
              className="hidden max-h-[340px] w-full object-cover md:block"
            />

            <a
              href="https://petric.in/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="block md:hidden"
              aria-label="Download the Petric app"
            >
              <img
                src={mobilePopupImage}
                alt="Download the Petric app"
                className="max-h-[420px] w-full object-cover"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}