import { Link } from "react-router-dom";
import { BiStar } from "react-icons/bi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Header() {
  const discountItems = [
    { text: "15% Off On Pet Healthcare", icon: <BiStar className="h-4 w-4" /> },
    { text: "10% Off On Pet Essentials & Products", icon: <BiStar className="h-4 w-4" /> },
    { text: "15% Off On Pet Grooming Services", icon: <BiStar className="h-4 w-4" /> }
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <header className="w-full flex justify-center py-4 bg-white px-4 sm:px-8 lg:px-20">
      <div className="md:border-1 md:border-[#1D3557] rounded-lg w-full flex flex-col items-center md:p-2">
        {/* Top Banner */}
        <div className="bg-[#1D3557] w-full rounded-lg md:rounded-t-lg  py-2 px-4 overflow-hidden">
          <a
            href="https://rzp.io/rzp/petric-club"
            target="_BLANK"
            className="text-white text-lg sm:text-base font-medium whitespace-nowrap inline-block animate-marquee"
            style={{ minWidth: "100%" }}
          >
            Join <span className="font-bold">Petric Club</span> To Get Up To 15% Discounts At Just Rs. 1 / - <span className="font-bold">GRAB NOW!!</span> <span className="text-red-400">💥</span>
          </a>
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              animation: marquee 15s linear infinite;
            }
          `}</style>
        </div>

        {/* Desktop Discount Bar */}
        <div className="hidden md:flex w-full justify-between gap-2 mt-2">
          <a
            href="https://rzp.io/rzp/petric-club"
            target="_BLANK" className="bg-[#FFD233] flex-1 flex gap-2 items-center justify-center text-center px-2 py-2 rounded-bl-lg text-sm lg:text-base font-semibold border border-white">
            <BiStar className="h-4 w-4" /> 15% Off On Pet Healthcare
          </a>
          <a
            href="https://rzp.io/rzp/petric-club"
            target="_BLANK" className="bg-[#FFD233] flex-1 flex gap-2 items-center justify-center text-center px-2 py-2 text-sm lg:text-base font-semibold border border-white">
            <BiStar className="h-4 w-4" />10% Off On Pet Essentials & Products
          </a>
          <a
            href="https://rzp.io/rzp/petric-club"
            target="_BLANK" className="bg-[#FFD233] flex-1 flex gap-2 items-center justify-center text-center px-2 py-2 rounded-br-lg text-sm lg:text-base font-semibold border border-white">
            <BiStar className="h-4 w-4" />15% Off On Pet Grooming Services
          </a>
        </div>

        {/* Mobile Discount Carousel */}
        <div className="md:hidden w-full mt-2">
          <Slider {...sliderSettings}>
            {discountItems.map((item, index) => (
              <div key={index}>
                <div className="bg-[#FFD233] flex gap-2 items-center justify-center text-center px-4 py-3 rounded-lg text-sm font-semibold border border-white">
                  {item.icon} {item.text}
                </div>
              </div>
            ))}
          </Slider>
        </div>

      </div>
    </header>
  );
} 