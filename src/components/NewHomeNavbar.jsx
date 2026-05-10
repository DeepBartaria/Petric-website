import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiGrid, FiChevronRight, FiMenu } from 'react-icons/fi';
import { BsArrowRepeat } from 'react-icons/bs';
import logo from '../assets/logo.png'; 

export default function NewHomeNavbar() {
  const placeholders = ['Type "pedigree"', 'Type "milk"', 'Type "nutrition"'];
  const quickCategories = ['Dog Food', 'Cat Food', 'Vet Food', 'Treats', 'Toys', 'Meds', 'Supplements', 'Grooming'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top Navbar */}
      <div className="bg-white py-3 px-4 md:px-8 flex items-center justify-between gap-3 md:gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Petric Logo" className="h-8 md:h-14 object-contain" />
        </Link>
        
        {/* Search */}
        <div className="flex-1 max-w-3xl relative group">
          <div className="relative flex items-center w-full h-10 md:h-12 rounded-full border border-gray-400 bg-white overflow-hidden transition-colors duration-200 group-hover:border-black">
            <div className="pl-3 md:pl-4 pr-2 md:pr-3 text-[#FFD000]">
              <FiSearch className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-200 group-hover:scale-110" strokeWidth={3} />
            </div>
            <div className="flex-1 h-full relative pr-[10px] md:pr-[120px]">
              <input 
                type="text"
                className="absolute inset-0 w-full h-full outline-none px-1 text-xs md:text-sm text-gray-700 bg-transparent z-10"
                placeholder=""
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {/* Animated Placeholder */}
              {!isFocused && !inputValue && (
                <div className="absolute inset-0 pointer-events-none flex flex-col overflow-hidden">
                  <div 
                    className="flex flex-col transition-transform duration-500 ease-in-out w-full h-full"
                    style={{ transform: `translateY(-${currentIndex * 100}%)` }}
                  >
                    {placeholders.map((text, i) => (
                      <div key={i} className="h-full w-full shrink-0 flex items-center px-1 text-gray-400 text-xs md:text-sm whitespace-nowrap">
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block border-b border-black hover:border-[#FFD000] transition-colors duration-200 z-20">
              <a href="#" className="text-xs text-black font-medium whitespace-nowrap hover:text-gray-700 transition-colors duration-200">Check Delivery Time</a>
            </div>
          </div>
        </div>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 md:gap-8 flex-shrink-0">
          <button className="bg-[#FFD000] hover:bg-[#ffdb33] text-black font-medium py-2 md:py-2.5 px-4 md:px-6 rounded-full text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md">
            Download App
          </button>
          
          <Link to="/reorder" className="group flex flex-row items-center gap-1.5 text-gray-800 hover:text-black transition-all duration-300 hover:scale-105">
            <BsArrowRepeat className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="text-sm font-medium">Reorder</span>
          </Link>
          
          <button className="flex flex-row items-center gap-1.5 text-gray-800 hover:text-black border border-gray-400 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:border-black hover:shadow-sm bg-white">
            <FiUser className="h-5 w-5" />
            <span className="text-sm font-medium">Account</span>
          </button>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="lg:hidden flex items-center shrink-0 relative">
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-black p-1">
             <FiMenu className="h-6 w-6" />
           </button>
           
           {/* Mobile Menu Dropdown */}
           {isMobileMenuOpen && (
             <div className="absolute top-10 right-0 w-48 bg-white shadow-xl rounded-xl border border-gray-100 flex flex-col py-2 z-50">
               <button className="w-full text-left px-4 py-3 text-sm font-bold text-black hover:bg-gray-50 flex items-center gap-2">
                 <span className="bg-[#FFD000] text-black px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">App</span> Download App
               </button>
               <Link to="/reorder" className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2">
                 <BsArrowRepeat className="h-4 w-4" /> Reorder
               </Link>
               <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 flex items-center gap-2">
                 <FiUser className="h-4 w-4" /> Account
               </button>
             </div>
           )}
        </div>
      </div>

      {/* Categories Sub-navbar */}
      <div className="bg-[#FFD000] px-3 py-2.5 md:py-3.5 md:px-8">
        {/* Mobile */}
        <div className="md:hidden">
          <div className="rounded-2xl border border-black/10 bg-white/90 p-2 shadow-sm">
            <div className="relative">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-5 bg-gradient-to-r from-white/95 to-transparent"></div>
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-5 bg-gradient-to-l from-white/95 to-transparent"></div>
              <div className="flex items-center gap-2 overflow-x-auto px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <Link
                  to="/all-categories"
                  className="shrink-0 rounded-full bg-black px-3.5 py-2 text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                >
                  <FiGrid className="h-3.5 w-3.5" strokeWidth={2.8} />
                  All Categories
                </Link>

                {quickCategories.map((category) => (
                  <Link
                    key={category}
                    to="/all-categories"
                    className="shrink-0 whitespace-nowrap rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition-colors hover:bg-[#FFF4B8]"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <Link
              to="/all-categories"
              className="relative overflow-hidden group px-3 py-1 rounded-md text-black text-lg font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] shrink-0 isolate"
            >
              <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
              All Categories
            </Link>

          {quickCategories.map((category) => (
            <Link
              key={category}
              to="#"
              className="relative overflow-hidden group px-3 py-1 rounded-md text-black text-lg font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#FFD000] shrink-0 isolate"
            >
              <span className="absolute top-0 left-0 w-full h-0 bg-black transition-all duration-300 ease-in-out group-hover:h-full -z-10"></span>
              {category}
            </Link>
          ))}

          <div className="flex-1 min-w-[20px]"></div>

          <button className="bg-black text-white p-1 rounded-full shrink-0 flex items-center justify-center h-8 w-8 sticky right-0 transition-transform duration-300 hover:scale-110 hover:shadow-lg">
            <FiChevronRight className="h-5 w-5 text-[#FFD000]" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
