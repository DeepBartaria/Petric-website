import React, { useState } from 'react';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import { FiChevronRight } from 'react-icons/fi';

import banner1 from '../assets/banner/banner1.jpg';
import banner2 from '../assets/banner/banner2.jpg';
import banner3 from '../assets/banner/banner3.jpg';

import pedigree from '../assets/pedigree.png';
import drools from '../assets/drools.png';
import whiskas from '../assets/whiskas.png';
import royalcanin from '../assets/royalcanin.png';
import sheba from '../assets/sheba.png';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import brand3 from '../assets/brand3.png';
import brand4 from '../assets/brand4.png';
import brand5 from '../assets/brand5.png';
import brand6 from '../assets/brand6.png';

import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';

const mostBoughtProducts = [
  { id: 1, img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", oldPrice: "₹999", discount: "15%" },
  { id: 2, img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹1,200", oldPrice: "₹1,400", discount: "14%" },
  { id: 3, img: product3, name: "Whiskas Adult Dry Cat Food", weight: "1.2 kg", price: "₹450", oldPrice: "₹500", discount: "10%" },
  { id: 4, img: product4, name: "Drools Chicken and Egg Adult", weight: "3 kg", price: "₹650", oldPrice: "₹750", discount: "13%" },
];

const brands = [
  { img: pedigree, alt: 'Pedigree', discount: '26%' },
  { img: royalcanin, alt: 'Royal Canin', discount: '27%' },
  { img: brand1, alt: 'Farmina N&D', discount: '28%' },
  { img: brand2, alt: 'Vet-Life', discount: '23%' },
  { img: sheba, alt: 'Sheba', discount: '24%' },
  { img: whiskas, alt: 'Whiskas', discount: '24%' },
  { img: drools, alt: 'Drools', discount: '28%' },
  { img: brand3, alt: 'HUFT', discount: '17%' },
  { img: brand4, alt: 'JerHigh', discount: '15%' },
  { img: brand5, alt: 'Purina Pro', discount: '23%' },
  { img: brand6, alt: 'Farmina Matisse', discount: '24%' },
];

export default function NewHome() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  return (
    <div className="min-h-screen bg-white font-sans relative">
      <NewHomeNavbar />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />
      
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Top Banners Section */}
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
          <div className="col-span-2 bg-[#D9D9D9] rounded-[2rem] h-[500px] w-full overflow-hidden relative cursor-pointer group">
            <img src={banner1} alt="Banner 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="grid grid-rows-2 gap-6 h-[500px]">
            <div className="bg-[#D9D9D9] rounded-[2rem] w-full h-full overflow-hidden relative cursor-pointer group">
              <img src={banner2} alt="Banner 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="bg-[#D9D9D9] rounded-[2rem] w-full h-full overflow-hidden relative cursor-pointer group">
              <img src={banner3} alt="Banner 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>

        {/* Mobile View - Sliding Cards */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-4 mb-12 pb-2">
          <div className="bg-[#D9D9D9] rounded-[2rem] h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer group">
            <img src={banner1} alt="Banner 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="bg-[#D9D9D9] rounded-[2rem] h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer group">
            <img src={banner2} alt="Banner 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="bg-[#D9D9D9] rounded-[2rem] h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer group">
            <img src={banner3} alt="Banner 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>

        {/* Shop by Brands */}
        <div className="mb-14">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-black transition-colors duration-300 hover:text-gray-700 cursor-pointer">Shop by Brands</h2>
            <a href="#" className="text-base text-black underline underline-offset-4 decoration-1 transition-all duration-300 hover:text-gray-600 hover:underline-offset-2">See all</a>
          </div>
          <div className="flex items-center gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2">
            {brands.map((brand, i) => (
              <div key={i} className="relative shrink-0 flex items-center justify-center w-24 h-24 rounded-full bg-white border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.08)] cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                <img src={brand.img} alt={brand.alt} className="w-16 h-16 object-contain transition-transform duration-300 hover:scale-110" />
                <div className="absolute -top-1 -right-2 bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10 transition-transform duration-300 hover:scale-110">
                  {brand.discount} Off
                </div>
              </div>
            ))}
            <button className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 ml-2 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md hover:bg-gray-800">
              <FiChevronRight className="text-white h-6 w-6 transition-transform duration-300 hover:translate-x-0.5" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Most Bought */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-black mb-6">Most Bought</h2>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {mostBoughtProducts.map((product, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl w-[75vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-4 shadow-sm">
                <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-2xl mb-4 p-2 relative">
                   <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                   <div className="absolute top-2 left-2 bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount} Off
                   </div>
                </div>
                <div className="flex flex-col flex-grow">
                   <h3 className="font-bold text-black text-sm line-clamp-2 mb-1">{product.name}</h3>
                   <span className="text-xs text-gray-500 mb-2">{product.weight}</span>
                   <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-gray-400 text-[10px] line-through">{product.oldPrice}</span>
                         <span className="font-bold text-black text-lg">{product.price}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="bg-[#FFD000] text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all"
                      >
                         ADD
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-black mb-6">New Arrivals</h2>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {mostBoughtProducts.map((product, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl w-[75vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-4 shadow-sm">
                <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-2xl mb-4 p-2 relative">
                   <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                   <div className="absolute top-2 left-2 bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount} Off
                   </div>
                </div>
                <div className="flex flex-col flex-grow">
                   <h3 className="font-bold text-black text-sm line-clamp-2 mb-1">{product.name}</h3>
                   <span className="text-xs text-gray-500 mb-2">{product.weight}</span>
                   <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-gray-400 text-[10px] line-through">{product.oldPrice}</span>
                         <span className="font-bold text-black text-lg">{product.price}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="bg-[#FFD000] text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all"
                      >
                         ADD
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Toys */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-black mb-6">Toys</h2>
          <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {mostBoughtProducts.map((product, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl w-[75vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-4 shadow-sm">
                <div className="w-full h-40 flex items-center justify-center bg-gray-50 rounded-2xl mb-4 p-2 relative">
                   <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                   <div className="absolute top-2 left-2 bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount} Off
                   </div>
                </div>
                <div className="flex flex-col flex-grow">
                   <h3 className="font-bold text-black text-sm line-clamp-2 mb-1">{product.name}</h3>
                   <span className="text-xs text-gray-500 mb-2">{product.weight}</span>
                   <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-gray-400 text-[10px] line-through">{product.oldPrice}</span>
                         <span className="font-bold text-black text-lg">{product.price}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="bg-[#FFD000] text-black text-sm font-bold px-6 py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all"
                      >
                         ADD
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      
      <div className="w-full">
        <Benefit />
        <WhyTrustUs />
        <OffersBanner />
        <Testimonials />
      </div>
      
      <Footer />
    </div>
  );
}
