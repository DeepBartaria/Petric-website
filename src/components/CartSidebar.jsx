import React from 'react';
import { FiArrowLeft, FiShare2, FiInfo, FiPlus, FiMinus, FiChevronRight } from 'react-icons/fi';
import { BsClockHistory } from 'react-icons/bs';

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity }) {
  if (!isOpen) return null;

  // Calculate totals
  const itemsTotal = cartItems.reduce((total, item) => total + (parseInt(item.price.replace('₹', '').replace(',', '')) * item.quantity), 0);
  const deliveryCharge = 25;
  const handlingCharge = 2;
  const surgeCharge = 30;
  const grandTotal = itemsTotal + deliveryCharge + handlingCharge + surgeCharge;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#f8f9fa] z-50 flex flex-col shadow-2xl transform transition-transform duration-300 translate-x-0 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <FiArrowLeft className="h-6 w-6 text-black" strokeWidth={2.5} />
            </button>
            <h2 className="text-xl font-bold text-black">My Cart</h2>
          </div>
          <button className="flex items-center gap-1.5 text-black font-semibold hover:bg-yellow-50 px-3 py-1.5 rounded-md transition-colors">
            <FiShare2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-28">
          
          {/* Delivery Info */}
          <div className="bg-white rounded-2xl p-4 flex gap-4 items-center shadow-sm">
            <div className="bg-gray-50 p-3 rounded-full flex items-center justify-center shrink-0">
              <BsClockHistory className="h-8 w-8 text-black" />
            </div>
            <div>
              <h3 className="font-bold text-black text-lg">Delivery in 16 minutes</h3>
              <p className="text-gray-500 text-sm">Shipment of {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="h-16 w-16 border rounded-lg p-1 shrink-0">
                  <img src={item.img} alt={item.name} className="h-full w-full object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm text-gray-800 leading-snug line-clamp-2">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{item.weight}</p>
                  <p className="font-bold text-black text-sm mt-1">{item.price}</p>
                </div>
                <div className="flex items-center bg-[#FFD000] text-black rounded-lg px-2 py-1 shadow-sm shrink-0">
                  <button 
                    className="p-1 hover:bg-black/10 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  >
                    <FiMinus className="h-3 w-3" strokeWidth={3} />
                  </button>
                  <span className="font-bold text-sm mx-3 w-3 text-center">{item.quantity}</span>
                  <button 
                    className="p-1 hover:bg-black/10 rounded"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <FiPlus className="h-3 w-3" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bill Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-black mb-4">Bill details</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-gray-500 rounded-sm"></span>
                  Items total
                </div>
                <span className="font-medium">₹{itemsTotal}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 border border-gray-400 rounded-sm"></span>
                  Delivery charge <FiInfo className="text-gray-400 h-3.5 w-3.5" />
                </div>
                <span className="font-medium">₹{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 border border-gray-400 rounded-sm"></span>
                  Handling charge <FiInfo className="text-gray-400 h-3.5 w-3.5" />
                </div>
                <span className="font-medium">₹{handlingCharge}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 border border-gray-400 rounded-sm"></span>
                  High demand surge charge <FiInfo className="text-gray-400 h-3.5 w-3.5" />
                </div>
                <span className="font-medium">₹{surgeCharge}</span>
              </div>
              
              <div className="border-t border-dashed my-1"></div>
              
              <div className="flex justify-between text-black font-bold text-base mt-1">
                <div className="flex items-center gap-1.5">
                  Grand total <FiInfo className="text-gray-400 h-3.5 w-3.5" />
                </div>
                <span>₹{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-black mb-2">Cancellation Policy</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
            </p>
          </div>
        </div>

        {/* Bottom Checkout Button */}
        <div className="absolute bottom-0 w-full p-4 bg-[#f8f9fa] border-t">
          <button className="w-full bg-[#FFD000] hover:bg-[#ffdb33] text-black rounded-xl p-4 flex items-center justify-between transition-colors shadow-md">
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg leading-tight">₹{grandTotal}</span>
              <span className="text-[10px] font-bold tracking-wider">TOTAL</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-lg">
              Login to Proceed <FiChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

// Ensure FiChevronRight is imported, we'll need to import it at the top.
