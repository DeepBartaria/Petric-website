import React, { useState } from 'react';
import { FiChevronDown, FiMinus, FiPlus, FiShoppingBag, FiStar } from 'react-icons/fi';
import NewHomeNavbar from '../components/NewHomeNavbar';

import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';
import product5 from '../assets/product5.png';
import product6 from '../assets/product6.png';
import product7 from '../assets/product7.png';
import product8 from '../assets/product8.png';
import product9 from '../assets/product9.png';

const recommendations = [
  { img: product2, brand: 'Royal Canin', name: 'Mini Adult Dry Dog Food', price: '₹1,250' },
  { img: product3, brand: 'Whiskas', name: 'Adult Tuna Cat Food', price: '₹499' },
  { img: product4, brand: 'Drools', name: 'Chicken & Egg Adult Food', price: '₹680' },
  { img: product5, brand: 'Gnawlers', name: 'Calcium Milk Bone Treats', price: '₹220' },
];

const brandProducts = [
  { img: product6, brand: 'Pedigree', name: 'Puppy Chicken & Milk', price: '₹365' },
  { img: product7, brand: 'Pedigree', name: 'Tasty Minis Dog Treats', price: '₹180' },
  { img: product8, brand: 'Pedigree', name: 'Adult Wet Food Pouch', price: '₹55' },
  { img: product9, brand: 'Pedigree', name: 'Dentastix Daily Oral Care', price: '₹199' },
];

const similarProducts = [
  { img: product3, brand: 'Whiskas', name: 'Ocean Fish Dry Cat Food', price: '₹599' },
  { img: product2, brand: 'Royal Canin', name: 'Medium Adult Dog Food', price: '₹1,980' },
  { img: product4, brand: 'Drools', name: 'Focus Adult Super Premium', price: '₹1,099' },
  { img: product1, brand: 'Pedigree', name: 'Adult Meat & Rice Dog Food', price: '₹849' },
];

const productTabs = {
  description: {
    label: 'Description',
    title: 'Complete daily nutrition',
    body: 'A balanced adult dog food made with chicken, vegetables, whole grains, and essential vitamins to support energy, digestion, and a shiny coat.',
    points: ['Made for adult dogs above 12 months', 'Supports healthy digestion and strong muscles', 'Crunchy kibble texture helps keep meals exciting'],
  },
  details: {
    label: 'Product Details',
    title: 'Product Details',
    body: 'Suitable for adult dogs above 12 months. Serve dry or lightly moistened. Store in a cool, dry place after opening.',
    points: ['Brand: Pedigree', 'Pet type: Dog', 'Life stage: Adult', 'Flavour: Chicken & Vegetables', 'Pack size: 3 kg'],
  },
  faqs: {
    label: 'FAQs',
    title: 'FAQs',
    body: 'Transition over 7 days when changing food. Always keep fresh drinking water available for your pet.',
    points: ['Can puppies eat this? No, this pack is made for adult dogs.', 'How should I store it? Seal the pack and keep it away from heat and moisture.', 'Can I mix it with wet food? Yes, you can mix it with compatible wet food.'],
  },
};

