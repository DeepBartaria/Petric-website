import React from 'react';
import Essentials from '../components/Essentials';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { useDialog } from '../context/DialogContext';
import headerbg from '../assets/petsproductherobg.png';

import StatsBar from '../components/StatsBar';
import ServiceCarousel from '../components/ServiceCarousel';
import Banner from '../components/Banner';

export default function PetsProducts() {
  const { showDialog } = useDialog();
  return (
    <div className="w-full flex flex-col bg-white">
      {/* 1. Hero Banner */}
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[40vh] sm:h-[70vh] md:h-[80vh]" style={{ backgroundImage: `url(${headerbg})` }}>
        <div className="mx-auto flex flex-col px-4 sm:px-8 md:px-20 md:flex-row items-center justify-between h-full rounded overflow-hidden" style={{ minHeight: '340px' }}>
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-6 sm:py-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center balsamiq-sans-bold text-black leading-tight">
              Pet Care Products
            </h1>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold balsamiq-sans-bold text-[#FF5757] mb-6 sm:mb-8 md:mb-12 leading-tight mt-4 text-center">
              Packed & Delivered in Minutes
            </h1>
            <button className="bg-[#1D3557] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow transition w-fit text-base sm:text-lg" onClick={showDialog}>
              Order on App
            </button>
          </div>
        </div>
      </section>

      {/* 2. Stat Banner */}
      <StatsBar />

      {/* 3. Categories */}
      <Essentials />

      {/* 4. Our Brands */}
      <ServiceCarousel customHeading="Our Products" />

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. End Banner */}
      <Banner />
      
      {/* 8. Footer (Includes contact strip "Have A Question ?") */}
      <Footer />
    </div>
  );
}