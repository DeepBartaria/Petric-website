import React from 'react';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';
import product7 from '../assets/product7.png';
import product8 from '../assets/product8.png';
import product9 from '../assets/product9.png';
import { useDialog } from '../context/DialogContext';

const essentials = [
  { name: 'Dog Food', img: product1 },
  { name: 'Cat Food', img: product2 },
  { name: 'Treats', img: product3 },
  { name: 'Vet Food', img: product4 },
  { name: 'Pharmacy', img: product7 },
  { name: 'Cat Litter', img: product9 },
  { name: 'Essentials', img: product5 },
  { name: 'Toys', img: product1 },
  { name: 'Walking Gears', img: product2 },
  { name: 'Grooming Products', img: product6 },
  { name: 'Fish, Birds & more', img: product8 },
];

export default function Essentials() {
  const { showDialog } = useDialog();
  return (
    <div className="bg-white p-4 sm:p-8 md:p-12 lg:p-20">
      <div className="mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center balsamiq-sans-bold primary-color mb-8 sm:mb-12 md:mb-20 px-4">Everything you can find on the app</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-18">
          {essentials.map((item) => (
            <a
              //  href={`https://wa.me/c/918295756962`}
              href={`https://wa.me/918295756962?text=Hi%20team%21`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <div key={item.name} className="flex flex-col items-center justify-between border border-gray-300 rounded-xl h-50 sm:h-80 md:h-70 p-4 sm:p-4">
                <div className="bg-white rounded-full w-30 h-30 sm:w-20 sm:h-20 md:w-50 md:h-50 flex items-center justify-center">
                  <img src={item.img} alt={item.name} className="h-16 w-16 sm:h-16 sm:w-16 md:h-25 md:w-25 object-contain" />
                </div>
                <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-xl font-semibold text-center">{item.name}</h3>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-8 sm:mt-10 md:mt-12 w-full flex justify-center cursor-pointer">
          <button className="border border-[#1D3557] primary-color font-semibold py-2 px-6 sm:px-8 md:px-12 lg:px-50 rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base" onClick={showDialog}>
            Order Now
          </button>
          {/* <a
              href={`https://wa.me/918295756962`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
          
          </a> */}
        </div>
      </div>
    </div>
  );
} 