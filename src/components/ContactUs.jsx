import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    help: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setForm({ name: '', phone: '', help: '' });
  };

  return (
    <div className="w-full bg-white font-sans flex flex-col min-h-screen">
      {/* Top Header Section */}
      <section className="w-full bg-[#FFD000] py-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl text-black font-semibold mb-4 tracking-tight outfit-regular">Contact our Team</h1>
        <p className="text-xl md:text-2xl text-black font-medium">Got any queries? We're here to assist.</p>
      </section>

      {/* Form Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border-2 border-[#FFD000] rounded-3xl p-8 md:p-12 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 relative">
              <label className="text-black font-bold text-lg">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-[#FFD000] rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD000] transition-colors"
                required
              />
            </div>
            
            <div className="flex flex-col gap-2 relative">
              <label className="text-black font-bold text-lg">Your Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-[#FFD000] rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD000] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-black font-bold text-lg">What do you need help with?</label>
              <textarea
                name="help"
                value={form.help}
                onChange={handleChange}
                rows="4"
                className="w-full border border-[#FFD000] rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#FFD000] transition-colors resize-none"
                required
              ></textarea>
            </div>

            <p className="text-sm text-gray-700">
              *By submitting this form you agree to Petric's <Link to="/privacy-policy" className="underline hover:text-black">Privacy Policy</Link>
            </p>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors"
              >
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Connect Via Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-[4rem] text-black mb-16 tracking-tight text-center outfit-regular">
          You can also connect via
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
          {/* Email Card (Yellow) */}
          <div className="bg-[#FFD000] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-2 h-72 border border-transparent shadow hover:shadow-lg">
            <div className="bg-white text-black w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6">
              <FaEnvelope className="text-5xl" />
            </div>
            <div className="font-bold text-black text-xl mb-1 mt-2">Email:</div>
            <div className="text-black text-lg">team@petric.in</div>
          </div>

          {/* Phone Card (White) */}
          <div className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-2 h-72 border border-[#FFD000] shadow hover:shadow-lg">
            <div className="bg-white text-black w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6 border border-[#FFD000]">
              <FaPhoneAlt className="text-5xl" />
            </div>
            <div className="font-bold text-black text-xl mb-1 mt-2">Phone:</div>
            <div className="text-black text-lg">+91 8295756962</div>
          </div>

          {/* WhatsApp Card (White) */}
          <div className="bg-white rounded-[2rem] p-8 flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-2 h-72 border border-[#FFD000] shadow hover:shadow-lg">
            <div className="bg-white w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6 border border-[#FFD000]">
              <FaWhatsapp className="text-[4rem] text-green-500" />
            </div>
            <div className="font-bold text-black text-xl mb-1 mt-2">WhatsApp:</div>
            <div className="text-black text-lg">+91 8295756962</div>
          </div>
        </div>
      </section>

      {/* Catalogue Section */}
      <section className="w-full py-16 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Explore Our Products</h2>
        <Link 
          to="/catalogue" 
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
        >
          View Full Catalogue
        </Link>
      </section>
    </div>
  );
} 