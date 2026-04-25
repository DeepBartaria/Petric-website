import React from 'react';
import B1 from '../assets/benifits/B1.png';
import B2 from '../assets/benifits/B2.png';
import B3 from '../assets/benifits/B3.png';
import B4 from '../assets/benifits/B4.png';
import B5 from '../assets/benifits/B5.png';
import B6 from '../assets/benifits/B6.png';

const benefits = [
  { icon: B1, title: 'Food', desc: 'that gives them right nutrition' },
  { icon: B2, title: 'Treats', desc: 'that they love the most' },
  { icon: B3, title: 'Medicines', desc: 'that support their good health' },
  { icon: B4, title: 'Prescribed', desc: 'vet food just for your pet' },
  { icon: B5, title: 'Accessories', desc: 'that are must have for every pet' },
  { icon: B6, title: '24x7', desc: 'surgery support for instant help' },
];

export default function Benefit() {
  return (
    <div className="w-full flex flex-col items-center bg-[#ffeeee] py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl balsamiq-sans-bold text-center mb-10 text-[#1D3557]">
        Everythings your Pets need...
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {benefits.map((benefit, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="bg-[#ffeeee] p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <img src={benefit.icon} alt={benefit.title} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold text-[#1D3557] group-hover:text-yellow-500 transition-colors duration-300">{benefit.title}</h3>
              <p className="text-sm sm:text-base font-medium text-gray-600">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 