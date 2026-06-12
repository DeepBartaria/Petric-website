import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaCalendarAlt, FaRegComments } from 'react-icons/fa';
import Footer from '../components/Footer';
import { getBlogById } from '../helper/blogApi';

export default function ArticleDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlog() {
            setLoading(true);
            setError(null);
            try {
                const res = await getBlogById(id);
                setBlog(res.blogs || res);
            } catch (err) {
                setError('Failed to load article.');
            }
            setLoading(false);
        }
        fetchBlog();
    }, [id]);

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 md:p-12">
                <h2 className="text-center text-2xl balsamiq-sans-bold primary-color mb-10">
                    Our Latest News And Articles
                </h2>
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                    {loading ? (
                        <div className="text-center py-10">Loading article...</div>
                    ) : error ? (
                        <div className="text-center py-10 text-red-500">{error}</div>
                    ) : blog ? (
                        <>
                            <img src={blog.image || ''} alt={blog.title} className="w-full h-80 object-cover" />
                            <div className="p-8">
                                <div className="flex items-center text-xs text-gray-500 gap-6 mb-4">
                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {blog.date || blog.createdAt?.slice(0, 10)}</span>
                                    {/* <span className="flex items-center gap-1"><FaRegComments /> 6 Comments</span> */}
                                </div>
                                <div className="font-bold primary-color mb-4 text-lg md:text-xl">{blog.title}</div>
                                <div className="text-gray-700 text-base mb-2" dangerouslySetInnerHTML={{ __html: blog.desc || blog.description }}>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10">Article not found.</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
} 