function ProductCard({ product }) {
  return (
    <article className="bg-white border border-gray-100 rounded-3xl w-[75vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-4 shadow-sm">
      <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-2xl mb-4 p-2 relative">
        <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-2 left-2 bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          15% Off
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
        <h3 className="font-bold text-black text-sm line-clamp-2 mb-2">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] line-through">₹999</span>
            <span className="font-bold text-black text-lg">{product.price}</span>
          </div>
          <button className="bg-[#FFD000] text-black text-xs md:text-sm font-bold px-4 md:px-6 py-1.5 md:py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all">
            ADD
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Sample() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const activeContent = productTabs[activeTab];

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <NewHomeNavbar />

      <main className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 md:py-10">
        <div className="mb-5 text-sm font-bold text-gray-700 underline underline-offset-4 decoration-1">
          Home / Dog Food / Pedigree Adult Chicken & Vegetables
        </div>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(340px,1fr)]">
          <div className="min-h-[300px] rounded-[2rem] bg-gray-50 border border-gray-100 p-6 md:min-h-[430px] flex items-center justify-center overflow-hidden group shadow-sm">
            <img src={product1} alt="Pedigree Adult Dry Dog Food" className="max-h-[340px] w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
          </div>

          <aside className="rounded-3xl border border-gray-100 bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            <div className="mb-3 inline-flex items-center rounded-full bg-[#FF5757] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
              Bestseller
            </div>
            <h1 className="text-lg font-extrabold leading-tight md:text-xl">
              Pedigree Adult Dog Dry Food - Chicken & Vegetables - 3 kg
            </h1>
            <p className="mt-1 text-sm font-bold text-gray-600">by: Pedigree</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
              <span className="flex items-center gap-1 font-extrabold">
                <FiStar className="h-4 w-4 fill-[#FFD000] text-[#FFD000]" />
                4.8
              </span>
              <span>2,430 pet parents bought this</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="flex h-10 items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 text-sm font-bold hover:border-[#FFD000] transition-colors">
                Chicken <FiChevronDown />
              </button>
              <button className="flex h-10 items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 text-sm font-bold hover:border-[#FFD000] transition-colors">
                3 kg <FiChevronDown />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-baseline gap-5">
              <p className="text-lg font-extrabold">MRP: ₹849.00</p>
              <p className="text-sm font-bold text-gray-600 line-through">₹999</p>
              <p className="text-sm font-extrabold text-green-700">15% off</p>
            </div>

            <button className="mt-3 flex h-10 w-full max-w-[210px] items-center justify-between rounded-xl bg-gray-50 border border-gray-100 px-4 text-sm font-bold hover:border-[#FFD000] transition-colors">
              Coupons <FiChevronDown />
            </button>

            <div className="mt-7 flex items-center justify-center gap-3">
              <div className="flex h-10 items-center overflow-hidden rounded-full border border-gray-100 bg-gray-50 shadow-sm">
                <button
                  className="grid h-10 w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="grid h-10 min-w-10 place-items-center bg-white text-sm font-extrabold">{quantity}</span>
                <button
                  className="grid h-10 w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
              <button className="flex h-10 items-center gap-2 rounded-full bg-[#FFD000] px-8 text-sm font-extrabold hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all">
                <FiShoppingBag />
                Add
              </button>
            </div>
          </aside>
        </section>

        <nav className="mt-8 grid max-w-[820px] grid-cols-3 gap-3 text-sm md:text-base font-extrabold">
          {Object.entries(productTabs).map(([key, tab]) => {
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                className={`rounded-full px-4 py-2 text-left transition-all ${
                  isActive
                    ? 'bg-[#FFD000] shadow-sm'
                    : 'bg-gray-50 hover:bg-[#FFD000]'
                }`}
                onClick={() => setActiveTab(key)}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <section className="mt-4 rounded-[2rem] border border-gray-100 bg-white p-5 md:p-8 md:min-h-[230px] shadow-sm">
          <div className="rounded-2xl bg-gray-50 p-5 md:p-6">
            <h2 className="text-lg font-extrabold">{activeContent.title}</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-gray-700">
              {activeContent.body}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {activeContent.points.map((point) => (
                <div key={point} className="rounded-2xl bg-white border border-gray-100 p-4 text-sm font-bold text-gray-800 shadow-sm">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 hover:text-gray-700 cursor-pointer">Pet Parents also bought</h2>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {recommendations.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 hover:text-gray-700 cursor-pointer">More from Pedigree</h2>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {brandProducts.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
        </section>

        <section className="mt-10 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-black transition-colors duration-300 hover:text-gray-700 cursor-pointer">Products like this...</h2>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {similarProducts.map((product) => <ProductCard key={product.name} product={product} />)}
          </div>
        </section>
      </main>
    </div>
  );
}
