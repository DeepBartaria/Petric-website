import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiGrid, FiChevronRight } from 'react-icons/fi';
import { BsArrowRepeat } from 'react-icons/bs';
import logo from '../assets/logo.png'; 

export default function NewHomeNavbar() {
  const placeholders = ['Type "pedigree"', 'Type "milk"', 'Type "nutrition"'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Top Navbar */}
      <div className="bg-white py-4 px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Petric Logo" className="h-10 md:h-14 object-contain" />
        </Link>
        
        {/* Search */}
        <div className="flex-1 max-w-3xl hidden md:block relative group">
          <div className="relative flex items-center w-full h-12 rounded-full border border-gray-400 bg-white overflow-hidden transition-colors duration-200 group-hover:border-black">
            <div className="pl-4 pr-3 text-[#FFD000]">
              <FiSearch className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" strokeWidth={3} />
            </div>
            <div className="flex-1 h-full relative pr-[120px]">
              <input 
                type="text"
                className="absolute inset-0 w-full h-full outline-none px-1 text-sm text-gray-700 bg-transparent z-10"
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
                    className="flex flex-col transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateY(-${currentIndex * 48}px)` }}
                  >
                    {placeholders.map((text, i) => (
                      <div key={i} className="h-12 w-full flex items-center px-1 text-gray-400 text-sm whitespace-nowrap">
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 border-b border-black hover:border-[#FFD000] transition-colors duration-200">
              <a href="#" className="text-xs text-black font-medium whitespace-nowrap hover:text-gray-700 transition-colors duration-200">Check Delivery Time</a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
          <button className="bg-[#FFD000] hover:bg-[#ffdb33] text-black font-medium py-2 md:py-2.5 px-4 md:px-6 rounded-full text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-md">
            Download App
          </button>
          
          <button className="flex flex-row items-center gap-1.5 text-gray-800 hover:text-black hidden sm:flex transition-all duration-300 hover:scale-105">
            <BsArrowRepeat className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
            <span className="text-xs md:text-sm font-medium">Reorder</span>
          </button>
          
          <button className="flex flex-row items-center gap-1.5 text-gray-800 hover:text-black hidden sm:flex border border-gray-400 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 hover:border-black hover:shadow-sm bg-white">
            <FiUser className="h-5 w-5" />
            <span className="text-xs md:text-sm font-medium">Account</span>
          </button>
        </div>
      </div>

      {/* Categories Sub-navbar */}
      <div className="bg-[#FFD000] py-3.5 px-4 md:px-8 flex items-center gap-6 md:gap-10 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <button className="flex items-center gap-2 font-bold text-black whitespace-nowrap border-b-[3px] border-transparent hover:border-black transition-all duration-300 pb-0.5 shrink-0 group">
          <FiGrid className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
          All Categories
        </button>
        
        {['Dog Food', 'Cat Food', 'Vet Food', 'Treats', 'Toys', 'Meds', 'Supplements', 'Grooming'].map(category => (
          <Link key={category} to="#" className="text-black text-lg font-medium whitespace-nowrap transition-all duration-300 shrink-0 hover:scale-[1.05] hover:text-gray-800 px-2 py-1 rounded-md hover:bg-black/5">
            {category}
          </Link>
        ))}

        <div className="flex-1 min-w-[20px]"></div> {/* Spacer */}

        <button className="bg-black text-white p-1 rounded-full shrink-0 flex items-center justify-center h-7 w-7 md:h-8 md:w-8 sticky right-0 transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          <FiChevronRight className="h-4 w-4 md:h-5 md:w-5 text-[#FFD000]" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
