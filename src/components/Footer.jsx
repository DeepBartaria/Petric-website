import React from 'react';
import { Link } from 'react-router-dom';

import { useDialog } from '../context/DialogContext';

import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { useLocation } from "react-router-dom";

import f1 from '../assets/f1.png';
import f2 from '../assets/f2.png';
import logo from '../assets/logo.png';
import appstore from '../assets/appstore.svg';
import playstore from '../assets/playstore.svg';
import mobiles from "../assets/mobiles.png";
import hi from '../assets/hi.png';
import laptop_hi from '../assets/laptop_hi.png';

export default function Footer() {
  const { showDialog } = useDialog();
  const location = useLocation();
  return (
    <footer className="w-full">
      {/* Top Section: App Promo */}
      {location.pathname !== "/" && (
        <div
          className="w-full flex flex-col md:flex-row items-center justify-between py-8 sm:py-12 bg-gradient-to-r from-[#1F395E] to-[#325B96] h-[280px] sm:h-[400px] px-4 sm:px-20"
        >
          <div className="flex-1 flex flex-col gap-4 text-white max-w-lg">
            <h2 className="text-2xl md:text-4xl outfit-bold">
              Petric -
              <br /> Pet Care In Minutes
            </h2>
            <p className="text-base md:text-2xl outfit-medium">
              Everything your pet needs
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={appstore} alt="iOS" className="h-12 sm:h-14" />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.petric.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={playstore} alt="Android" className="h-12 sm:h-14" />
              </a>
            </div>
          </div>
          <img src={mobiles} alt="Android" height={400} width={400} className="hidden md:block" />
        </div>
      )}
      {/* Middle Section: Links */}
      <div
        className="w-full bg-cover bg-no-repeat p-6 sm:p-8 md:p-10"
        style={{ backgroundImage: `url(${f2})` }}
      >
        <img src={laptop_hi} alt="Hi" className="hidden md:block w-full mb-6 sm:mb-8" />
        <img src={hi} alt="Hi" className="md:hidden w-full mb-6 sm:mb-8" />
        <div className="w-full flex justify-center px-4">
          <div className="w-full max-w-4xl rounded-[32px] bg-gradient-to-br from-[#FFD000] to-[#FFF1A6] border border-[#F5C400]/40 shadow-sm px-6 sm:px-10 py-8 sm:py-10 flex flex-col items-center text-center">
            
            {/* Heading */}
            <h3 className="text-2xl sm:text-4xl font-black text-[#1D3557] leading-tight">
              Have Questions? 
            </h3>
            {/* Subtext */}
            <p className="text-[#5F6C7B] text-sm sm:text-lg mt-3 max-w-2xl leading-relaxed">
              Get answers about orders, delivery, pet care, products,
              and everything Petric.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-7 w-full sm:w-auto">
              <Link to="/faqs">
                <button className="w-full sm:w-auto bg-[#1D3557] hover:bg-[#162944] text-white px-7 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.03] shadow-md">
                  Explore FAQs
                </button>
              </Link>
              <Link to="/about/#contact">
                <button className="w-full sm:w-auto bg-white hover:bg-[#FFFBEA] border border-[#F5C400]/50 text-[#1D3557] px-7 sm:px-8 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.03] shadow-sm">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-black px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          {/* Logo & Address */}

          <div className="flex flex-col items-start gap-3 col-span-1">
            <img src={logo} alt="Petric Logo" className="h-20 sm:h-24 object-contain" />
            <div className="text-sm sm:text-base w-full sm:w-[80%] leading-relaxed text-[#3D3D3D]">Petric: U-26/7, DLF Phase 3, Sector 24, Gurugram, Haryana 122002</div>
            <div className="flex gap-3 sm:gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61574867466246&mibextid=rS40aB7S9Ucbxw6v" aria-label="Facebook" className=" text-white bg-[#1D3557] rounded-full p-2"><FaFacebookF size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
              <a href="https://www.instagram.com/petric.in/" aria-label="Twitter" className=" text-white bg-[#1D3557] rounded-full p-2"><RiInstagramFill size={16} className="sm:w-[18px] sm:h-[18px]" fill='white' /></a>
              <a href="http://www.linkedin.com/in/petric-india-b4525935a" aria-label="YouTube" className=" text-white bg-[#1D3557] rounded-full p-2"><FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
              <a href="http://wa.me/918295756962" aria-label="Instagram" className=" text-white bg-[#1D3557] rounded-full p-2"><IoLogoWhatsapp size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
            </div>
          </div>
          {/* Quick links */}
          <div>
            <div className="mb-3 text-base sm:text-lg">Quick links</div>
            <ul className="text-xs sm:text-sm flex flex-col gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/story" className="hover:underline">Our Story</Link></li>
              <li><Link to="/products" className="hover:underline">Pet Products</Link></li>
              <li><Link to="/" className="hover:underline">Our Catalogue</Link></li>
            </ul>
          </div>
          {/* Policies */}
          <div>
            <div className="mb-3 text-base sm:text-lg">Policies</div>
            <ul className="text-xs sm:text-sm flex flex-col gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/shipping-and-delivery" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link to="/refund-cancellation" className="hover:underline">Refunds & Cancellations</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>
          {/* Popular Searches */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <div className="mb-3 text-base sm:text-lg">Popular Searches Near You</div>
            <ul className="text-xs sm:text-sm flex flex-col gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/products" className="hover:underline">Pet Pharmacy Near me</Link></li>
              <li><Link to="/healthcare" className="hover:underline">Vets Near Me</Link></li>
              <li><Link to="/healthcare" className="hover:underline">Pet Clinic Near Me</Link></li>
              <li><Link to="/products" className="hover:underline">Pet Food Near Me</Link></li>
              <li><Link to="/products" className="hover:underline">Pet Treats Near Me</Link></li>
              <li><Link to="/products" className="hover:underline">Pet Toys Near Me</Link></li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-dashed border-gray-300 my-2"></div>
        {/* Copyright */}
        <div className="text-center text-sm sm:text-lg primary-color font-medium py-3 sm:py-4 px-4">
          © Copyright 2025 Petric. All rights Reserved.
        </div>
      </div>
    </footer>
  );
} 