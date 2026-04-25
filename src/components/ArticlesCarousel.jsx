import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaCalendarAlt, FaRegComments, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../helper/blogApi';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className="!flex !items-center !justify-center !bg-white !rounded-full !shadow !w-10 !h-10 !z-20 hover:!bg-gray-100 absolute -right-6 top-1/2 transform -translate-y-1/2"
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
      aria-label="next"
    >
      <FaArrowRight className="text-black text-lg" />
    </button>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className="!flex !items-center !justify-center !bg-white !rounded-full !shadow !w-10 !h-10 !z-20 hover:!bg-gray-100 absolute -left-6 top-1/2 transform -translate-y-1/2"
      style={{ ...style, display: 'flex' }}
      onClick={onClick}
      aria-label="prev"
    >
      <FaArrowLeft className="text-black text-lg" />
    </button>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  autoplay: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        arrows: false,
      },
    },
  ],
};

export default function ArticlesCarousel() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      const res = await getAllBlogs({ search: "", page: 0, limit: 10 });
      console.log(res);
      setBlogs(res?.blogs || []);
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="w-full bg-white py-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl balsamiq-sans-bold primary-color mb-10 text-center">Our Latest News And Articles</h2>
      <div className="w-full px-2 md:px-20 relative max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-10">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10">No articles found.</div>
        ) : (
          <Slider {...settings}>
            {blogs.map((a, idx) => (
              <div key={idx} className="px-3 flex">
                <div className="rounded-2xl shadow bg-white flex flex-col w-full h-full border-b border-gray-200">
                  <img src={a.image || ''} alt={a.title} className="w-full h-56 object-cover rounded-t-2xl" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
                      <span className="flex items-center gap-1"><FaCalendarAlt /> {a.date || a.createdAt?.slice(0, 10)}</span>
                      {/* <span className="flex items-center gap-1 ml-auto"><FaRegComments /> {a.comments || 0} Comments</span> */}
                    </div>
                    <div className="font-bold primary-color mb-2 text-base mt-4">{a.title}</div>
                    <div className="text-gray-500 text-sm mb-4 flex-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: a.desc || a.description }}></div>
                    <Link to={`/news/${a._id || a.id}`} className="primary-color font-semibold flex items-center gap-2 hover:underline mt-auto">Read More <FaArrowRight /></Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
      <Link to="/news" className="mt-10 w-[30%] py-3 text-center border-2 border-[#1D3557] rounded-xl outfit-medium text-black text-lg">View More</Link>
    </div>
  );
} 