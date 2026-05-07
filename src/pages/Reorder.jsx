import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import { FiBox, FiPackage, FiRefreshCw } from 'react-icons/fi';
import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';

// Mock Data
const mockOrders = [
  {
    id: "ORD-987654321",
    date: "12 Oct 2023",
    status: "Delivered",
    total: "₹1,450",
    items: [
      { img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", qty: 1 },
      { img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹600", qty: 1 }
    ]
  },
  {
    id: "ORD-123456789",
    date: "05 Sep 2023",
    status: "Delivered",
    total: "₹850",
    items: [
      { img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", qty: 1 }
    ]
  }
];

export default function Reorder() {
  // Toggle this array between mockOrders and [] to test the empty state.
  // Example for empty state: const [orders, setOrders] = useState([]);
  const [orders, setOrders] = useState(mockOrders); 

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col">
      <NewHomeNavbar />
      
      <main className="max-w-[1000px] mx-auto px-4 md:px-8 py-10 md:py-16 w-full flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black border-l-4 border-[#FFD000] pl-4">
            Buy Again
          </h1>
          {/* For demonstration purposes: quick toggle switch */}
          <button 
            onClick={() => setOrders(orders.length > 0 ? [] : mockOrders)}
            className="text-xs font-semibold text-gray-400 hover:text-black transition-colors underline"
          >
            Toggle Empty State Demo
          </button>
        </div>

        {orders.length === 0 ? (
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
          <div className="flex flex-col gap-8">
            {orders.map((order, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <FiBox /> {order.status}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">Order Placed:</span> {order.date}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Order ID: <span className="text-black font-bold">{order.id}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-6">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 md:gap-6 group">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-2xl p-2 shrink-0 border border-gray-100 flex items-center justify-center group-hover:border-[#FFD000] transition-colors">
                        <img src={item.img} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-bold text-black text-base md:text-lg mb-1 group-hover:text-[#FFD000] transition-colors cursor-pointer">{item.name}</h3>
                        <span className="text-xs md:text-sm text-gray-500 font-medium mb-1">{item.weight} • Qty: {item.qty}</span>
                        <span className="font-extrabold text-black text-lg md:text-xl">{item.price}</span>
                      </div>
                      <button className="hidden sm:flex items-center gap-2 bg-white border-2 border-gray-200 text-black px-4 md:px-5 py-2 rounded-xl font-bold text-sm hover:border-[#FFD000] hover:bg-[#FFD000] transition-all whitespace-nowrap shadow-sm">
                        <FiRefreshCw /> Add
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div className="text-lg text-black flex items-baseline gap-2">
                    <span className="text-gray-500 text-sm font-medium">Order Total: </span>
                    <span className="font-extrabold text-2xl">{order.total}</span>
                  </div>
                  <button className="w-full sm:w-auto bg-[#FFD000] text-black px-8 py-3.5 rounded-xl font-extrabold hover:bg-[#ffdb33] hover:shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-wide text-sm">
                    <FiRefreshCw className="h-4 w-4" /> Reorder Entire Box
                  </button>
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
