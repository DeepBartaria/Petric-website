import React from 'react';
import { Link } from 'react-router-dom';

import { useDialog } from '../context/DialogContext';

import { FaFacebookF, FaLinkedin, FaDog, FaCat } from 'react-icons/fa';
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiMessageCircle, FiHelpCircle, FiArrowRight } from 'react-icons/fi';
import { BsChatHeartFill } from 'react-icons/bs';
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
import dogPhoneMockup from '../assets/dogphone.png';

export default function Footer() {
  const { showDialog } = useDialog();
  const location = useLocation();
  return (
    <footer className="w-full">
      {/* Top Section: App Promo */}
      {location.pathname !== "/" && location.pathname !== "/all-categories" && !location.pathname.startsWith("/category/") && !location.pathname.startsWith("/product/") && (
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
      {/* App Promo Image Section */}
      <div className="w-full bg-gray-50 p-6 sm:p-8 md:p-10 relative overflow-hidden group">
        
        {/* Animated Dog and Cat Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 select-none">
          <style>
            {`
              @keyframes chaseAcross {
                0% { left: -200px; transform: scaleX(1); }
                49.9% { left: 110%; transform: scaleX(1); }
                50% { left: 110%; transform: scaleX(-1); }
                99.9% { left: -200px; transform: scaleX(-1); }
                100% { left: -200px; transform: scaleX(1); }
              }
              @keyframes runLeg {
                0%, 100% { transform: rotate(-35deg); }
                50% { transform: rotate(35deg); }
              }
              @keyframes wag {
                0%, 100% { transform: rotate(-10deg); }
                50% { transform: rotate(15deg); }
              }
              @keyframes bounceBody {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-3px); }
              }
            `}
          </style>
          
          <div 
            className="absolute top-[10%] flex items-end gap-2 drop-shadow-xl"
            style={{ animation: 'chaseAcross 14s linear infinite' }}
          >
            {/* Running Dog Cartoon SVG */}
            <svg viewBox="0 0 100 60" className="w-24 h-16 sm:w-32 sm:h-20" xmlns="http://www.w3.org/2000/svg">
              <line x1="35" y1="35" x2="35" y2="50" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '35px 35px', animation: 'runLeg 0.3s infinite linear' }} />
              <line x1="65" y1="35" x2="65" y2="50" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '65px 35px', animation: 'runLeg 0.3s infinite linear -0.15s' }} />
              <g style={{ animation: 'bounceBody 0.3s infinite linear' }}>
                <path d="M 25 25 Q 15 15 15 25" stroke="#D2691E" strokeWidth="5" strokeLinecap="round" fill="none" style={{ transformOrigin: '25px 25px', animation: 'wag 0.15s infinite linear' }} />
                <rect x="25" y="20" width="45" height="20" rx="10" fill="#D2691E" />
                <circle cx="75" cy="20" r="12" fill="#D2691E" />
                <path d="M 75 15 Q 90 15 90 22 Q 90 27 75 27" fill="#D2691E" />
                <circle cx="88" cy="18" r="2" fill="black" />
                <circle cx="76" cy="17" r="1.5" fill="black" />
                <path d="M 70 12 Q 60 5 62 18" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" fill="#D2691E" />
              </g>
              <line x1="40" y1="35" x2="40" y2="50" stroke="#D2691E" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '40px 35px', animation: 'runLeg 0.3s infinite linear -0.15s' }} />
              <line x1="70" y1="35" x2="70" y2="50" stroke="#D2691E" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '70px 35px', animation: 'runLeg 0.3s infinite linear' }} />
            </svg>

            {/* Running Cat Cartoon SVG */}
            <svg viewBox="0 0 100 60" className="w-20 h-12 sm:w-24 sm:h-16" xmlns="http://www.w3.org/2000/svg">
              <line x1="35" y1="35" x2="35" y2="50" stroke="#D2691E" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '35px 35px', animation: 'runLeg 0.25s infinite linear' }} />
              <line x1="65" y1="35" x2="65" y2="50" stroke="#D2691E" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '65px 35px', animation: 'runLeg 0.25s infinite linear -0.125s' }} />
              <g style={{ animation: 'bounceBody 0.25s infinite linear' }}>
                <path d="M 30 25 Q 10 10 20 5" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" fill="none" style={{ transformOrigin: '30px 25px', animation: 'wag 0.25s infinite linear' }} />
                <rect x="30" y="22" width="35" height="15" rx="7.5" fill="#FFA500" />
                <circle cx="70" cy="20" r="10" fill="#FFA500" />
                <circle cx="76" cy="22" r="3" fill="#FFA500" />
                <circle cx="78" cy="21" r="1" fill="black" />
                <circle cx="72" cy="18" r="1" fill="black" />
                <path d="M 64 12 L 66 4 L 70 12 Z" fill="#FFA500" />
                <path d="M 70 12 L 74 4 L 76 12 Z" fill="#D2691E" />
              </g>
              <line x1="40" y1="35" x2="40" y2="50" stroke="#FFA500" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '40px 35px', animation: 'runLeg 0.25s infinite linear -0.125s' }} />
              <line x1="70" y1="35" x2="70" y2="50" stroke="#FFA500" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '70px 35px', animation: 'runLeg 0.25s infinite linear' }} />
            </svg>
          </div>

          <div 
            className="absolute top-[70%] flex items-end gap-2 drop-shadow-md opacity-60 filter blur-[1px]"
            style={{ animation: 'chaseAcross 20s linear infinite 7s' }}
          >
            {/* Running Cat Cartoon SVG (Faded Background) */}
            <svg viewBox="0 0 100 60" className="w-16 h-10 sm:w-20 sm:h-12" xmlns="http://www.w3.org/2000/svg">
              <line x1="35" y1="35" x2="35" y2="50" stroke="#D2691E" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '35px 35px', animation: 'runLeg 0.25s infinite linear' }} />
              <line x1="65" y1="35" x2="65" y2="50" stroke="#D2691E" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '65px 35px', animation: 'runLeg 0.25s infinite linear -0.125s' }} />
              <g style={{ animation: 'bounceBody 0.25s infinite linear' }}>
                <path d="M 30 25 Q 10 10 20 5" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" fill="none" style={{ transformOrigin: '30px 25px', animation: 'wag 0.25s infinite linear' }} />
                <rect x="30" y="22" width="35" height="15" rx="7.5" fill="#FFA500" />
                <circle cx="70" cy="20" r="10" fill="#FFA500" />
                <circle cx="76" cy="22" r="3" fill="#FFA500" />
                <circle cx="78" cy="21" r="1" fill="black" />
                <circle cx="72" cy="18" r="1" fill="black" />
                <path d="M 64 12 L 66 4 L 70 12 Z" fill="#FFA500" />
                <path d="M 70 12 L 74 4 L 76 12 Z" fill="#D2691E" />
              </g>
              <line x1="40" y1="35" x2="40" y2="50" stroke="#FFA500" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '40px 35px', animation: 'runLeg 0.25s infinite linear -0.125s' }} />
              <line x1="70" y1="35" x2="70" y2="50" stroke="#FFA500" strokeWidth="5" strokeLinecap="round" style={{ transformOrigin: '70px 35px', animation: 'runLeg 0.25s infinite linear' }} />
            </svg>
            
            {/* Running Dog Cartoon SVG (Faded Background) */}
            <svg viewBox="0 0 100 60" className="w-20 h-14 sm:w-28 sm:h-16" xmlns="http://www.w3.org/2000/svg">
              <line x1="35" y1="35" x2="35" y2="50" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '35px 35px', animation: 'runLeg 0.3s infinite linear' }} />
              <line x1="65" y1="35" x2="65" y2="50" stroke="#8B4513" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '65px 35px', animation: 'runLeg 0.3s infinite linear -0.15s' }} />
              <g style={{ animation: 'bounceBody 0.3s infinite linear' }}>
                <path d="M 25 25 Q 15 15 15 25" stroke="#D2691E" strokeWidth="5" strokeLinecap="round" fill="none" style={{ transformOrigin: '25px 25px', animation: 'wag 0.15s infinite linear' }} />
                <rect x="25" y="20" width="45" height="20" rx="10" fill="#D2691E" />
                <circle cx="75" cy="20" r="12" fill="#D2691E" />
                <path d="M 75 15 Q 90 15 90 22 Q 90 27 75 27" fill="#D2691E" />
                <circle cx="88" cy="18" r="2" fill="black" />
                <circle cx="76" cy="17" r="1.5" fill="black" />
                <path d="M 70 12 Q 60 5 62 18" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" fill="#D2691E" />
              </g>
              <line x1="40" y1="35" x2="40" y2="50" stroke="#D2691E" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '40px 35px', animation: 'runLeg 0.3s infinite linear -0.15s' }} />
              <line x1="70" y1="35" x2="70" y2="50" stroke="#D2691E" strokeWidth="6" strokeLinecap="round" style={{ transformOrigin: '70px 35px', animation: 'runLeg 0.3s infinite linear' }} />
            </svg>
          </div>
        </div>

        <a href="https://petric.in/download/" target="_blank" rel="noopener noreferrer" className="hidden md:block w-full max-w-6xl mx-auto relative z-10 transition-transform duration-500 hover:scale-[1.02]">
          <img src={laptop_hi} alt="Download App" className="w-full shadow-xl rounded-3xl" />
        </a>
        <a href="https://petric.in/download/" target="_blank" rel="noopener noreferrer" className="md:hidden block w-full relative z-10">
          <img src={hi} alt="Download App" className="w-full shadow-xl rounded-3xl" />
        </a>
      </div>

      {/* Have Questions Section */}
      <div className="w-full bg-[#FCFBF4] py-16 px-4 sm:px-12 lg:px-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative">
          
          {/* Left Column (Text & Buttons) */}
          <div className="flex-1 z-10 w-full mb-12 md:mb-0">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FCEF94] mb-5">
              <span className="text-[#5D4037] text-sm md:text-base font-bold">We are here for you</span>
            </div>
            
            <div className="w-16 h-0.5 bg-red-500 mb-6"></div>
            
            <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-[#3b2d28] mb-4 leading-tight tracking-tight font-serif">
              Have Question?
            </h2>
            
            <p className="hidden md:block text-[#5D4037] text-lg md:text-xl mb-10 max-w-sm leading-snug">
              Real support for Orders,<br/>
              Pet care & Products.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/faqs">
                <button className="bg-[#FFD700] hover:bg-[#F6C300] text-black font-bold py-3.5 px-8 rounded-full shadow-sm hover:shadow-md transition-all">
                  Explore FAQ
                </button>
              </Link>
              <Link to="/about/#contact">
                <button className="bg-[#FFD700] hover:bg-[#F6C300] text-black font-bold py-3.5 px-8 rounded-full shadow-sm hover:shadow-md transition-all">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          
          {/* Right Column (Image & Backgrounds) */}
          <div className="flex-1 relative w-full flex justify-center md:justify-end min-h-[350px] md:min-h-[450px]">
            {/* Background yellow circle */}
            <div className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#FDE047] rounded-full z-0"></div>
            
            {/* Dotted Patterns */}
            <div className="absolute top-0 right-10 z-0 opacity-40">
              <svg width="120" height="60" viewBox="0 0 120 60">
                <pattern id="dotsTop" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                  <circle fill="#000" cx="2" cy="2" r="1.5"></circle>
                </pattern>
                <rect x="0" y="0" width="120" height="60" fill="url(#dotsTop)"></rect>
              </svg>
            </div>
            <div className="absolute bottom-0 left-10 md:left-20 z-0 opacity-40">
              <svg width="80" height="120" viewBox="0 0 80 120">
                <pattern id="dotsBottom" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                  <circle fill="#000" cx="2" cy="2" r="1.5"></circle>
                </pattern>
                <rect x="0" y="0" width="80" height="120" fill="url(#dotsBottom)"></rect>
              </svg>
            </div>
            
            {/* Dog and Phone Image */}
            <img 
              src={dogPhoneMockup} 
              alt="Dog waving behind phone" 
              className="relative z-10 w-[350px] sm:w-[450px] md:w-[550px] lg:w-[650px] object-contain transform translate-y-4 md:-translate-y-4" 
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-black px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          {/* Logo & Address */}

          <div className="flex flex-col items-start gap-3 col-span-1">
            <img src={logo} alt="Petric Logo" className="h-20 sm:h-28 object-contain" />
            <div className="text-sm sm:text-base w-full sm:w-[80%] leading-relaxed text-[#3D3D3D]">Petric: U-26/7, DLF Phase 3, Sector 24, Gurugram, Haryana 122002</div>
            <div className="flex gap-3 sm:gap-4 mt-2">
              <a href="https://www.facebook.com/profile.php?id=61574867466246&mibextid=rS40aB7S9Ucbxw6v" aria-label="Facebook" className=" text-white bg-black rounded-full p-2"><FaFacebookF size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
              <a href="https://www.instagram.com/petric.in/" aria-label="Twitter" className=" text-white bg-black rounded-full p-2"><RiInstagramFill size={16} className="sm:w-[18px] sm:h-[18px]" fill='white' /></a>
              <a href="http://www.linkedin.com/in/petric-india-b4525935a" aria-label="YouTube" className=" text-white bg-black rounded-full p-2"><FaLinkedin size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
              <a href="http://wa.me/918295756962" aria-label="Instagram" className=" text-white bg-black rounded-full p-2"><IoLogoWhatsapp size={16} className="sm:w-[18px] sm:h-[18px]" /></a>
            </div>
          </div>
          {/* Quick links */}
          <div>
            <div className="mb-3 text-base sm:text-lg">Quick links</div>
            <ul className="text-xs sm:text-sm flex flex-col gap-2 mt-4 sm:mt-7 text-[#3D3D3D]">
              <li><Link to="/story" className="hover:underline">Our Story</Link></li>
              <li><Link to="/all-brands" className="hover:underline">All Brands</Link></li>
              <li><Link to="/all-categories" className="hover:underline">All Categories</Link></li>
              <li className="pt-5">
                <button
                  onClick={() => window.open(cataloguePdf, '_blank')}
                  className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-md w-fit"
                >
                  Download Brochure
                </button>
              </li>
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
              <li><Link to="/category/dog-food" className="hover:underline">Dog Food Near Me</Link></li>
              <li><Link to="/category/pharmacy" className="hover:underline">Pet Emergency Medicines</Link></li>
              <li><Link to="/category/cat-food?subCategory=wet-food" className="hover:underline">Cat Wet Food Near Me</Link></li>
              <li><Link to="/category/treats" className="hover:underline">Treats for Dog and Cats</Link></li>
              <li><Link to="/all-categories" className="hover:underline">Instant Pet Food Delivery</Link></li>
              <li><Link to="/category/toys" className="hover:underline">Pet Toys Near Me</Link></li>
              <li><Link to="/category/vet-prescribed-pet-food" className="hover:underline">Vet Prescribed Pet Food</Link></li>
              <li><Link to="/category/cat-litter" className="hover:underline">Unscented Cat Litters</Link></li>
            </ul>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full border-t border-dashed border-gray-300 my-2"></div>
        {/* Copyright */}
        <div className="text-center text-sm sm:text-lg primary-color font-medium py-3 sm:py-4 px-4">
          © Copyright 2026 Petric. All rights Reserved.
        </div>
      </div>
    </footer>
  );
} 