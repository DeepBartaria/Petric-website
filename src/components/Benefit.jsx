import React from 'react';
import B1 from '../assets/benifits/B1.png';
import B2 from '../assets/benifits/B2.png';
import B3 from '../assets/benifits/B3.png';
import B4 from '../assets/benifits/B4.png';
import B5 from '../assets/benifits/B5.png';
import B6 from '../assets/benifits/B6.png';
import { FiHeart, FiZap, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const benefits = [
  { icon: B1, title: 'Food', desc: 'that gives them right nutrition', gradient: 'from-orange-100 to-orange-50' },
  { icon: B2, title: 'Treats', desc: 'that they love the most', gradient: 'from-yellow-100 to-yellow-50' },
  { icon: B3, title: 'Medicines', desc: 'that support their good health', gradient: 'from-pink-100 to-pink-50' },
  { icon: B4, title: 'Prescribed', desc: 'vet food just for your pet', gradient: 'from-blue-100 to-blue-50' },
  { icon: B5, title: 'Accessories', desc: 'that are must have for every pet', gradient: 'from-purple-100 to-purple-50' },
  { icon: B6, title: '24x7', desc: 'surgery support for instant help', gradient: 'from-red-100 to-red-50' },
];

export default function Benefit() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FFF2B8] py-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-[#FFD000]/20"><FiStar size={50} /></div>
      <div className="absolute top-40 right-20 text-[#FFD000]/15"><FiStar size={35} /></div>
      <div className="absolute bottom-20 left-1/4 text-[#FFD000]/10"><FiStar size={45} /></div>

      {/* Header */}
      <div className="text-center mb-14 relative z-10">
        <Link
          to="/all-categories"
          className="inline-flex items-center gap-2 bg-[#FFD000] text-black text-xs sm:text-sm font-bold px-5 py-2 rounded-full mb-6 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <FiHeart className="w-4 h-4" />
          <span>Complete Pet Care</span>
        </Link>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-black">
          Everything your <span className="text-[#F5C400]"> pet needs</span>
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mt-5 leading-relaxed font-medium">
          Food, treats, medicines, toys, and essentials —
          delivered to your doorstep in minutes.
        </p>
      </div>

      {/* Benefits — horizontal scroll on mobile, grid on desktop */}
      <div className="w-full max-w-5xl relative z-10">

        {/* Mobile: horizontal scroll */}
        <div className="flex sm:hidden gap-3 overflow-x-auto pb-3 px-1 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="shrink-0 snap-center w-36 bg-white rounded-2xl shadow-md p-3 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="mb-2 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <img src={benefit.icon} alt={benefit.title} className="w-18 h-18 object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="text-sm font-bold text-black group-hover:text-[#FF5757] transition-colors leading-tight mb-1">
                {benefit.title}
              </h3>
              <p className="text-[10px] font-medium text-gray-500 leading-snug">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative bg-white  p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-2xl hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-300 group cursor-pointer overflow-hidden"
            >
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="mb-2 md:mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="text-sm md:text-xl font-bold text-black group-hover:text-[#FF5757] transition-colors duration-300 leading-tight mb-1">
                  {benefit.title}
                </h3>
                <p className="text-xs md:text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}