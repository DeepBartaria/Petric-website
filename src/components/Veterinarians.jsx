import React, { useEffect, useState } from 'react';
import { getAllVeterinarians } from '../helper/veterinarians';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: '0px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerMode: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        dots: true,
      },
    },
  ],
};

export default function Veterinarians() {
  const [doctors, setDoctors] = useState([]);

  const fetchVeterinarians = async () => {
    try {
      const response = await getAllVeterinarians();
      if (response.type === 'success') {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  useEffect(() => {
    fetchVeterinarians();
  }, [])

  return (
    <div id="doctors" className="w-full flex flex-col items-center pb-5 px-4 sm:px-8 md:px-12 lg:px-20 mb-20">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl balsamiq-sans-bold mb-4 sm:mb-6 md:mb-8 text-center">Our Trusted Partners</h2>
      <div className="w-full">
        <Slider {...settings}>
          {doctors?.map((doc, idx) => (
            <div key={idx} className="flex justify-center">
              <div
                className="relative bg-white rounded-2xl border border-gray-200 shadow-md flex flex-col items-center p-4 sm:p-4 md:p-6 transition-all duration-300 group overflow-hidden mx-2"
                style={{ minHeight: '280px', maxHeight: '370px' }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-50 h-50 md:w-32 md:h-32 object-fit rounded-full mb-2 sm:mb-3 md:mb-4 border-4 border-gray-200 shadow mx-auto"
                />
                <div className="text-center z-10">
                  <div className="font-bold text-sm sm:text-base md:text-lg text-black text-center">{doc.name}</div>
                  <div className="text-xs sm:text-sm text-black opacity-80  text-center">{doc.degree}</div>
                  <div className="text-xs sm:text-sm text-black opacity-80 text-center">{doc.exp + " " + "years of experience"}</div>
                  <div className="text-xs sm:text-sm text-black opacity-80 text-center">{doc.hospital}</div>
                </div>
                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-cover bg-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.89)), url(${doc.image})`,
                  }}
                >
                  <div className="font-bold text-sm sm:text-base md:text-lg mb-1">{doc.name}</div>
                  <div className="text-xs sm:text-sm mb-1">{doc.degree}</div>
                  <div className="text-xs sm:text-sm mb-1">{doc.exp + " " + "years of experience"}</div>
                  <div className="text-xs sm:text-sm">{doc.hospital}</div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );

} 