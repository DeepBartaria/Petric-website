import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaRegComments, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../helper/blogApi';

const pageSize = 9;

export default function NewsArticlesGrid() {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      const res = await getAllBlogs({ search: '', page: page - 1, limit: pageSize });
      setBlogs(res.blogs || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    }
    fetchBlogs();
  }, [page]);

  return (
    <div className="mx-auto px-4 md:p-20">
      <h2 className="text-center text-2xl balsamiq-sans-bold primary-color mb-10">
        Our Latest News And Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {loading ? (
          <div className="col-span-3 text-center py-10">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="col-span-3 text-center py-10">No articles found.</div>
        ) : (
          blogs.map((a, idx) => (
            <div key={idx} className="px-3 flex">
              <div className="rounded-2xl shadow bg-white flex flex-col w-full h-full border-b border-gray-200">
                <img src={a.image || ''} alt={a.title} className="w-full h-56 object-cover rounded-t-2xl" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
                    <span className="flex items-center gap-1"><FaCalendarAlt /> {a.date || a.createdAt?.slice(0, 10)}</span>
                  </div>
                  <div className="font-bold primary-color mb-2 text-base mt-4">{a.title}</div>
                  <div className="text-gray-500 text-sm mb-4 flex-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: a.description || a.description }}></div>
                  <Link to={`/news/${a._id || a.id}`} className="primary-color font-semibold flex items-center gap-2 hover:underline mt-auto">Read More<FaArrowRight /></Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-md ${num === page ? 'bg-[#1D3557] text-white' : 'bg-white text-black border border-[#1D3557]'}`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-md bg-white text-black border border-[#1D3557]"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
} 