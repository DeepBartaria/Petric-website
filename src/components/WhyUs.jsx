import React from 'react';
import { Link } from 'react-router-dom';

export default function WhyUs() {
  return (
    <div className="w-full flex flex-col items-center py-12 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl balsamiq-sans-bold mb-6 text-center text-[#1D3557]">
        Why Petric?
      </h2>
      <p className="text-center text-gray-700 max-w-3xl mb-8 text-sm sm:text-base md:text-lg">
        We believe that every pet deserves the best care possible. From top-quality products to experienced veterinarians, we are here to support your pet parenting journey every step of the way. Discover what makes us the ultimate co-parent for your furry friend.
      </p>
      <Link
        to="/story"
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
      >
        Read Our Story
      </Link>
    </div>
  );
}
