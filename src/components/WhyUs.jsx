import React from 'react';
import { Link } from 'react-router-dom';

export default function WhyUs() {
  return (
    <div className="w-full flex flex-col items-center py-12 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl balsamiq-sans-bold mb-6 text-center text-[#1D3557]">
        Why Petric?
      </h2>
      <div className="flex flex-col gap-4 text-center text-gray-700 max-w-3xl mb-8 text-sm sm:text-base md:text-lg">
        <p>Petric was made by pet parents. For pet parents.</p>
        <p>All the problems we’re trying to solve in the pet care industries are the exact ones that we also face. Whether a particular brand not being available or item needed urgently, Petric fills the gap so perfectly that existing options can’t.</p>
        <p>Our whole team is pet parents themselves. Therefore, we understand other pet parents well.</p>
      </div>
      <Link
        to="/story"
        className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
      >
        Read Our Story
      </Link>
    </div>
  );
}
