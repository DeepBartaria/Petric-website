import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiMoreHorizontal } from 'react-icons/fi';
import { get } from '../helper/api';

import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';

// Robust address resolver — handles multiple possible backend field shapes
function resolveAddress(booking) {
  // Try plain string fields first
  const candidates = [
    booking.deliveryAddress,
    booking.address,
    booking.userAddress,
    booking.dropAddress,
    booking.location,
  ];

  for (const val of candidates) {
    if (!val) continue;
    if (typeof val === 'string' && val.trim()) return val.trim();
    if (typeof val === 'object') {
      // Build a human-readable string from known sub-fields
      const parts = [
        val.houseNo || val.house || val.flatNo,
        val.building || val.apartment,
        val.street || val.streetAddress || val.line1 || val.address1,
        val.area || val.locality || val.line2 || val.address2,
        val.landmark,
        val.city,
        val.state,
        val.pincode || val.zip || val.postalCode,
      ].filter(Boolean);
      if (parts.length) return parts.join(', ');
    }
  }

  // Last resort: reverse-geocode label if lat/lng were stored
  if (booking.lat && booking.lng) {
    return `Near (${Number(booking.lat).toFixed(4)}, ${Number(booking.lng).toFixed(4)})`;
  }

  return 'Address not available';
}

export default function OrdersSidebar({ isOpen, onClose }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchOrders = async () => {
        setIsLoading(true);
        try {
          const token = localStorage.getItem('petric_token');
          if (!token) return;
          
          const res = await get('booking/list/forUser?type=food', {
            headers: { Authorization: token }
          });
          
          if (res && res.type === 'success' && res.bookings) {
            const formatted = res.bookings.map(b => ({
              id: b.bookingId || b._id.substring(b._id.length - 4),
              date: new Date(b.createdAt).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              }),
              total: b.totalPayable,
              status: b.status || "Delivered",
              items: b.products?.map(p => ({
                id: p.productId?._id || p.productId,
                name: p.productName || p.productId?.name,
                quantity: p.quantity,
                weight: p.variantName || 'N/A',
                price: (p.originalAmount - (p.discountAmount || 0)),
                oldPrice: p.originalAmount,
                img: p.productId?.productImage || p.productImage || product1
              })) || [],
              billing: {
                totalMRP: b.totalPrice,
                couponDiscount: b.couponDiscountedAmount || 0,
                deliveryFee: b.deliveryFee || 0,
                platformFee: b.platformFee || 0,
                amountPaid: b.totalPayable
              },
              deliveryDetails: resolveAddress(b)
            }));
            setOrders(formatted.reverse());
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchOrders();
    } else {
      setSelectedOrder(null);
    }
  }, [isOpen]);

  const handleBack = () => {
    if (selectedOrder) {
      setSelectedOrder(null);
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

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
            <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <FiArrowLeft className="h-6 w-6 text-black" strokeWidth={2.5} />
            </button>
            <h2 className="text-xl font-bold text-black">
              {selectedOrder ? 'Booking Details' : 'My Orders'}
            </h2>
          </div>
          {selectedOrder && (
            <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
              Test
            </div>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-8">
          
          {/* Order List View */}
          {!selectedOrder && isLoading && (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FFD000] border-t-transparent"></div>
            </div>
          )}
          {!selectedOrder && !isLoading && orders.length === 0 && (
            <div className="text-center py-10 text-gray-500 font-medium">
              You haven't placed any orders yet.
            </div>
          )}
          {!selectedOrder && !isLoading && orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#FFD000] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#FFD000] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#FFD000] rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-black text-base">ORDER ID : {order.id}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-sm text-black">₹ {order.total}</span>
                    <span className="text-gray-400 text-xs">•</span>
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {order.items.map((item, idx) => (
                  <div key={idx} className="w-14 h-14 border border-gray-200 rounded-lg p-1">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Order Detail View */}
          {selectedOrder && (
            <div className="flex flex-col gap-4">
              
              {/* Order Info */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-black text-lg">Order</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col">
                  <span className="font-bold text-black">Order Id : {selectedOrder.id}</span>
                  <span className="text-gray-500 text-sm mt-1">{selectedOrder.date}</span>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-black text-lg">Ordered Items</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-4">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 h-20 border border-gray-100 rounded-lg p-1 shrink-0">
                        <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <h4 className="font-bold text-black text-sm leading-snug">{item.name}</h4>
                        <div className="flex items-center gap-3 text-xs text-black font-semibold mt-1">
                          <span>{item.weight}</span>
                          <span>Quantity : {item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="font-bold text-black">₹ {item.price}</span>
                          {item.oldPrice !== item.price && (
                            <span className="text-gray-400 text-xs line-through">₹{item.oldPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Billing Details */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-black text-lg">Billing Details</h3>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
                  <div className="p-4 flex flex-col gap-3 text-sm border-b border-gray-100">
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Total MRP</span>
                      <span className="text-black font-bold">₹ {selectedOrder.billing.totalMRP}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Coupon Discount</span>
                      <span className="text-black font-bold">₹ {selectedOrder.billing.couponDiscount}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Delivery Fee</span>
                      <span className="text-black font-bold">₹ {selectedOrder.billing.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Platform Fee</span>
                      <span className="text-black font-bold">₹ {selectedOrder.billing.platformFee}</span>
                    </div>
                  </div>
                  <div className="p-4 flex justify-between font-bold text-black text-base bg-gray-50 rounded-b-xl">
                    <span>Amount Paid</span>
                    <span>₹ {selectedOrder.billing.amountPaid}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-black text-lg">Delivery Details</h3>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <p className="text-black text-sm font-medium">{selectedOrder.deliveryDetails}</p>
                </div>
              </div>

              {/* Request Invoice Button */}
              <div className="mt-2">
                <button 
                  onClick={() => {
                    const message = `Hello Petric, I would like to request an invoice for my Order ID: ${selectedOrder.id}`;
                    window.open(`https://wa.me/918295756962?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
                  }}
                  className="bg-[#FFD000] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#ffdb33] transition-colors inline-block"
                >
                  Request For Invoice
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </>
  );
}
