import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

import logo from '../assets/logo.png';
import cataloguePdf from '../assets/Petric_Catalogue.pdf';

export default function HelloFooter() {
  return (
    <footer className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-black px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          {/* Logo & Address */}
          <div className="flex flex-col items-center text-center gap-3 col-span-1">
            <img src={logo} alt="Petric Logo" className="h-20 sm:h-28 object-contain" />
            <div className="text-sm sm:text-base w-full sm:w-[80%] leading-relaxed text-[#3D3D3D]">Petric: U-26/7, DLF Phase 3, Sector 24, Gurugram, Haryana 122002</div>
            <div className="flex gap-3 sm:gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61574867466246&mibextid=rS40aB7S9Ucbxw6v" aria-label="Facebook" className=" text-white bg-[#1D3557] rounded-full p-2"><FaFacebookF size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
              <a href="https://www.instagram.com/petric.in/" aria-label="Twitter" className=" text-white bg-[#1D3557] rounded-full p-2"><RiInstagramFill size={16} className="sm:w-[18px] sm:h-[18px]" fill='white' /></a>
              <a href="http://www.linkedin.com/in/petric-india-b4525935a" aria-label="YouTube" className=" text-white bg-[#1D3557] rounded-full p-2"><FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
              <a href="http://wa.me/918295756962" aria-label="Instagram" className=" text-white bg-[#1D3557] rounded-full p-2"><IoLogoWhatsapp size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
            </div>
          </div>
          {/* Quick links */}
          <div className="flex flex-col items-start text-left">
            <div className="mb-3 text-base sm:text-lg font-bold">Quick links</div>
            <ul className="text-xs sm:text-sm flex flex-col items-start gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/story" className="hover:underline">Our Story</Link></li>
              <li><Link to="/all-brands" className="hover:underline">All Brands</Link></li>
              <li><Link to="/all-categories" className="hover:underline">All Categories</Link></li>
              <li className="pt-4">
                <button
                  onClick={() => window.open(cataloguePdf, '_blank')}
                  className="bg-[#FFD000] text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#F0C300] hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-[#E6BB00] flex items-center gap-2"
                >
                  Download Brochure ↓
                </button>
              </li>
            </ul>
          </div>
          {/* Policies */}
          <div className="flex flex-col items-start text-left">
            <div className="mb-3 text-base sm:text-lg font-bold">Policies</div>
            <ul className="text-xs sm:text-sm flex flex-col gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/shipping-and-delivery" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link to="/refund-cancellation" className="hover:underline">Refunds & Cancellations</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>
          {/* Popular Searches */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 flex flex-col items-start text-left">
            <div className="mb-3 text-base sm:text-lg font-bold">Popular Searches Near You</div>
            <ul className="text-xs sm:text-sm flex flex-col gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/category/688bb653d965e37b6406d2f0" className="hover:underline">Dog Food Near Me</Link></li>
              <li><Link to="/category/689dd0df62fd763e5a773308" className="hover:underline">Pet Emergency Medicines</Link></li>
              <li><Link to="/category/688bb661d965e37b6406d2f5?subCategory=688bcaedd965e37b6406da6f" className="hover:underline">Cat Wet Food Near Me</Link></li>
              <li><Link to="/category/688bb67cd965e37b6406d2fe" className="hover:underline">Treats for Dog and Cats</Link></li>
              <li><Link to="/all-categories" className="hover:underline">Instant Pet Food Delivery</Link></li>
              <li><Link to="/category/69e8021dbfdbb023ad876b89" className="hover:underline">Pet Toys Near Me</Link></li>
              <li><Link to="/category/688bb8d2d965e37b6406d3af" className="hover:underline">Vet Prescribed Pet Food</Link></li>
              <li><Link to="/category/69e7dd7bbfdbb023ad83b8bb" className="hover:underline">Unscented Cat Litters</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
