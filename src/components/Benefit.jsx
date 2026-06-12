import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import dogImg from '../assets/sidedog.png'; 
import B1 from '../assets/benifits/B1.png';
import B2 from '../assets/benifits/new_B2.png';
import B3 from '../assets/benifits/new_B3.png';
import B4 from '../assets/benifits/new_B4.png';
import B5 from '../assets/benifits/new_B5.png';

const Card = ({ title, desc, icon, bgColor }) => (
  <div className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col items-center text-center shadow-[0_4px_24px_rgba(0,0,0,0.05)] border border-gray-100 h-full justify-between hover:-translate-y-1 transition-transform duration-300 cursor-pointer group">
    <div className={`w-20 h-20 sm:w-28 sm:h-28 rounded-full ${bgColor} flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-105 overflow-hidden`}>
      <img src={icon} alt={title} className="w-16 h-16 sm:w-24 sm:h-24 object-contain mix-blend-multiply scale-110" />
    </div>
    <div className="flex-1 flex flex-col justify-start items-center w-full">
      <div className="mb-4 sm:mb-6">
        <h3 className="font-extrabold text-[#1F1A17] text-base sm:text-lg mb-1.5 leading-snug">{title}</h3>
        <p className="text-[#8B847C] text-[10px] sm:text-[11px] leading-relaxed px-1 font-medium">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

const Banner = () => (
  <div className="bg-gradient-to-br from-[#FDF1C4] to-[#FCE18D] rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-10 flex relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.05)] h-[280px] lg:h-full w-full group cursor-pointer">
    <div className="relative z-10 w-[60%] lg:w-[55%] flex flex-col justify-center h-full">
      <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full w-fit mb-3 sm:mb-4 shadow-sm">
        <span className="text-[#FF5757] font-bold text-[9px] sm:text-xs uppercase tracking-wider">Most Loved</span>
      </div>
      <h3 className="text-[32px] sm:text-[48px] lg:text-[52px] font-extrabold text-[#1F1A17] mb-1.5 sm:mb-2 leading-[1.05] tracking-tight font-serif">
        Food &<br />Nutrition
      </h3>
      <div className="w-10 sm:w-14 h-1 sm:h-1.5 bg-[#FFD000] mb-3 sm:mb-4 rounded-full"></div>
      <p className="text-[#574F49] text-[11px] sm:text-[13px] font-medium mb-4 sm:mb-6 max-w-[180px] sm:max-w-[220px] lg:max-w-[260px] leading-relaxed">
        Wholesome meals and balanced nutrition for a healthy, happy pet.
      </p>
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FFD000] text-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
        <FiChevronRight className="text-lg sm:text-2xl" strokeWidth={3} />
      </div>
    </div>
    
    <div className="absolute right-0 bottom-0 w-[55%] h-full flex items-end justify-end pointer-events-none">
      <img src={dogImg} alt="Happy Dog" className="object-cover sm:object-contain h-[90%] sm:h-[105%] object-bottom origin-bottom transition-transform duration-500 group-hover:scale-105" />
    </div>
  </div>
);

export default function Benefit() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FCFAF2] py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-16 font-sans">
      
      <div className="text-center mb-10 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#3b2d28] mb-3 sm:mb-5 leading-tight tracking-tight">
          Everything Your <span className="text-[#FFD000]">Pet Needs!</span>
        </h2>
        <p className="text-[#4A433E] text-xs sm:text-[17px] font-medium tracking-wide">
          Top-quality products. Trusted by pet parents. Delivered fast.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-[1280px] mx-auto">
        
        <div className="order-2 lg:order-1 grid grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 h-full">
          <Card title="Treats" desc="that they love the most" icon={B2} bgColor="bg-[#FCD8E0]" />
          <Card title="Medicines" desc="that support their good health" icon={B3} bgColor="bg-[#D8EDFA]" />
        </div>
        
        <div className="order-1 lg:order-2 lg:col-span-2 h-full">
          <Banner />
        </div>
        
        <div className="order-3 lg:order-3 grid grid-cols-2 lg:flex lg:flex-col gap-4 sm:gap-6 h-full">
          <Card title="Prescribed" desc="vet food just for your pet" icon={B4} bgColor="bg-[#DCF1E4]" />
          <Card title="Accessories" desc="that are must have for every pet" icon={B5} bgColor="bg-[#E4DDF7]" />
        </div>

      </div>
    </div>
  );
}