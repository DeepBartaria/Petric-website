import React, { useEffect, useState } from 'react';
import NewHomeNavbar from '../components/NewHomeNavbar';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

import headerbg from '../assets/petsproductherobg.png';

import product1 from '../assets/product1.png';
import product2 from '../assets/product2.png';
import product3 from '../assets/product3.png';
import product4 from '../assets/product4.png';

const products = [
  { id: 1, img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", oldPrice: "₹999", discount: "15%" },
  { id: 2, img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹1,200", oldPrice: "₹1,400", discount: "14%" },
  { id: 3, img: product3, name: "Whiskas Adult Dry Cat Food", weight: "1.2 kg", price: "₹450", oldPrice: "₹500", discount: "10%" },
  { id: 4, img: product4, name: "Drools Chicken and Egg Adult", weight: "3 kg", price: "₹650", oldPrice: "₹750", discount: "13%" },
  { id: 5, img: product1, name: "Pedigree Adult Dry Dog Food", weight: "3 kg", price: "₹850", oldPrice: "₹999", discount: "15%" },
  { id: 6, img: product2, name: "Royal Canin Mini Adult", weight: "2 kg", price: "₹1,200", oldPrice: "₹1,400", discount: "14%" },
  { id: 7, img: product3, name: "Whiskas Adult Dry Cat Food", weight: "1.2 kg", price: "₹450", oldPrice: "₹500", discount: "10%" },
  { id: 8, img: product4, name: "Drools Chicken and Egg Adult", weight: "3 kg", price: "₹650", oldPrice: "₹750", discount: "13%" },
];

const categoriesData = [
  {
    title: "Dog Food",
    subcategories: ["Dog Dry Food", "Dry Food", "Dog Wet Food", "Wet Food", "Dog Treats", "Fresh Food", "Puppy Food"]
  },
  {
    title: "Cat Food",
    subcategories: ["Cat Dry Food", "Dry Food", "Cat Wet Food", "Wet Food", "Cat Treats", "Kitten Food"]
  },
  {
    title: "Treats",
    subcategories: ["Dog Treats", "Cat Treats", "Biscuits"]
  },
  {
    title: "Vet Food",
    subcategories: ["Dog Vet Diet", "Cat Vet Diet"]
  },
  {
    title: "Pharmacy",
    subcategories: ["Medicines", "Vitamins & Supplements", "Deworming", "Tick & Fleas", "Gut & Digestion", "Eye & Ear Care", "Cerelac", "Joint Care", "Liver Care", "Skin & Coat Care", "Antibiotics", "Pain & Inflammation", "Cardiac Care", "First Aid", "Urinary & Kidney Care", "Reproductive Care"]
  },
  {
    title: "Cat Litter",
    subcategories: ["Scented Litter", "Unscented Litter", "Odourlock", "Boxes & Scoopers"]
  },
  {
    title: "Essentials",
    subcategories: ["Training Pads", "Bowls", "Hygiene Essentials"]
  },
  {
    title: "Toys",
    subcategories: ["Chew Toys", "Plush Toys", "Squeaky Toys", "Cat Toys"]
  },
  {
    title: "Walking Gears",
    subcategories: ["Harness", "Leash", "Collars"]
  },
  {
    title: "Grooming Products",
    subcategories: ["Dog Shampoos", "Cat Shampoos", "Slicker Brushes", "Medicated Shampoos", "Towels & Wipes"]
  },
  {
    title: "Fish, Birds & more",
    subcategories: ["Aquatic Care", "Small Pets", "Small Feeds"]
  }
];

export default function AllCategories() {
  const [activeCategory, setActiveCategory] = useState("Dog Food");
  const [activeSubcategory, setActiveSubcategory] = useState("Dog Dry Food");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-[#FCFCFC] font-sans flex flex-col relative">
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
      
      {/* Hero Banner */}
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[40vh] sm:h-[60vh] md:h-[70vh] flex items-center" style={{ backgroundImage: `url(${headerbg})` }}>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold balsamiq-sans-bold text-black leading-tight mb-4 max-w-3xl drop-shadow-sm">
            All Categories
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF5757] max-w-xl bg-white/90 p-4 rounded-xl shadow-sm inline-block">
            Everything your pet needs in one place
          </p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12 w-full flex-grow flex flex-col md:flex-row gap-6 md:gap-10">
        
        {/* Mobile Category Selector */}
        <div className="flex md:hidden flex-col gap-3">
          <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden">
            {categoriesData.map((category, idx) => (
              <button 
                key={idx}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors shrink-0 ${activeCategory === category.title ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'}`}
                onClick={() => {
                  setActiveCategory(category.title);
                  setActiveSubcategory(category.subcategories[0] || "");
                }}
              >
                {category.title}
              </button>
            ))}
          </div>
          {/* Mobile Subcategories Selector */}
          <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden">
            {categoriesData.find(c => c.title === activeCategory)?.subcategories.map((sub, i) => (
              <button 
                key={i}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${activeSubcategory === sub ? 'bg-[#FFD000] text-black' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => setActiveSubcategory(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* Left Sidebar: Categories (Desktop) */}
        <div className="hidden md:flex w-full md:w-1/4 lg:w-1/5 shrink-0 flex-col overflow-y-auto max-h-screen pr-2 sticky top-4 custom-scrollbar">
          {categoriesData.map((category, idx) => (
            <div key={idx} className="mb-8">
              <h3 
                className={`text-[13px] font-extrabold uppercase tracking-widest mb-4 cursor-pointer transition-colors ${activeCategory === category.title ? 'text-black' : 'text-gray-800 hover:text-black'}`}
                onClick={() => {
                  setActiveCategory(category.title);
                  setActiveSubcategory(category.subcategories[0] || "");
                }}
              >
                {category.title}
              </h3>
              <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                {category.subcategories.map((sub, i) => (
                  <span 
                    key={i} 
                    onClick={() => {
                      setActiveCategory(category.title);
                      setActiveSubcategory(sub);
                    }}
                    className={`text-sm cursor-pointer transition-colors ${activeCategory === category.title && activeSubcategory === sub ? 'text-[#FFD000] font-bold' : 'text-gray-500 hover:text-[#FFD000]'}`}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Content: Products Grid */}
        <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">
          
          {/* Breadcrumbs & Header */}
          <div className="mb-6 md:mb-8 border-b border-gray-200 pb-4 md:pb-6">
            <div className="text-[10px] md:text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-4 md:mb-6 flex flex-wrap items-center gap-1.5 md:gap-2">
               <span className="cursor-pointer hover:text-black transition-colors">HOMEPAGE</span>
               <span>&gt;</span>
               <span className="cursor-pointer hover:text-black transition-colors">{activeCategory}</span>
               <span>&gt;</span>
               <span className="text-black">{activeSubcategory}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">{activeSubcategory}</h1>
              <div className="flex items-center gap-4">
                 <span className="text-xs text-gray-400 font-bold tracking-wide">PRODUCTS IN CATEGORY: 1365</span>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex justify-end mb-6">
             <span className="text-xs text-gray-500 font-bold tracking-wider cursor-pointer hover:text-black transition-colors">
               SORT BY: <span className="text-black ml-1">POPULARITY ∨</span>
             </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((product, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-2.5 md:p-4 shadow-sm">
                <div className="w-full h-24 md:h-40 flex items-center justify-center bg-gray-50 rounded-xl md:rounded-2xl mb-2 md:mb-4 p-1.5 md:p-2 relative">
                   <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                   <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-[#FF5757] text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm">
                      {product.discount} Off
                   </div>
                </div>
                <div className="flex flex-col flex-grow">
                   <h3 className="font-bold text-black text-[11px] md:text-sm line-clamp-2 mb-1">{product.name}</h3>
                   <span className="text-[10px] md:text-xs text-gray-500 mb-2">{product.weight}</span>
                   <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                         <span className="text-gray-400 text-[9px] md:text-[10px] line-through">{product.oldPrice}</span>
                         <span className="font-bold text-black text-sm md:text-lg">{product.price}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                        className="bg-[#FFD000] text-black text-[10px] md:text-sm font-bold px-2.5 md:px-6 py-1 md:py-2 rounded-lg md:rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all"
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

      {/* Footer Sections */}
      <div className="bg-white w-full">
        <Benefit />
        <WhyTrustUs />
        <OffersBanner />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}
