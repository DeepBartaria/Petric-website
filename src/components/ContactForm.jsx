import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import accept from '../assets/accept.png';
import whatsappIcon from '../assets/contact/whatsapp.png';
import { createRegistrationInquiry } from '../helper/inquiryApi';

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Select Service Type');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    terms: false,
  });

  const services = ['Healthcare', 'Product-Partner', 'Grooming', 'Others'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.name || form.name.trim().length < 2) {
      setError('Please enter a valid name (at least 2 characters).');
      return;
    }
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!form.mobileNo || !/^[0-9]{10}$/.test(form.mobileNo)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!form.terms) {
      setError('You must accept the Terms & Conditions.');
      return;
    }

    setLoading(true);
    try {
      const res = await createRegistrationInquiry({
        name: form.name,
        email: form.email,
        type: form.service || selectedService,
        mobileNo: form.mobileNo,
        message: form.message,
      });
      if(res.type === 'success') {
        setIsSubmitted(true);
        setForm({ name: '', email: '', service: '', message: '', terms: false });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err?.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 md:px-20">
      <div className="mx-auto bg-[#fff9e6] p-4 md:p-20 rounded-xl">
        {isSubmitted ? (
          <div className="flex flex-col gap-3 items-center justify-center min-h-[200px]">
            <img src={accept} height={60} width={60} alt="" />
            <img src={logo} height={100} width={100} alt="" />
            {/* <a
              href={`https://wa.me/918295756962`}
              target="_blank"
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
                className="w-14 h-14 rounded-full shadow-lg hover:scale-110 transition"
              />
            </a> */}
            <div className="text-center text-sm text-[#333333]">Thank you for your submission.<br />Our team will contact you soon.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-5 py-4 rounded-lg border font-normal border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-5 py-4 rounded-lg border font-normal border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="number"
                maxLength={10}
                required
                pattern="[0-9]*"
                inputMode="numeric"
                name="mobileNo" 
                value={form.mobileNo}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full px-5 py-4 rounded-lg border font-normal border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                onInput={e => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
              />
              <div>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-lg border font-normal border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Service Type</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Message..."
                rows="5"
                className="w-full px-5 py-4 rounded-lg font-normal border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={form.terms}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-3 text-gray-700 font-medium">
                  I Accept Your <a href="/terms-and-conditions" className=' underline text-blue-500'>Terms & Conditions</a>
                </label>
              </div>
              {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
              <button
                type="submit"
                className="w-full bg-[#1D3557] text-white py-4 rounded-lg hover:bg-opacity-90 transition-colors"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Now'}
              </button>
            </div>
          </form>
        )}
        <p className="text-center text-red-600 font-semibold mt-6">
          Our Onboarding Team Will Connect With You Soon
        </p>
      </div>
    </div>
  );
} 