import React from 'react';

import { useDialog } from '../context/DialogContext';

import img1 from '../assets/grooming/grooming7.png';
import img2 from '../assets/grooming/grooming8.png';

const services = [
  {
    img: img1,
    title: "Boarding",
    description: "Safe, Comfortable Stays When You’re Away",
  },
  {
    img: img2,
    title: "Medical Boarding",
    description: "Specialized Care for Pets with Health Needs",
  },
];

export default function OtherServiceForPet() {
  const { showDialog } = useDialog();
  return (
    <div className="px-4 pt-5 sm:mt-0 sm:px-8 md:px-12 lg:px-20 pb-10 sm:pb-16 md:pb-20">
      <div className="mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl balsamiq-sans-bold primary-color text-center mb-8 sm:mb-10 md:mb-12 px-4">
          Other Services For Your Pet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-2xl border p-6 sm:p-8 flex flex-col items-center text-center w-full">
              <div className="w-48 h-32 sm:w-64 sm:h-40 md:w-80 md:h-48 lg:w-96 lg:h-60 rounded-full overflow-hidden">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl sm:text-2xl primary-color mt-4 sm:mt-6">{service.title}</h3>
              <p className="text-sm sm:text-base mt-2 px-2">{service.description}</p>
              <button className="mt-6 sm:mt-8 bg-white border border-[#1D3557] primary-color font-semibold py-2 px-6 sm:px-8 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base" onClick={showDialog}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 