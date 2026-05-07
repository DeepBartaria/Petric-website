import React from 'react';
import { FiCheck } from 'react-icons/fi';
import trustImg from '../assets/dog.png'; 

export default function WhyTrustUs() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-10 mb-14 font-sans">
      <h2 className="text-2xl md:text-3xl font-bold text-black text-center mb-8">
        Why Pet Parents Trust Us?
      </h2>
      
      <div className="border-2 border-[#FFD000] rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center bg-white shadow-sm overflow-hidden">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-6 md:pl-4">
          <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed max-w-md">
            We're not just another faceless brand. We stay in touch with the pet parents and assist them in finding exactly what they're looking for.
          </p>
          
          <div className="flex flex-col gap-5 mt-2">
            {[
              "Delivery within 59 minutes",
              "Deep pet supply inventory",
              "Item availability on request"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-[#FFD000] text-white rounded-full p-1 shrink-0 flex items-center justify-center h-6 w-6 shadow-sm">
                  <FiCheck className="h-4 w-4" strokeWidth={4} />
                </div>
                <span className="text-gray-800 font-medium text-lg">{text}</span>
              </div>
            ))}
          </div>

          <button className="bg-black hover:bg-gray-800 text-white rounded-[2rem] px-8 py-3 font-semibold w-fit mt-4 transition-colors shadow-md text-sm">
            Download App
          </button>
        </div>

        {/* Right Image */}
        <div className="flex-1 w-full h-[250px] md:h-[350px] rounded-[1.5rem] overflow-hidden relative shadow-sm border border-gray-100">
           <img src={trustImg} alt="Pet Parent" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
