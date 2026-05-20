import React, { useRef ,useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import OrdersSidebar from '../components/OrdersSidebar';
import OrdersFloatingButton from '../components/OrdersFloatingButton';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import BottomPopup from '../components/BottomPopup';
import VariantPopup from '../components/VariantPopup';
import { FiChevronRight, FiChevronDown, FiGift, FiShield, FiStar} from 'react-icons/fi';
import { get } from '../helper/api';
import { logPageVisit } from '../helper/analytics';

import banner1 from '../assets/banner/homepage.png';
import banner2 from '../assets/banner/oldimg.png';
import banner3 from '../assets/banner/newimg.png';

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
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isVariantPopupOpen, setIsVariantPopupOpen] = useState(false);
  const [variantPopupProduct, setVariantPopupProduct] = useState(null);
  const [homePageSections, setHomePageSections] = useState([]);
  const [brands, setBrands] = useState([]);
  const brandsScrollRef = useRef(null);
  const [brandsScrollPos, setBrandsScrollPos] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('petric_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    logPageVisit('Visited Home page');
  }, []);

  useEffect(() => {
    const fetchHomePageProducts = async () => {
      try {
        const response = await get('home-page/products');
        if (response && response.type === 'success' && response.homePageProductsData) {
          const parsedSections = response.homePageProductsData.map(section => ({
            title: section.title,
            products: [...section.products]
              .sort((a, b) => {
                // Best Seller first
                if (a.isBestSeller && !b.isBestSeller) return -1;
                if (!a.isBestSeller && b.isBestSeller) return 1;

                // Then Best Available
                if (a.isBestAvailable && !b.isBestAvailable) return -1;
                if (!a.isBestAvailable && b.isBestAvailable) return 1;

                // Remaining products old -> new
                return new Date(a.createdAt) - new Date(b.createdAt);
              }).map(p => {
              const variants = p.variants?.map(v => ({
                id: v._id,
                weight: v.name,
                price: `₹${v.discountedPrice}`,
                oldPrice: `₹${v.originalPrice}`,
                discount: Math.round(((v.originalPrice - v.discountedPrice) / v.originalPrice) * 100) + '%'
              })) || [];

              const defaultVariant = variants[0] || {};

              return {
                id: p._id,
                img: p.productImage,
                name: p.name,
                weight: defaultVariant.weight || '',
                price: defaultVariant.price || '',
                oldPrice: defaultVariant.oldPrice || '',
                discount: defaultVariant.discount || '',
                variants: variants,
                isBestSeller: p.isBestSeller,
                isBestAvailable: p.isBestAvailable,
                createdAt: p.createdAt
              };
            })
          }));

          setHomePageSections(parsedSections);
        }
      } catch (error) {
        console.error("Error fetching home page products:", error);
      }
    };

    fetchHomePageProducts();
  }, []);
  
  const fetchBrands = async () => {
    try {
      const response = await get('product/brand');

      if (response && response.productBrands) {
        const formattedBrands = response.productBrands
          .sort((a, b) => (a.order || 999) - (b.order || 999))
          .map((brand) => ({
            id: brand._id,
            img: brand.image,
            alt: brand.name,
            name: brand.name,
          }));

        setBrands(formattedBrands);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  fetchBrands();

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
      <BottomPopup />
      <NewHomeNavbar />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <OrdersSidebar
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      <CartFloatingButton
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        isOrdersOpen={isOrdersOpen}
        onClick={() => setIsCartOpen(true)}
      />

      <OrdersFloatingButton
        isCartOpen={isCartOpen}
        isOrdersOpen={isOrdersOpen}
        onClick={() => setIsOrdersOpen(true)}
      />

      <VariantPopup
        isOpen={isVariantPopupOpen}
        onClose={() => setIsVariantPopupOpen(false)}
        product={variantPopupProduct}
        onAddToCart={handleAddToCart}
      />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Top Banners Section */}
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
          <div className="col-span-2 bg-[#D9D9D9] rounded-[2rem] h-[500px] w-full overflow-hidden relative cursor-pointer group">
            <img src={banner1} alt="Banner 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="grid grid-rows-2 gap-6 h-[500px]">
            <div className="bg-[#D9D9D9] rounded-[2rem] w-full h-full overflow-hidden relative cursor-pointer group">
              <img src={banner2} alt="Banner 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="bg-[#D9D9D9] rounded-[2rem] w-full h-full overflow-hidden relative cursor-pointer group">
              <img src={banner3} alt="Banner 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* Mobile View - Sliding Cards */}
        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-4 mb-10 pb-2">
          <div className="bg-[#D9D9D9] rounded-[2rem] h-[200px] sm:h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer group">
            <img src={banner1} alt="Banner 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
          </div>
          <div className="bg-[#D9D9D9] rounded-[2rem] h-[200px] sm:h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer group">
            <img src={banner2} alt="Banner 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
          </div>
          <div className="bg-[#D9D9D9] rounded-[2rem] h-[200px] sm:h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer group">
            <img src={banner3} alt="Banner 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100" />
          </div>
        </div>

        {/* Shop by Brands */}
        <div className="mb-14">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-black transition-colors duration-300 hover:text-gray-700 cursor-pointer">Shop by Brands</h2>
            <Link to="/all-brands" className="text-base text-black underline underline-offset-4 decoration-1 transition-all duration-300 hover:text-gray-600 hover:underline-offset-2">See all</Link>
          </div>

          {/* ── DESKTOP: single scrollable row ── */}
          <div className="hidden md:flex items-center gap-2">
            {brandsScrollPos > 0 && (
              <button
                onClick={() => brandsScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                className="shrink-0 bg-black text-white p-1 rounded-full flex items-center justify-center h-8 w-8 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FiChevronRight
                  className="h-5 w-5 text-[#FFD000] rotate-180"
                  strokeWidth={3}
                />
              </button>
            )}

            <div className="relative flex-1 overflow-hidden">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />
              {brandsScrollPos > 0 && (
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
              )}
              <div
                ref={brandsScrollRef}
                onScroll={(e) => setBrandsScrollPos(e.target.scrollLeft)}
                className="flex items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2"
              >
                {brands.map((brand, i) => (
                  <Link
                    key={i}
                    to={`/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="relative shrink-0 flex flex-col items-center justify-center gap-2 w-24 cursor-pointer group"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                      <img src={brand.img} alt={brand.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    {brand.alt && (
                      <span className="text-[11px] font-medium text-gray-600 text-center truncate w-full">{brand.alt}</span>
                    )}
                    {brand.discount && (
                      <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full leading-none">
                        {brand.discount} off
                      </span>
                    )}
                  </Link>
                ))}
                <div className="shrink-0 w-10" />
              </div>
            </div>

            <button
              onClick={() => brandsScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
              className="shrink-0 bg-black text-white p-1 rounded-full flex items-center justify-center h-8 w-8 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <FiChevronRight className="h-5 w-5 text-[#FFD000]" strokeWidth={3} />
            </button>
          </div>

          {/* ── MOBILE: two scrollable rows ── */}
          <div className="md:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-4 pb-2" style={{ width: 'max-content' }}>
              {/* Row 1 — odd-indexed brands */}
              <div className="flex gap-4 px-2">
                {brands.filter((_, i) => i % 2 === 0).map((brand, i) => (
                  <Link
                    key={i}
                    to={`/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="flex flex-col items-center gap-1.5 w-[72px] shrink-0 cursor-pointer group"
                  >
                    <div className="w-[72px] h-[72px] rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95">
                      <img src={brand.img} alt={brand.alt} className="w-full h-full object-cover" />
                    </div>
                    {brand.alt && (
                      <span className="text-[11px] font-medium text-gray-600 text-center truncate w-full">{brand.alt}</span>
                    )}
                    {brand.discount && (
                      <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full leading-none">
                        {brand.discount} off
                      </span>
                    )}
                  </Link>
                ))}
              </div>
              {/* Row 2 — even-indexed brands */}
              <div className="flex gap-4 px-2">
                {brands.filter((_, i) => i % 2 === 1).map((brand, i) => (
                  <Link
                    key={i}
                    to={`/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="flex flex-col items-center gap-1.5 w-[72px] shrink-0 cursor-pointer group"
                  >
                    <div className="w-[72px] h-[72px] rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95">
                      <img src={brand.img} alt={brand.alt} className="w-full h-full object-cover" />
                    </div>
                    {brand.alt && (
                      <span className="text-[10px] font-medium text-gray-600 text-center truncate w-full">{brand.alt}</span>
                    )}
                    {brand.discount && (
                      <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full leading-none">
                        {brand.discount} off
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Personalized Welcome Banner */}
        <div className="mb-14 bg-[#FFD000] border border-black/15 rounded-[2rem] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col xl:flex-row items-center gap-4 md:gap-6 w-full xl:w-auto shrink-0">
            <h2 className="text-2xl md:text-4xl font-black text-black leading-tight text-center xl:text-left">
              Hello, Pet Parent 👋🏻
            </h2>
            {!user ? (
              <button 
                onClick={() => window.dispatchEvent(new CustomEvent('openCart', { detail: { step: 'mobile' } }))}
                className="bg-black text-white px-6 md:px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-md w-full sm:w-auto shrink-0"
              >
                Sign up and get...
              </button>
            ) : (
              <Link
                to="/all-categories"
                className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 hover:-translate-y-1 transition-all duration-300 shadow-md inline-flex items-center justify-center"
              >
                Start Shopping
              </Link>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-stretch gap-4 w-full xl:w-auto">
            {/* Autoship Card */}
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 flex-1 shadow-md border-2 border-black/10 hover:border-[#FFD000] hover:-translate-y-1 transition-all duration-300 cursor-pointer group min-w-0 w-full">
              <div className="bg-[#FFF4B8] border border-black/10 text-black p-3 rounded-xl group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <FiStar className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-black text-[13px] md:text-sm">upto 35% off on <br /> selected brands</span>
              </div>
            </div>

            {/* Pharmacy Card */}
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 flex-1 shadow-md border-2 border-black/10 hover:border-[#FFD000] hover:-translate-y-1 transition-all duration-300 cursor-pointer group min-w-0 w-full">
              <div className="bg-[#FFF4B8] border border-black/10 text-black p-3 rounded-xl group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <FiGift className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-black text-[13px] md:text-sm">Exclusive offers just for you </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Sections from API */}
        {homePageSections.map((section, idx) => (
          <div key={idx} className="mb-14">
            <h2 className="text-2xl font-bold text-black mb-6">{section.title}</h2>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
              {section.products.map((product, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="bg-white rounded-3xl w-[45vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-3 md:p-4 shadow-sm"
                >
                  
                  <div className="w-full h-28 md:h-40 flex items-center justify-center bg-gray-50 rounded-xl mb-3 md:mb-4 p-1 md:p-2 relative">

                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">

                      {product.isBestSeller && (
                        <div className="bg-black text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          Best Seller
                        </div>
                      )}

                      {!product.isBestSeller && product.isBestAvailable && (
                        <div className="bg-green-600 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          Best Available
                        </div>
                      )}

                      {product.discount && product.discount !== '0%' && (
                        <div className="bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                          {product.discount} Off
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-black text-xs md:text-sm line-clamp-2 mb-0.5 md:mb-1">{product.name}</h3>
                    <div
                      className={`text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2 flex items-center gap-1 w-fit ${product.variants && product.variants.length > 1 ? 'cursor-pointer hover:text-gray-800 bg-gray-50 hover:bg-gray-100 px-1.5 py-0.5 rounded' : ''}`}
                      onClick={(e) => {
                        if (product.variants && product.variants.length > 1) {
                          e.stopPropagation();
                          setVariantPopupProduct(product);
                          setIsVariantPopupOpen(true);
                        }
                      }}
                    >
                      {product.weight}
                      {product.variants && product.variants.length > 1 && <FiChevronDown className="w-3 h-3" />}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex flex-col">
                        {product.oldPrice && product.oldPrice !== product.price && (
                          <span className="text-gray-400 text-[9px] md:text-[10px] line-through">{product.oldPrice}</span>
                        )}
                        <span className="font-bold text-black text-sm md:text-lg">{product.price}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (product.variants && product.variants.length > 1) {
                            setVariantPopupProduct(product);
                            setIsVariantPopupOpen(true);
                          } else {
                            handleAddToCart(product);
                          }
                        }}
                        className="bg-[#FFD000] text-black text-[10px] md:text-sm font-bold px-2 md:px-6 py-1 md:py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all"
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

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
