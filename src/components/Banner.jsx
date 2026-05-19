import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner1 from '../assets/banner/banner1.jpg';
import Banner2 from '../assets/banner/banner2.jpg';
import Banner3 from '../assets/banner/banner3.jpg';
import Banner4 from '../assets/banner/banner4.jpg';
import Banner1Mobile from '../assets/banner/banner1-mobile.jpg';
import Banner2Mobile from '../assets/banner/banner2-mobile.jpg';
import Banner3Mobile from '../assets/banner/banner3-mobile.jpg';
import Banner4Mobile from '../assets/banner/banner4-mobile.jpg';
import playstore from '../assets/playstore.png'; // Add your playstore image
import appstore from '../assets/appstore.png';   // Add your appstore image

// Hook to detect mobile screen
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 480);
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 480);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  centerMode: true,
  centerPadding: '12%',
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 1, centerMode: true, centerPadding: '10%' } },
    { breakpoint: 768, settings: { slidesToShow: 1, centerMode: true, centerPadding: '6%' } },
    { breakpoint: 480, settings: { slidesToShow: 1, centerMode: true, centerPadding: '0px' } },
  ],
};

const offers = [
  { image: Banner1, mobileImage: Banner1Mobile },
  { image: Banner2, mobileImage: Banner2Mobile },
  { image: Banner3, mobileImage: Banner3Mobile },
  { image: Banner4, mobileImage: Banner4Mobile },
];

export default function OffersBanner() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pb-10 sm:pb-16 md:pb-20 flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-20">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl balsamiq-sans-bold primary-color mb-6 sm:mb-8 md:mb-10 text-center">
       Best offers just for you
      </h2>
      <div className="w-full mx-auto">
        <Slider {...settings}>
          {offers.map((offer, idx) => (
            <div key={idx} className="relative rounded-2xl overflow-hidden h-40 sm:h-40 md:h-42 lg:h-64 flex items-end cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <img
                src={isMobile ? offer.mobileImage : offer.image}
                alt="Offer Banner"
                className="w-full h-40 sm:h-40 md:h-42 lg:h-64 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Dialog Box */}
      
      {/* Custom styling for slider spacing */}
      <style>{`
        .slick-slide > div {
          margin: 0 5px;
        }
        @media (min-width: 768px) {
          .slick-slide > div {
            margin-right: 20px;
          }
        }
      `}</style>
    </div>
  );
}
