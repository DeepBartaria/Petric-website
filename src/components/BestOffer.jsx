import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import bottom_banner1 from '../assets/bottom_banner1.webp';
import bottom_banner2 from '../assets/bottom_banner2.webp';
import bottom_banner3 from '../assets/bottom_banner3.webp';
import bottom_banner4 from '../assets/bottom_banner4.webp';
import { trackCleverTapEvent } from '../helper/clevertap';

const images = [
  bottom_banner1,
  bottom_banner2,
  bottom_banner3,
  bottom_banner4,
  bottom_banner1,
  bottom_banner2,
  bottom_banner3,
  bottom_banner4
];

export default function BestOffer() {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "20%",
    slidesToShow: 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "15%",
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: "10%",
          slidesToShow: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "8%",
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="w-full relative bg-gradient-to-br from-[#FFFDF5] via-[#FFF9E6] to-[#FFF5D1] py-14 md:py-20 overflow-hidden">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-0 left-[-10%] w-64 h-64 bg-[#FFD000] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 bg-[#FF8A65] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full mx-auto relative z-10">
        <div className="flex flex-col items-center mb-10 md:mb-12">
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl balsamiq-sans-bold primary-color text-center px-4 drop-shadow-sm">
            Best offers just for you
          </h2>
        </div>
        
        <div className="w-full mx-auto pb-12">
          <Slider {...settings} className="best-offer-slider">
            {images.map((img, index) => (
              <div key={index} className="px-2 md:px-3 focus:outline-none">
                <div
                  className="slider-item-inner relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] cursor-pointer"
                  onClick={() => trackCleverTapEvent('Banner Clicked', {
                    'Banner Name': `Best Offer ${index + 1}`,
                    Position: index + 1,
                    Source: 'Best Offer Carousel',
                  })}
                >
                  <img
                    src={img}
                    alt={`Offer ${index + 1}`}
                    className="w-full h-auto max-h-[50vh] object-cover"
                  />
                  {/* Subtle inner overlay for inactive state effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 overlay-effect transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
      <style>{`
        .best-offer-slider .slick-list {
          padding-bottom: 30px !important;
          padding-top: 10px !important;
        }
        
        /* Non-center active slide styles */
        .best-offer-slider .slider-item-inner {
          transform: scale(0.88);
          opacity: 0.65;
          transition: all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: grayscale(15%);
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        
        .best-offer-slider .slider-item-inner .overlay-effect {
          opacity: 1;
        }
        
        /* Center active slide styles */
        .best-offer-slider .slick-center .slider-item-inner {
          transform: scale(1);
          opacity: 1;
          filter: grayscale(0%);
          box-shadow: 0 20px 40px rgba(255, 208, 0, 0.15), 0 10px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        
        .best-offer-slider .slick-center .slider-item-inner .overlay-effect {
          opacity: 0;
        }

        /* Modern Pill Dots */
        .best-offer-slider .slick-dots {
          bottom: -20px;
          display: flex !important;
          justify-content: center;
          align-items: center;
          gap: 6px;
        }
        .best-offer-slider .slick-dots li {
          margin: 0;
          width: auto;
          height: auto;
        }
        .best-offer-slider .slick-dots li button {
          width: 8px;
          height: 8px;
          border-radius: 99px;
          background-color: #d1d5db;
          padding: 0;
          transition: all 300ms ease;
        }
        .best-offer-slider .slick-dots li button:before {
          display: none; /* Hide default icon */
        }
        .best-offer-slider .slick-dots li.slick-active button {
          width: 24px;
          background-color: #FFD000;
          box-shadow: 0 0 8px rgba(255, 208, 0, 0.6);
        }
      `}</style>
    </div>
  );
}
