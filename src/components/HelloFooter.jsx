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
import hi from '../assets/popup_phone.webp';
import laptop_hi from '../assets/popup_web1.webp';
import cataloguePdf from '../assets/Petric_Catalogue.pdf';

export default function HelloFooter() {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-black px-6 sm:px-12 md:px-16 lg:px-20 py-8">
          {/* Logo & Address */}

          <div className="flex flex-col items-start gap-2 col-span-1 pl-4 sm:pl-0">
            <img src={logo} alt="Petric Logo" className="h-16 sm:h-20 object-contain" />
            <div className="text-sm font-semibold w-full sm:w-[80%] leading-relaxed text-[#111]">Petric: U-26/7, DLF Phase 3, Sector 24, Gurugram, Haryana 122002</div>
            <div className="flex gap-3 mt-1">
              <a href="https://www.facebook.com/profile.php?id=61574867466246&mibextid=rS40aB7S9Ucbxw6v" aria-label="Facebook" className=" text-white bg-[#1D3557] rounded-full p-2"><FaFacebookF size={14} /></a>
              <a href="https://www.instagram.com/petric.in/" aria-label="Twitter" className=" text-white bg-[#1D3557] rounded-full p-2"><RiInstagramFill size={14} fill='white' /></a>
              <a href="http://www.linkedin.com/in/petric-india-b4525935a" aria-label="YouTube" className=" text-white bg-[#1D3557] rounded-full p-2"><FaLinkedin size={14} /></a>
              <a href="http://wa.me/918295756962" aria-label="Instagram" className=" text-white bg-[#1D3557] rounded-full p-2"><IoLogoWhatsapp size={14} /></a>
            </div>
          </div>
          {/* Quick links */}
          <div className="pl-4 sm:pl-0">
            <div className="mb-2 text-lg font-bold text-black">Quick links</div>
            <ul className="text-sm font-semibold flex flex-col gap-2 mt-2 text-[#222]">
              <li><Link to="/story" className="hover:underline">Our Story</Link></li>
              <li><Link to="/all-brands" className="hover:underline">All Brands</Link></li>
              <li><Link to="/all-categories" className="hover:underline">All Categories</Link></li>
              <li className="pt-2">
                <button
                  onClick={() => window.open(cataloguePdf, '_blank')}
                  className="bg-black text-white px-7 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-md w-fit"
                >
                  Download Brochure
                </button>
              </li>
            </ul>
          </div>
          {/* Policies */}
          <div className="mt-1 sm:mt-0 pl-4 sm:pl-0">
            <div className="mb-2 text-lg font-bold text-black">Policies</div>
            <ul className="text-sm font-semibold flex flex-col gap-2 mt-2 text-[#222]">
              <li><Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/shipping-and-delivery" className="hover:underline">Shipping & Delivery</Link></li>
              <li><Link to="/refund-cancellation" className="hover:underline">Refunds & Cancellations</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>
          {/* Popular Searches */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1 mt-1 sm:mt-0 pl-4 sm:pl-0">
            <div className="mb-2 text-lg font-bold text-black">Popular Searches Near You</div>
            <ul className="text-sm font-semibold flex flex-col gap-2 mt-2 text-[#222]">
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
