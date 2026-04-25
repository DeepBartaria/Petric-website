import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Dog from '../assets/dog.png';
import quote from '../assets/quote.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllTestimonials } from '../helper/testimonialApi';

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   arrows: false,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   centerMode: true,
//   centerPadding: '0px',
//   responsive: [
//     {
//       breakpoint: 1024,
//       settings: {
//         slidesToShow: 2,
//         centerMode: true,
//       },
//     },
//     {
//       breakpoint: 768,
//       settings: {
//         slidesToShow: 1,
//         centerMode: true,
//         centerPadding: '20px',
//       },
//     },
//     {
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         centerMode: false,
//       },
//     },
//   ],
// };

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      const res = await getAllTestimonials({});
      setTestimonials(res?.testimonials || []);
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  return (
    <div className="w-full bg-[#fff2b8] pb-12 py-8 sm:py-12 md:py-16 flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl balsamiq-sans-bold primary-color mb-6 sm:mb-8 md:mb-10 text-center px-4">Our Happy Pet Parent</h2>
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 mx-auto">
        {loading ? (
          <div className="text-center py-10">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-10">No testimonials found.</div>
        ) : (
          // <Slider {...settings}>
          //   {testimonials.map((t, idx) => (
          //     <div key={idx} className="px-1 sm:px-2">
          //       <div className="testimonial-card h-full">
          //         <div className="flex justify-between items-start w-full">
          //           <div className="flex items-center gap-2 sm:gap-3">
          //             <img src={t.image || Dog} alt={t.userName} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
          //             <div>
          //               <div className="font-bold text-[#222] text-sm sm:text-base">{t.userName}</div>
          //               <div className="text-xs text-[#F9A826] font-semibold">{t.petName}</div>
          //               <div className="flex gap-1 mt-1">
          //                 {[...Array(t.rating || 0)].map((_, i) => (
          //                   <span key={i} className="text-yellow-400 text-sm sm:text-lg">★</span>
          //                 ))}
          //               </div>
          //             </div>
          //           </div>
          //           <img src={quote} alt="quote" className="w-6 h-6 sm:w-8 sm:h-8 mt-1" />
          //         </div>
          //         <div className="text-[#222] font-normal text-sm sm:text-base mt-3 sm:mt-4">
          //           {t.review}
          //         </div>
          //       </div>
          //     </div>
          //   ))}
          // </Slider>
          <Slider {...settings}>
            {testimonials.map((t, idx) => (
              <div key={idx} className="px-1 sm:px-2">
                <div className="h-full flex justify-center items-center">
                  <img
                    src={t.image || Dog}
                    alt="testimonial"
                    className="rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <style>{`
        .testimonial-card {
          border-radius: 20px;
          background: #fff7e6 !important;
          padding: 20px !important;
          min-height: 280px !important;
          transition: all 0.3s;
          opacity: 0.6;
        }
        .slick-center .testimonial-card {
          background: #fff !important;
          transform: scale(1);
          opacity: 1;
          z-index: 10;
        }
        .slick-slide {
          display: flex;
          align-items: stretch;
          height: 100%;
        }
        @media (max-width: 640px) {
          .testimonial-card {
            background: #fff !important;
            opacity: 1;
          }
        }
        @media (min-width: 640px) {
          .testimonial-card {
            padding: 24px !important;
            min-height: 320px !important;
          }
        }
        @media (min-width: 768px) {
          .testimonial-card {
            padding: 32px !important;
            min-height: 350px !important;
          }
        }
      `}</style>
    </div>
  );
} 