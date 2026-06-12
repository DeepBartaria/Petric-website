import React, { useState } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from 'react-router-dom';
import clinic from '../assets/clinicappointment.png';
import vaccination from '../assets/vaccination.png';
import teleconsultation from '../assets/teleconsultation.png';
import bath from '../assets/gone.png';
import tick from '../assets/gtwo.png';
import ear from '../assets/gthree.png';
import hair from '../assets/gfour.jpg';
import petproducts from '../assets/petBanner.png';

import pedigree from '../assets/pedigree.png';
import drools from '../assets/drools.png';
import whiskas from '../assets/whiskas.png';
import royalcanin from '../assets/royalcanin.png';
import sheba from '../assets/sheba.png';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import brand3 from '../assets/brand3.png';
import brand4 from '../assets/brand4.png';
import brand5 from '../assets/brand5.png';
import brand6 from '../assets/brand6.png';
import useIsMobile from "../useIsMobile";


const tabs = [
  // 'Healthcare',
  'Pet Products',
  // 'Grooming & More',
];

const healthcareCards = [
  {
    img: clinic,
    title: 'Clinic Appointment',
    bg: 'bg-[#e3f2fd]'
  },
  {
    img: vaccination,
    title: 'Vaccination',
    bg: 'bg-[#ffeaea]'
  },
  {
    img: teleconsultation,
    title: 'Tele Consultation',
    bg: 'bg-[#fff7e6]'
  },
];

const groomingCards = [
  {
    img: bath,
    title: 'BATH AND BRUSH',
  },
  {
    img: tick,
    title: 'TICK & FLEA TREATMENT',
  },
  {
    img: ear,
    title: 'EAR CLEANING',
  },
  {
    img: hair,
    title: 'HAIR CUTTING',
  },
];

const brands = [
  { img: pedigree, alt: 'Pedigree', discount: '26%' },
  { img: royalcanin, alt: 'Royal Canin', discount: '27%' },
  { img: brand1, alt: 'Farmina N&D', discount: '28%' },
  { img: brand2, alt: 'Vet-Life', discount: '23%' },
  { img: sheba, alt: 'Sheba', discount: '24%' },
  { img: whiskas, alt: 'Whiskas', discount: '24%' },
  { img: drools, alt: 'Drools', discount: '28%' },
  { img: brand3, alt: 'HUFT', discount: '17%' },
  { img: brand4, alt: 'JerHigh', discount: '15%' },
  { img: brand5, alt: 'Purina Pro', discount: '23%' },
  { img: brand6, alt: 'Farmina Matisse', discount: '24%' },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    // {
    //   breakpoint: 480,
    //   settings: {
    //     slidesToShow: 1,
    //   },
    // },
  ],
};

export default function ServiceCarousel({ customHeading }) {
  const [currentTab, setCurrentTab] = useState(0);
  const isMobile = useIsMobile();
  return (
    <div className="w-full flex flex-col items-center py-10 p-4 sm:p-8 md:p-12 lg:p-20">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl balsamiq-sans-bold text-black mb-2 text-center">
        {customHeading ? customHeading : <>The Ultimate Pet Care :  <br className='md:hidden' /> Essentials, Everyday, Everywhere</>}
      </h2>
      {/* Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 md:gap-8 my-6 sm:my-8 md:my-10 w-full border-b">
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            className={`pb-2 px-1 sm:px-2 text-sm sm:text-base md:text-lg font-semibold cursor-pointer ${idx === currentTab ? 'border-b-3 border-[#1D3557] text-black' : 'text-gray-500'} w-full text-center`}
            onClick={() => setCurrentTab(idx)}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Tab Content */}
      {/* {currentTab === 0 && (
        <Link to="/healthcare" className="w-full flex flex-col">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-2xl p-4 sm:p-6 flex flex-col col-span-1 md:col-span-1 bg-cover h-[200px] sm:h-[400px] md:h-[550px] hover:shadow-[0_10px_45px_rgba(0,0,0,0.2)] transition-all duration-200" style={{ backgroundImage: `url(${healthcareCards[0].img})` }}>
              <div className="w-full flex flex-col items-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold my-2 sm:my-4 text-[#006294]">{healthcareCards[0].title}</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className={`rounded-2xl p-4 sm:p-6 flex items-center bg-cover h-30 md:h-[50%] hover:shadow-[0_10px_45px_rgba(0,0,0,0.2)] transition-all duration-200`} style={{ backgroundImage: `url(${healthcareCards[1].img})` }}>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#8E0000] ml-2 sm:ml-4 md:ml-7">{healthcareCards[1].title}</div>
              </div>
              <div className={`rounded-2xl p-4 sm:p-6 flex items-center bg-cover h-30 md:h-[50%] hover:shadow-[0_10px_45px_rgba(0,0,0,0.2)] transition-all duration-200`} style={{ backgroundImage: `url(${healthcareCards[2].img})` }}>
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#966C00] ml-2 sm:ml-4 md:ml-7">{healthcareCards[2].title}</div>
              </div>
            </div>
          </div>
        </Link>
      )} */}
      {currentTab === 0 && (
        <div className="w-full flex flex-col">
          <div className={`flex flex-col md:justify-center ${isMobile ? "items-start" : "items-end"} gap-2 bg-cover h-[250px] sm:h-[250px] md:h-[300px] w-full p-4 sm:p-6 md:p-8 rounded-t-2xl`} style={{ backgroundImage: `url(${petproducts})` }}>
            <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-semibold primary-color">Best <span className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl">ESSENTIALS</span> For Your Pet</div>
            <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-extrabold primary-color mb-2">IN 59 MINS</div>
            <Link to="/products"><button className="bg-[#1D3557] text-white px-4 sm:px-6 md:px-8 py-2 rounded-lg font-semibold shadow transition w-fit cursor-pointer text-sm sm:text-base">Buy Now</button></Link>
          </div>
          <div className="rounded-b-3xl bg-[#fff7e6] p-4 sm:p-8 md:p-12 lg:p-20 flex flex-col items-center w-full">
            <div className="w-full">
              <Slider {...settings}>
                {brands.map((brand, idx) => (
                  <Link to="/products" key={idx} className="flex justify-center items-center group py-4">
                    <div className="relative inline-block">
                      <img
                        src={brand.img}
                        alt={brand.alt}
                        className="h-12 sm:h-16 md:h-20 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
                        style={{ maxWidth: "120px" }}
                      />
                      <div className="absolute -top-3 -right-6 bg-[#FF5757] text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full shadow-md whitespace-nowrap">
                        {brand.discount} Off
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
            <Link to="/catalogue" className="mt-8 sm:mt-12 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3.5 rounded-full font-bold shadow-lg transition-transform hover:scale-105">
              View Full Catalogue
            </Link>
          </div>
        </div>
      )}
      {/* {currentTab === 2 && (
        <Link to="/healthcare" className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {groomingCards.map((card, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl shadow-lg bg-cover bg-center h-[230px] sm:h-[400px] md:h-[500px] flex items-end overflow-hidden"
              style={{ backgroundImage: `url(${card.img})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="relative z-20 w-full text-center pb-4 sm:pb-6">
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-b from-[#ffffff66] to-[#ffffff] inline-block text-transparent bg-clip-text">{card.title}</span>
              </div>
            </div>
          ))}
        </Link>
      )} */}
    </div>
  );
} 