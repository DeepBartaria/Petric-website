import React from 'react';
import partnerImage from '../assets/register/register1.png';
import benefitIcon1 from '../assets/register/benifit1.png';
import benefitIcon2 from '../assets/register/benifit2.png';
import benefitIcon3 from '../assets/register/benifit3.png';
import benefitIcon4 from '../assets/register/benifit4.png';
const benefits = [
  { icon: benefitIcon1, text: 'Access to 1000s of local pet parents near you' },
  { icon: benefitIcon2, text: 'Transparent payments & real-time support' },
  { icon: benefitIcon3, text: 'Zero upfront cost - we earn only when you do' },
  { icon: benefitIcon4, text: 'Marketing & visibility support to grow your reach' },
];

export default function WhyPartner() {
  return (
    <div className="bg-white py-10 p-4 md:p-20">
      <div className="mx-auto">
        <h2 className="text-4xl balsamiq-sans-bold primary-color text-center mb-16">Why Partner With Petric?</h2>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Left Side */}
          <div className="md:w-1/2 space-y-8">
            <p className="text-[#333333] font-normal text-lg">
              Whether you're a single clinic, a grooming van, or a retail store - we've built Petric to help you grow your customer base, manage leads smoothly, and focus on what matters most: <b>caring for pets.</b>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <img src={item.icon} alt="" className="w-12 h-12 mt-1" />
                  <p className="text-[#333333] font-normal">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="md:w-1/2">
            <img src={partnerImage} alt="Happy couple with their dogs" className="rounded-lg shadow-lg w-full" />
          </div>
        </div>
      </div>
    </div>
  );
} 