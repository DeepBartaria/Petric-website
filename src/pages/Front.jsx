import React from 'react';
import { FaBolt, FaTruck, FaHospital, FaBrush, FaBath, FaBone, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { FiSearch, FiShoppingCart, FiPackage, FiInfo } from 'react-icons/fi';
import { GiDogBowl, GiPill } from 'react-icons/gi';
import { BiTennisBall } from 'react-icons/bi';

const Front = () => {
  return (
    <div className="font-sans text-gray-900 bg-[#FAFAFA] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center bg-white overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <div className="w-full md:w-3/4 h-full relative">
            <img 
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Petric Pets" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 md:w-2/3 z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block bg-[#FEF9C3] text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Now order from Web. No app needed.
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-[#F5C400]">Everything your little monster needs.</span> At your door in minutes.
            </h1>
            
            <p className="text-lg text-gray-700 mb-2">
              Food, meds, toys, litter, and treats. We deliver across Gurgaon in minutes.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              No app. No delivery charges. No waiting around.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#F5C400] text-black font-semibold px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-colors shadow-sm">
                Order now
              </button>
              <button className="bg-white text-[#F5C400] border-2 border-[#F5C400] font-semibold px-8 py-3.5 rounded-full hover:bg-yellow-50 transition-colors shadow-sm">
                Try the app
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#F5C400] mb-12">
            Why Gurgaon's pet parents choose Petric?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <FaBolt className="text-[#F5C400] text-2xl" />
                <h3 className="text-xl font-bold">In Minutes</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Fast delivery across Gurgaon (and nearby areas). No waiting around while your pet stares at an empty bowl.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🚚</span>
                <h3 className="text-xl font-bold">Zero Delivery Charges</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Always. On every order, big or small. No platform fees or no hidden fees.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏥</span>
                <h3 className="text-xl font-bold">24/7 Pet Pharmacy</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Medicines and emergencies, sorted at any hour. Whenever you're in need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Steps Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative rounded-3xl overflow-hidden h-[600px]">
                <img 
                  src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Woman with pet on laptop" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent"></div>
              </div>
            </div>
            
            {/* Right Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-bold mb-12">
                <span className="text-[#F5C400]">Ordering</span> will now take even less.
              </h2>
              
              <div className="space-y-10">
                {/* Step 1 */}
                <div>
                  <div className="w-full bg-white border border-gray-200 rounded-full py-4 flex justify-center items-center shadow-sm mb-4">
                    <FiSearch className="text-gray-500 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F5C400] mb-2">Browse</h3>
                  <p className="text-gray-600">Search for food, meds, toys, or litter. Everything in one place.</p>
                </div>
                
                {/* Step 2 */}
                <div>
                  <div className="w-full bg-white border border-gray-200 rounded-full py-4 flex justify-center items-center shadow-sm mb-4">
                    <FiShoppingCart className="text-gray-500 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F5C400] mb-2">Order</h3>
                  <p className="text-gray-600">Add to cart, check out in seconds. Just tap and go.</p>
                </div>
                
                {/* Step 3 */}
                <div>
                  <div className="w-full bg-white border border-gray-200 rounded-full py-4 flex justify-center items-center shadow-sm mb-4">
                    <FiPackage className="text-gray-500 text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#F5C400] mb-2">Relax</h3>
                  <p className="text-gray-600">We pack it and bring it to your door in minutes. That's it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything under <span className="line-through text-gray-500">one roof</span> one tab.
            </h2>
            <p className="text-gray-600">
              From daily essentials to emergency meds, ready to reach your door in minutes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            
            {/* Category 1 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <GiDogBowl className="text-4xl text-[#F5C400]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Food & Nutrition</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dry, wet, breed-specific and prescription diets for dogs and cats of every size and age.
              </p>
            </div>
            
            {/* Category 2 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <GiPill className="text-4xl text-[#F5C400]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pet Pharmacy</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Medicines, supplements, tick & flea care for you whenever you need them.
              </p>
            </div>
            
            {/* Category 3 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <BiTennisBall className="text-4xl text-[#F5C400]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Toys & Play</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                For the zoomies, the chewers and the little destroyers. Keep them busy and happy.
              </p>
            </div>
            
            {/* Category 4 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <FaBath className="text-4xl text-[#F5C400]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Litter & Hygiene</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Litter, pads, and poop bags for clean and fresh home, always!
              </p>
            </div>
            
            {/* Category 5 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <FaBrush className="text-4xl text-[#F5C400]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Grooming</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Shampoos, brushes, and paw care for all the spa-day stuff your pet secretly loves.
              </p>
            </div>
            
            {/* Category 6 */}
            <div className="flex flex-col">
              <div className="mb-4">
                <FaBone className="text-4xl text-[#F5C400]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Treats</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Because good boys and girls have absolutely earned it. Reward them right.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* We're pet parents too Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row rounded-[2rem] overflow-hidden shadow-sm">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 bg-[#FDE665] p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                We're pet parents too.
              </h2>
              <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
                <p>
                  Petric wasn't built in a boardroom. It was built by pet parents who also panic to find the right food when it's over. Who've hunted for deworming meds on Sundays.
                </p>
                <p>
                  So we built a community that actually keeps up with real life: real stock, real speed, real care. Order from traffic, from your desk, from the couch.
                </p>
                <p className="font-bold pt-2">
                  Wherever you are, we've got you.
                </p>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="w-full md:w-1/2 h-80 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Woman cuddling dog" 
                className="w-full h-full object-cover"
              />
            </div>
            
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Pet emergency doesn't check the clock.<br />Neither do we.
          </h2>
          
          <p className="text-gray-800 text-lg mb-6">
            Tummy trouble at 2am? Out of meds on a holiday?
          </p>
          <p className="text-gray-800 text-lg mb-10">
            Tell us what your pet needs and we'll get it moving as fast as we can. Prescription medicines, supplements, specialist diets, we'll sort it.
          </p>
          
          <div className="bg-[#BFDBFE] p-6 rounded-xl flex items-start gap-4 mb-10">
            <FiInfo className="text-blue-600 text-xl mt-1 shrink-0" />
            <p className="text-gray-900 leading-relaxed">
              Our pharmacy team is available around the clock. Call or WhatsApp <span className="font-bold">82957-56962</span> any time — day, night, or somewhere in between.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#F5C400] text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition-colors shadow-sm">
              WhatsApp us
            </button>
            <button className="bg-white text-black border border-gray-400 font-semibold px-8 py-3 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Call 82957-56962
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#F5C400] mb-16">
            Loved by Gurgaon's pet parents.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="relative">
              <FaQuoteLeft className="absolute -top-4 -left-4 text-4xl text-[#F5C400]" />
              <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col justify-between">
                <p className="text-gray-800 leading-relaxed mb-6 relative z-10">
                  "Ordered Simba's food close to midnight. It was here before his breakfast. Still don't know how Petric pulls it off."
                </p>
                <p className="font-bold text-gray-900">— Customer, Gurgaon</p>
              </div>
              <FaQuoteRight className="absolute -bottom-4 -right-4 text-4xl text-[#F5C400]" />
            </div>
            
            {/* Testimonial 2 */}
            <div className="relative">
              <FaQuoteLeft className="absolute -top-4 -left-4 text-4xl text-[#F5C400]" />
              <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col justify-between">
                <p className="text-gray-800 leading-relaxed mb-6 relative z-10">
                  "The 24/7 pharmacy genuinely saved us during a late-night scare. Calm, fast, sorted."
                </p>
                <p className="font-bold text-gray-900">— Customer, Gurgaon</p>
              </div>
              <FaQuoteRight className="absolute -bottom-4 -right-4 text-4xl text-[#F5C400]" />
            </div>
            
            {/* Testimonial 3 */}
            <div className="relative">
              <FaQuoteLeft className="absolute -top-4 -left-4 text-4xl text-[#F5C400]" />
              <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 h-full flex flex-col justify-between">
                <p className="text-gray-800 leading-relaxed mb-6 relative z-10">
                  "I'm picky and so is my cat. I'm always able to find everything I need on Petric. If not, I just drop them a WhatsApp and they sort it out. Great stuff!"
                </p>
                <p className="font-bold text-gray-900">— Customer, Gurgaon</p>
              </div>
              <FaQuoteRight className="absolute -bottom-4 -right-4 text-4xl text-[#F5C400]" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Image & Heading */}
            <div className="w-full lg:w-1/3">
              <div className="rounded-2xl overflow-hidden mb-8 h-80">
                <img 
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Cat looking curious" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-[#F5C400]">Got questions?</span> We've got answers.
              </h2>
              <p className="text-gray-600">
                Everything you need to know before your first order and probably your second too.
              </p>
            </div>
            
            {/* Right FAQs */}
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* FAQ 1 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#F5C400]">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Do I need to download Petric app to order?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-[#F5C400] font-bold">Nope.</span> You can just order straight from Petric website in your browser. The app's there if you want it for faster reorders but it's completely optional.
                  </p>
                </div>
                
                {/* FAQ 2 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#F5C400]">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">How fast is delivery?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-[#F5C400] font-bold">In minutes</span>, across Gurgaon. We'll show you the estimate before you check out so there are no surprises.
                  </p>
                </div>
                
                {/* FAQ 3 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#F5C400]">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Are there any delivery charges?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <span className="text-[#F5C400] font-bold">None. Zero.</span> On every order, every single time. No minimum basket, no small-order fee.
                  </p>
                </div>
                
                {/* FAQ 4 */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#F5C400]">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Can I order prescription medicines?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Yes. Our 24/7 pet pharmacy stocks medicines and prescription diets. Call us on <span className="text-[#F5C400] font-bold">82957-56962</span> and we'll help you find exactly what your pet needs.
                  </p>
                </div>
                
                {/* FAQ 5 (Spanning or single) */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-[#F5C400]">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Which areas do you deliver to?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Across Gurugram. Just add your address at checkout to confirm we've got your locality covered.
                  </p>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#F5C400] mb-8">
            You will never leave empty handed.
          </h2>
          
          <p className="text-gray-800 text-lg mb-10">
            Don't wait for the panic. Order in minutes; from traffic, from your desk, from the couch. Wherever you are, we've got you covered.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button className="bg-[#F5C400] text-black font-semibold px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-colors shadow-sm">
              Order now on petric.in
            </button>
            <button className="bg-white text-black border border-gray-400 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
              Get the app
            </button>
          </div>
          
          <hr className="border-gray-200 mb-10" />
          
          <div className="text-sm md:text-base space-y-2">
            <p>
              <span className="text-[#F5C400] italic font-semibold">Gurgaon ka apna pet care app' Petric.</span>
              <span className="text-gray-700 italic ml-1">Any time. Every day, we've got you.</span>
            </p>
            <p className="text-gray-900 font-medium">
              Call or WhatsApp us anytime: <span className="font-bold">82957-56962</span>
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Front;
