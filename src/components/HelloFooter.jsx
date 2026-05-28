import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

import logo from '../assets/logo.png';
import cataloguePdf from '../assets/Petric_Catalogue.pdf';

export default function HelloFooter() {
  return (
    <footer className="w-full pl-6 pr-4 sm:px-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-black sm:px-6 md:px-8 py-6 sm:py-8">
          {/* Logo & Address */}
          <div className="flex flex-col items-start text-left gap-4 col-span-1">
            <img src={logo} alt="Petric Logo" className="h-14 sm:h-20 object-contain" />
            <div className="text-base sm:text-lg w-full sm:w-[90%] leading-relaxed text-[#3D3D3D] font-semibold">Petric: U-26/7, DLF Phase 3, Sector 24, Gurugram, Haryana 122002</div>
            <div className="flex gap-3 sm:gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61574867466246&mibextid=rS40aB7S9Ucbxw6v" aria-label="Facebook" className=" text-white bg-[#1D3557] rounded-full p-2.5"><FaFacebookF size={18} className="sm:w-[20px] sm:h-[20px]" /></a>
              <a href="https://www.instagram.com/petric.in/" aria-label="Instagram" className=" text-white bg-[#1D3557] rounded-full p-2.5"><RiInstagramFill size={18} className="sm:w-[20px] sm:h-[20px]" fill='white' /></a>
              <a href="http://www.linkedin.com/in/petric-india-b4525935a" aria-label="LinkedIn" className=" text-white bg-[#1D3557] rounded-full p-2.5"><FaLinkedin size={18} className="sm:w-[20px] sm:h-[20px]" /></a>
              <a href="http://wa.me/918295756962" aria-label="WhatsApp" className=" text-white bg-[#1D3557] rounded-full p-2.5"><IoLogoWhatsapp size={18} className="sm:w-[20px] sm:h-[20px]" /></a>
            </div>
          </div>
          {/* Quick links */}
          <div className="flex flex-col items-start text-left md:mx-auto">
            <div className="mb-1 text-lg sm:text-xl font-bold text-black">Quick links</div>
            <ul className="text-sm sm:text-base flex flex-col items-start gap-3 mt-3 sm:mt-5 text-[#3D3D3D] font-semibold">
              <li><Link to="/story" className="hover:underline">Our Story</Link></li>
              <li><Link to="/all-brands" className="hover:underline">All Brands</Link></li>
              <li><Link to="/all-categories" className="hover:underline">All Categories</Link></li>
              <li className="pt-3">
                <button
                  onClick={() => window.open(cataloguePdf, '_blank')}
                  className="bg-black text-white px-7 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-all duration-300 shadow-md w-fit"
                >
                  Download Brochure
                </button>
              </li>
            </ul>
          </div>
          {/* Policies */}
          <div className="flex flex-col items-start text-left md:mx-auto">
            <div className="mb-1 text-lg sm:text-xl font-bold text-black">Policies</div>
            <ul className="text-sm sm:text-base flex flex-col gap-3 mt-3 sm:mt-5 text-[#3D3D3D] font-semibold">
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/shipping-and-delivery" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link to="/refund-cancellation" className="hover:underline">Refunds & Cancellations</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}
