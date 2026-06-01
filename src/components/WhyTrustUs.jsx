import React from 'react';
import { FiCheck, FiZap, FiPackage, FiClock } from 'react-icons/fi';
import trustImg from '../assets/Cozy_moments.png';
import { Link } from 'react-router-dom';

const trustPoints = [
  // { icon: FiZap, title: 'Lightning Fast', subtitle: 'Delivery in 59 mins' },
  // { icon: FiPackage, title: 'Full Inventory', subtitle: 'Deep pet supply stock' },
  // { icon: FiClock, title: 'On-Demand', subtitle: 'Any item, just ask' },
  { icon: FiZap, title: 'Every Item Delivered in minutes'},
  { icon: FiPackage, title: 'We source it if we don\'t have it'},
  { icon: FiClock, title: 'Belief in coexistance with animals'},
];

const trustFeatures = [
  "Delivery within 59 minutes",
  "Deep pet supply inventory",
  "Item availability on request"
];

export default function WhyTrustUs() {
  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-8 py-8 sm:py-12 md:py-16 mb-8 sm:mb-12 md:mb-14 font-sans">
      <div className="text-center mb-6 sm:mb-8 md:mb-12">

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-black mb-2 sm:mb-3 md:mb-4">
          Why Pet Parents <span className="text-[#FF5757]">Trust Us</span>?
        </h2>
        <p className="text-gray-500 text-[11px] sm:text-sm md:text-base max-w-lg mx-auto px-4">
          {/* Not just a faceless brand. We're real pet parents who are facing the same issues that you are. */}
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-[#FFF2B8] rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-6 md:p-10 lg:p-12 shadow-xl sm:shadow-2xl border border-[#FFE880]/50 relative overflow-hidden">
        {/* Decorative circles */}
        

        {/* Content Layout - stacked on mobile, side by side on lg */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 relative z-10">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-4 sm:gap-6">
            <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium leading-relaxed text-center mx-auto">
              We stay in touch with pet parents and help them find everything they're <br /> looking for. Same problems. Same love. Real answers.
            </p>

            {/* Trust Points - horizontal scroll on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {trustPoints.map((point, i) => (
                <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 sm:flex-col sm:items-center sm:text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#FFD000] to-[#FFEC6E] rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 sm:shrink shadow-sm">
                    <point.icon className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
                  </div>
                  <div className="sm:mt-2 sm:mb-1">
                    <h4 className="font-bold text-black text-[11px] sm:text-sm">{point.title}</h4>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">{point.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

          {/* Right Image - hidden on very small screens, shown on sm+ */}
          {/* <div className="hidden sm:block flex-1 w-full relative border-white border-2 sm:border-4 rounded-2xl sm:rounded-[2rem] shadow-lg sm:shadow-xl overflow-hidden">
              <img src={trustImg} alt="Happy Pet Parent" className="w-full h-full object-cover rounded-lg sm:rounded-xl" />
            {/* Decorative elements *\/}
            
          </div> */}
        </div>
      </div>
    </div>
  );
}
