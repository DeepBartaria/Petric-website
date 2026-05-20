import React, { useState, useEffect } from 'react';
import { get } from '../helper/api';
import { Link, useNavigate } from 'react-router-dom';
import { logPageVisit } from '../helper/analytics';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
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
  const navigate = useNavigate();
  const [reorderProducts, setReorderProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    logPageVisit('Visited Reorder page');
    const fetchReorderProducts = async () => {
      const token = localStorage.getItem('petric_token');
      if (!token) {
        setReorderProducts([]);
        setIsLoading(false);
        return;
      }
      try {
        const res = await get('product/list/reorder/products', {
          headers: { Authorization: token }
        });

        if (res && res.type === 'success' && Array.isArray(res.products)) {
          const formatted = res.products.map((p) => {
            const firstVariant = p.variants?.[0];
            const price = firstVariant?.discountedPrice
              ?? firstVariant?.originalPrice
              ?? p.originalPrice;
            return {
              id: p._id,
              img: p.productImage || product1,
              name: p.name,
              weight: firstVariant?.name || '',
              price: price != null ? `₹${price}` : '',
              qty: 1,
            };
          });
          setReorderProducts(formatted);
        } else {
          setReorderProducts([]);
        }
      } catch (e) {
        console.error("Error fetching reorder products", e.response?.data || e);
        setReorderProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReorderProducts();
  }, []);

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
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col relative">
      <NewHomeNavbar />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <CartFloatingButton
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16 w-full flex-grow">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black border-l-4 border-[#FFD000] pl-4">
            Buy Again
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFD000] border-t-transparent"></div>
          </div>
        ) : reorderProducts.length === 0 ? (
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
              <div 
                key={i} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white border border-gray-100 rounded-3xl p-3 md:p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-24 md:h-36 flex items-center justify-center bg-gray-50 rounded-2xl mb-3 p-2 relative">
                  <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-black text-xs md:text-sm line-clamp-2 mb-1 group-hover:text-[#FFD000] transition-colors cursor-pointer">{product.name}</h3>
                  <span className="text-[10px] md:text-xs text-gray-500 mb-2">{product.weight}</span>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-black text-sm md:text-lg">{product.price}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                      className="bg-[#FFD000] text-black text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[#ffdb33] hover:scale-105 transition-all shadow-sm"
                    >
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