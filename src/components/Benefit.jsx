import React from 'react';
import B1 from '../assets/benifits/B1.png';
import B2 from '../assets/benifits/B2.png';
import B3 from '../assets/benifits/B3.png';
import B4 from '../assets/benifits/B4.png';
import B5 from '../assets/benifits/B5.png';
import B6 from '../assets/benifits/B6.png';
import { FiHeart, FiZap, FiStar } from 'react-icons/fi';

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
    <div className="w-full flex flex-col items-center bg-gradient-to-br from-white via-[#FFF9E5] to-white py-16 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-[#FFD000]/20">
        <FiStar size={50} />
      </div>
      <div className="absolute top-40 right-20 text-[#FFD000]/15">
        <FiStar size={35} />
      </div>
      <div className="absolute bottom-20 left-1/4 text-[#FFD000]/10">
        <FiStar size={45} />
      </div>

      {/* Header Section */}
      <div className="text-center mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#FFD000] text-black text-xs sm:text-sm font-bold px-5 py-2 rounded-full mb-6 shadow-md">
          <FiZap />
          <span>Complete Pet Care</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl balsamiq-sans-bold text-center mb-6 text-[#1D3557]">
          Everything your <span className="text-[#FF5757]">Pets need</span>...
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
          From premium food to love — we have everything your furry companion deserves
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 w-full max-w-5xl relative z-10 px-1 sm:px-2">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${benefit.gradient} p-2.5 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 md:hover:-translate-y-3 transition-all duration-300 group cursor-pointer overflow-hidden border border-white/80`}
          >
            {/* Decorative circle */}
            <div className="absolute -top-3 -right-3 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-white/40 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white/30 rounded-full" />

            <div className="flex flex-col items-center text-center relative z-10">
              <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl p-1.5 sm:p-2.5 md:p-3 shadow-md sm:shadow-lg group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-xl mb-1.5 sm:mb-2 md:mb-3">
                <img src={benefit.icon} alt={benefit.title} className="w-7 h-7 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain" />
              </div>
              <h3 className="text-[10px] sm:text-sm md:text-xl font-bold text-[#1D3557] group-hover:text-[#FF5757] transition-colors duration-300 leading-tight mb-0.5 sm:mb-1">{benefit.title}</h3>
              <p className="hidden sm:block text-[10px] sm:text-xs md:text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">{benefit.desc}</p>
              <div className="mt-1 sm:mt-2 md:mt-3 flex items-center gap-1">
                <FiHeart className="w-2 sm:w-3 h-2 sm:h-3 text-[#FF5757] group-hover:scale-125 transition-transform" />
                <span className="text-[9px] sm:text-xs md:text-sm text-[#1D3557]/60 font-medium">Loved</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom decorative dots */}
      <div className="mt-12 flex items-center gap-3 text-gray-300 text-sm relative z-10">
        <div className="w-2 h-2 bg-[#FFD000] rounded-full" />
        <div className="w-2 h-2 bg-[#FFD000]/60 rounded-full" />
        <div className="w-2 h-2 bg-[#FFD000]/30 rounded-full" />
      </div>
    </div>
  );
} 