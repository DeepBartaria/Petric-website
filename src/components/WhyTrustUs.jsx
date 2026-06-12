import React from 'react';
import { FiTruck, FiStar } from 'react-icons/fi';
import image1 from '../assets/choose1.png';
import image2 from '../assets/choose2.png';
import image3 from '../assets/choose3.png';

export default function WhyTrustUs() {
  return (
    <div className="w-full bg-[#FFFDF5] py-12 md:py-16">
      <div className="w-full max-w-6xl mx-auto px-4 font-sans">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold font-serif text-[#3b2d28] mb-6 md:mb-8 leading-[1.1] tracking-tight drop-shadow-sm">
            Why Pet Parents <br className="block sm:hidden" />
            <span className="text-[#FFD000]">Choose Us</span>?
          </h2>
        </div>

        <div className="max-w-[340px] md:max-w-4xl lg:max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 px-2 sm:px-4">
          {/* Card 1 */}
          <div className="bg-white rounded-[1.2rem] sm:rounded-[1.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col overflow-hidden pb-6 md:pb-8">
            <div className="relative w-full">
              <img src={image1} alt="Authentic" className="w-full h-auto object-contain" />
              <div className="absolute -bottom-5 left-5 bg-[#FFDF62] rounded-xl p-2 shadow-md">
                <FiStar className="text-[#3b2d28] text-[22px]" strokeWidth={2.5} />
              </div>
            </div>
            <div className="px-5 pt-9 text-center">
              <h3 className="text-[18px] sm:text-[20px] font-black font-serif text-[#1F1A17] mb-2 leading-snug">
                100% Authentic &<br className="hidden sm:block lg:hidden" /> quality products
              </h3>
              <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium">
                Handpicked products for the<br className="hidden sm:block lg:hidden" /> right care and comfort.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[1.2rem] sm:rounded-[1.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col overflow-hidden pb-6 md:pb-8">
            <div className="relative w-full">
              <img src={image2} alt="Fast Delivery" className="w-full h-auto object-contain" />
              <div className="absolute -bottom-5 left-5 bg-[#FFDF62] rounded-xl p-2 shadow-md">
                <FiTruck className="text-[#3b2d28] text-[22px]" strokeWidth={2.5} />
              </div>
            </div>
            <div className="px-5 pt-9 text-center">
              <h3 className="text-[18px] sm:text-[20px] font-black font-serif text-[#1F1A17] mb-2 leading-snug">
                All pet supplies<br className="hidden sm:block lg:hidden" /> in minutes
              </h3>
              <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium">
                Orders delivered to your<br className="hidden sm:block lg:hidden" /> doorstep in minutes.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[1.2rem] sm:rounded-[1.5rem] shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col overflow-hidden pb-6 md:pb-8">
            <div className="relative w-full">
              <img src={image3} alt="For Pet Parents" className="w-full h-auto object-contain" />
            </div>
            <div className="px-5 pt-6 text-center">
              <h3 className="text-[18px] sm:text-[20px] font-black font-serif text-[#1F1A17] mb-2 leading-snug">
                Built by pet parents<br className="hidden sm:block lg:hidden" /> for pet parents
              </h3>
              <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium">
                We relate to your issues and<br className="hidden sm:block lg:hidden" /> your urgencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}