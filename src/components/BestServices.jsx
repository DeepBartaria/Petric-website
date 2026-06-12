import React from 'react';

import { useDialog } from '../context/DialogContext';

import img1 from '../assets/service1.png';
import img2 from '../assets/service2.png';
import img3 from '../assets/service3.png';
import img4 from '../assets/service4.jpg';

const services = [
  {
    img: img1,
    title: 'Tele Consultation',
    description: 'Expert Vets, Just a Call Away',
  },
  {
    img: img2,
    title: 'Clinic visit/Consultation',
    description: 'Compassionate Care, Expert Advice.',
  },
  {
    img: img3,
    title: 'Vaccination',
    description: 'Timely Vaccinations - A Life Saver For Pets.',
  },
  {
    img: img4,
    title: 'Surgery',
    description: 'Critical Moment - Handled with Precision',
  },
];

export default function BestServices() {
  const { showDialog } = useDialog();
  return (
    <div className="pt-10 sm:pt-16 md:pt-20">
      <div className="mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl balsamiq-sans-bold primary-color text-center mb-8 sm:mb-10 md:mb-12 px-4">
          Best Services For Your Pet
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap- px-4 sm:px-8 md:px-12 lg:px-20">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-2xl border p-6 sm:p-8 flex flex-col justify-between items-center text-center w-full">
              <div className="w-full h-48 sm:h-52 md:h-50 rounded-full overflow-hidden">
                <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
              </div>
                <h3 className="text-xl sm:text-2xl font-medium primary-color mt-4 sm:mt-6">{service.title}</h3>
                <p className="text-[#333333] mt-2 text-sm sm:text-base text-center w-full">{service.description}</p>
              <button className="mt-6 sm:mt-8 bg-white border border-[#1D3557] primary-color font-semibold py-2 px-6 sm:px-8 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base w-full" onClick={showDialog}>
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 