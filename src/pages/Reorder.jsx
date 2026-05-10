import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import { FiPackage, FiRefreshCw } from 'react-icons/fi';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';

// Mock Data - Individual products from previous orders
const mockReorderProducts = [
  { id: 1, img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", qty: 1 },
  { id: 2, img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹600", qty: 1 },
  { id: 3, img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", qty: 1 },
  { id: 4, img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹600", qty: 1 },
  { id: 5, img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", qty: 1 },
  { id: 6, img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹600", qty: 1 },
];

export default function Reorder() {
  const [reorderProducts, setReorderProducts] = useState(mockReorderProducts);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
      <NewHomeNavbar />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16 w-full flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black border-l-4 border-[#FFD000] pl-4">
            Buy Again
          </h1>
          <button
            onClick={() => setReorderProducts(reorderProducts.length > 0 ? [] : mockReorderProducts)}
            className="text-xs font-semibold text-gray-400 hover:text-black transition-colors underline"
          >
            Toggle Empty State Demo
          </button>
        </div>

        {reorderProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 p-12 shadow-sm text-center min-h-[40vh]">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <FiPackage className="text-gray-300 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-extrabold text-black mb-3">No previous orders</h2>
            <p className="text-gray-500 mb-8 max-w-md">You haven't placed any orders yet. Once you do, you can quickly reorder your favorite pet supplies from here.</p>
            <Link to="/new-home" className="bg-[#FFD000] text-black font-bold px-8 py-3 rounded-full hover:bg-[#ffdb33] transition-all hover:-translate-y-1 shadow-sm uppercase tracking-wider text-sm">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {reorderProducts.map((product, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl p-3 md:p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden group">
                <div className="w-full h-24 md:h-36 flex items-center justify-center bg-gray-50 rounded-2xl mb-3 p-2 relative">
                  <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-black text-xs md:text-sm line-clamp-2 mb-1 group-hover:text-[#FFD000] transition-colors cursor-pointer">{product.name}</h3>
                  <span className="text-[10px] md:text-xs text-gray-500 mb-2">{product.weight}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-black text-sm md:text-lg">{product.price}</span>
                    <button className="bg-[#FFD000] text-black text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[#ffdb33] hover:scale-105 transition-all shadow-sm">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
