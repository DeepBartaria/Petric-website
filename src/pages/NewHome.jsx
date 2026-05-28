import React, { useRef ,useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import CartAnimationLayer from '../components/CartAnimationLayer';
import useCartAnimation from '../hooks/useCartAnimation';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import BottomPopup from '../components/BottomPopup';
import VariantPopup from '../components/VariantPopup';
import ProductCard from '../components/ProductCard';
import { FiChevronDown, FiChevronRight, FiStar, FiGift } from "react-icons/fi";
import { get } from '../helper/api';
import useCart from '../hooks/useCart';
import useProductCoupons from '../hooks/useProductCoupons';
import { logActivity } from '../helper/analytics';


import banner1 from '../assets/main_banner1.webp';
import banner2 from '../assets/main_banner2.webp';
import banner3 from '../assets/main_banner3.webp';

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
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    pendingCartProduct,
    setPendingCartProduct,
    addProductToCart,
    handleUpdateQuantity,
    handleLoginSuccess: cartHandleLoginSuccess,
  } = useCart();

  const { cartRef, flyItems, toasts, cartShake, triggerFlyToCart, onFlyComplete, dismissToast } =
    useCartAnimation();

  const productCoupons = useProductCoupons();  

  const [isVariantPopupOpen, setIsVariantPopupOpen] = useState(false);
  const [variantPopupProduct, setVariantPopupProduct] = useState(null);
  const [homePageSections, setHomePageSections] = useState([]);

  const [shopCategories, setShopCategories] = useState([]);
  const categoriesScrollRef = useRef(null);
  const [categoriesScrollPos, setCategoriesScrollPos] = useState(0);

  const [brands, setBrands] = useState([]);
  const brandsScrollRef = useRef(null);
  const [brandsScrollPos, setBrandsScrollPos] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('petric_user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleOpenCart = () => {
      setIsCartOpen(true);
    };

    window.addEventListener('openCart', handleOpenCart);

    return () => {
      window.removeEventListener('openCart', handleOpenCart);
    };
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
                unit: v.unit || '',
                originalPrice: v.originalPrice,
                discountedPrice: v.discountedPrice,
                price: `₹${v.discountedPrice}`,
                oldPrice: `₹${v.originalPrice}`,
                discount: Math.round(((v.originalPrice - v.discountedPrice) / v.originalPrice) * 100) + '%'
              })) || [];

              const defaultVariant = variants[0] || {};

              return {
                id: p._id,
                productId: p._id,
                variantId: defaultVariant.id || null,
                variantName: defaultVariant.weight || '',
                unit: defaultVariant.unit || '',
                img: p.productImage,
                name: p.name,
                description: p.description || '',
                weight: defaultVariant.weight || '',
                price: defaultVariant.price || '',
                oldPrice: defaultVariant.oldPrice || '',
                originalPrice: defaultVariant.originalPrice,
                discountedPrice: defaultVariant.discountedPrice,
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

  useEffect(() => {
    const fetchShopCategories = async () => {
      try {
        const response = await get('product/category');

        if (response?.categories) {
          const formattedCategories = response.categories
            .sort((a, b) => (a.order || 999) - (b.order || 999))
            .map((category) => ({
              id: category._id,
              name: category.name,
              img: category.categoryImage || category.image || '',
            }));

          setShopCategories(formattedCategories);
        }
      } catch (error) {
        console.error('Error fetching shop categories:', error);
      }
    };

    fetchShopCategories();
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

  useEffect(() => {
    fetchBrands();
  }, []);




  const handleAddToCart = (product) => {
    addProductToCart(product);

    logActivity(
      `User added to Cart ${product?.name || ''}`,
      'Web_HomeProdtoCart'
    );
  };

  const handleOpenProduct = (product) => {
    navigate(`/product/${product.id}`);

    logActivity(
      `User Open ${product?.name || ''}`,
      'Web_HomepageProdOpen'
    );
  };

  const handleOpenVariants = (product) => {
    setVariantPopupProduct(product);
    setIsVariantPopupOpen(true);
    logActivity(
      `USer View Variant ${product?.name || ''}`,
      'Web_HomepageProdVariants'
    );
  };

  // const handleOpenProduct = (product) => {
  //   sessionStorage.setItem('petric_home_scroll_y', String(window.scrollY));
  //   navigate(`/product/${product.id}`);
  // };

  // const handleOpenVariants = (product) => {
  //   setVariantPopupProduct(product);
  //   setIsVariantPopupOpen(true);
  // };

  const handleLoginSuccess = async () => {
    const storedUser = localStorage.getItem('petric_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    await cartHandleLoginSuccess();
  };

  const topHomeSection = homePageSections[0];
  const remainingHomeSections = homePageSections.slice(1); 

  return (
    <div className="min-h-screen bg-white font-sans relative">

      <BottomPopup />
      <NewHomeNavbar />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => {
          setIsCartOpen(false);
        }}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onLoginSuccess={handleLoginSuccess}
        loginBackCloses={Boolean(pendingCartProduct)}
      />

      <CartFloatingButton
        ref={cartRef}
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        shake={cartShake}
        onClick={() => setIsCartOpen(true)}
      />

      <CartAnimationLayer
        flyItems={flyItems}
        toasts={toasts}
        onFlyComplete={onFlyComplete}
        onDismissToast={dismissToast}
      />

      <VariantPopup
        isOpen={isVariantPopupOpen}
        onClose={() => setIsVariantPopupOpen(false)}
        product={variantPopupProduct}
        onAddToCart={handleAddToCart}
        onAnimateToCart={triggerFlyToCart}
      />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Top Banners Section */}
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-12">
          <div
            onClick={() => logActivity('Click HomePageBanner Banner 1', 'Click_HomePageBanner')}
            className="col-span-2 bg-[#D9D9D9] rounded-[2rem] h-[500px] w-full overflow-hidden relative group cursor-pointer"
          >
            <img src={banner1} alt="Banner 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
          <div className="grid grid-rows-2 gap-6 h-[500px]">
            <div
              onClick={() => logActivity('Click HomePageBanner Banner 2', 'Click_HomePageBanner')}
              className="bg-[#D9D9D9] rounded-[2rem] w-full h-full overflow-hidden relative group cursor-pointer"
            >
              <img src={banner2} alt="Banner 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div
              onClick={() => logActivity('Click HomePageBanner Banner 3', 'Click_HomePageBanner')}
              className="bg-[#D9D9D9] rounded-[2rem] w-full h-full overflow-hidden relative group cursor-pointer"
            >
              <img src={banner3} alt="Banner 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-4 mb-10 pb-2">
          <div
            onClick={() => logActivity('Click HomePageBanner Banner 1', 'Click_HomePageBanner')}
            className="bg-[#D9D9D9] rounded-[2rem] h-[200px] sm:h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer"
          >
            <img src={banner1} alt="Banner 1" className="w-full h-full object-cover" />
          </div>
          <div
            onClick={() => logActivity('Click HomePageBanner Banner 2', 'Click_HomePageBanner')}
            className="bg-[#D9D9D9] rounded-[2rem] h-[200px] sm:h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer"
          >
            <img src={banner2} alt="Banner 2" className="w-full h-full object-cover" />
          </div>
          <div
            onClick={() => logActivity('Click HomePageBanner Banner 3', 'Click_HomePageBanner')}
            className="bg-[#D9D9D9] rounded-[2rem] h-[200px] sm:h-[300px] w-[85vw] shrink-0 snap-center overflow-hidden relative cursor-pointer"
          >
            <img src={banner3} alt="Banner 3" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mb-14">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-black transition-colors duration-300 hover:text-gray-700 cursor-pointer">
              Shop by Category
            </h2>

            <Link
              to="/all-categories"
              className="text-base text-black underline underline-offset-4 decoration-1 transition-all duration-300 hover:text-gray-600 hover:underline-offset-2"
            >
              See all
            </Link>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-2">
            {categoriesScrollPos > 0 && (
              <button
                onClick={() => categoriesScrollRef.current?.scrollBy({ left: -220, behavior: 'smooth' })}
                className="shrink-0 bg-white hover:bg-gray-50 border border-gray-200 text-black p-1 rounded-full flex items-center justify-center h-8 w-8 shadow-sm transition-all duration-200 hover:scale-110"
              >
                <FiChevronRight className="h-4 w-4 rotate-180" strokeWidth={2.5} />
              </button>
            )}

            <div className="relative flex-1 overflow-hidden">
              <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />

              {categoriesScrollPos > 0 && (
                <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
              )}

              <div
                ref={categoriesScrollRef}
                onScroll={(e) => setCategoriesScrollPos(e.target.scrollLeft)}
                className="flex items-center gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2"
              >
                {shopCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    state={{ categoryName: category.name }}
                    onClick={() => logActivity(`Click HomePageCategory ${category.name}`, 'Web_HomeCategory')} 
                    className="relative shrink-0 flex flex-col items-center justify-center gap-3 w-44 cursor-pointer group"
                  >
                    <div className="w-44 h-44 rounded-full overflow-hidden bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                      {category.img ? (
                        <img
                          src={category.img}
                          alt={category.name}
                          className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <span className="text-3xl font-black text-gray-300">
                          {category.name?.charAt(0)}
                        </span>
                      )}
                    </div>

                    <span className="text-sm font-semibold text-gray-700 text-center truncate w-full">
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => categoriesScrollRef.current?.scrollBy({ left: 220, behavior: 'smooth' })}
              className="shrink-0 bg-black text-white p-1 rounded-full flex items-center justify-center h-8 w-8 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <FiChevronRight className="h-5 w-5 text-[#FFD000]" strokeWidth={3} />
            </button>
          </div>

          {/* MOBILE */}
          <div className="md:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-4 px-2 pb-2" style={{ width: 'max-content' }}>
              {shopCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  state={{ categoryName: category.name }}
                  onClick={() => logActivity(`Click HomePageCategory ${category.name}`, 'Web_HomeCategory')}
                  className="flex flex-col items-center gap-2 w-32 shrink-0 cursor-pointer group"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-50 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 flex items-center justify-center">
                    {category.img ? (
                      <img
                        src={category.img}
                        alt={category.name}
                        className="w-full h-full object-contain p-1.5"
                      />
                    ) : (
                      <span className="text-2xl font-black text-gray-300">
                        {category.name?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-gray-600 text-center truncate w-full">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* First Backend Product Section */}
        {topHomeSection && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-black mb-6">
              {topHomeSection.title}
            </h2>

            <div className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-5 pt-2 px-1 md:px-2">
              {topHomeSection.products.map((product, i) => (
                <ProductCard
                  key={product.id || i}
                  product={product}
                  coupons={productCoupons}
                  mobileMode="carousel"
                  desktopMode="carousel"
                  onOpenProduct={handleOpenProduct}
                  onAddToCart={handleAddToCart}
                  onOpenVariants={handleOpenVariants}
                  onAnimateToCart={triggerFlyToCart}
                  className="md:w-[260px] lg:w-[280px] md:max-w-[280px]"
                />
              ))}
            </div>
          </div>
        )}

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
                className="shrink-0 bg-white hover:bg-gray-50 border border-gray-200 text-black p-1 rounded-full flex items-center justify-center h-8 w-8 shadow-sm transition-all duration-200 hover:scale-110"
              >
                <FiChevronRight className="h-4 w-4 rotate-180" strokeWidth={2.5} />
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
                    onClick={() => logActivity(`Click HomePageBrands ${brand.name}`, 'Web_ViewBrands')}
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
                    onClick={() => logActivity(`Click HomePageBrands ${brand.name}`, 'Web_ViewBrands')}
                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group w-[calc((100vw-80px)/3.5)] max-w-[110px]"
                  >
                    <div className="rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 w-[calc((100vw-80px)/3.5)] h-[calc((100vw-80px)/3.5)] max-w-[110px] max-h-[110px]">
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
                    onClick={() => logActivity(`Click HomePageBrands ${brand.name}`, 'Web_ViewBrands')}
                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group w-[calc((100vw-80px)/3.5)] max-w-[110px]"
                  >
                    <div className="rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 w-[calc((100vw-80px)/3.5)] h-[calc((100vw-80px)/3.5)] max-w-[110px] max-h-[110px]">
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
        {!user && (
          <div className="mb-14 bg-[#FFD000] border border-black/15 rounded-[2rem] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 w-full lg:w-auto shrink-0 text-center sm:text-left">
              <h2 className="text-2xl md:text-4xl font-black text-black leading-tight">
                Hello, <br /> Pet Parent! 👋
              </h2>

              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('openCart', {
                      detail: { step: 'mobile', mode: 'loginOnly' },
                    })
                  )
                }
                className="inline-flex h-11 min-w-[120px] items-center justify-center rounded-full bg-black px-7 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800"
              >
                Sign In
              </button>
            </div>

            <div className="flex flex-col md:flex-row items-stretch gap-4 w-full xl:w-auto">
              <div className="bg-white rounded-2xl p-4 flex items-center gap-4 flex-1 shadow-md border-2 border-black/10 hover:border-[#FFD000] hover:-translate-y-1 transition-all duration-300 cursor-pointer group min-w-0 w-full">
                <div className="bg-[#FFF4B8] border border-black/10 text-black p-3 rounded-xl group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <FiStar className="w-6 h-6" />
                </div>

                <div className="flex flex-col">
                  <span className="font-extrabold text-black text-[13px] md:text-sm">
                    upto 35% off on <br /> selected brands
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 flex items-center gap-4 flex-1 shadow-md border-2 border-black/10 hover:border-[#FFD000] hover:-translate-y-1 transition-all duration-300 cursor-pointer group min-w-0 w-full">
                <div className="bg-[#FFF4B8] border border-black/10 text-black p-3 rounded-xl group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                  <FiGift className="w-6 h-6" />
                </div>

                <div className="flex flex-col">
                  <span className="font-extrabold text-black text-[13px] md:text-sm">
                    Exclusive offers just for you
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Sections from API */}
        {remainingHomeSections.map((section, idx) => (
          <div key={idx} className="mb-14">
            <h2 className="text-2xl font-bold text-black mb-6">{section.title}</h2>
            <div
              className={`flex md:grid ${
                section.products.length <= 8
                  ? 'md:grid-cols-4'
                  : 'md:grid-flow-col md:grid-rows-2 md:auto-cols-[minmax(220px,260px)] lg:auto-cols-[minmax(240px,280px)]'
              } gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-1 md:px-2 md:pb-5`}
            >
              {section.products.map((product, i) => (
                <ProductCard
                  key={product.id || i}
                  product={product}
                  coupons={productCoupons}
                  mobileMode="carousel"
                  onOpenProduct={handleOpenProduct}
                  onAddToCart={handleAddToCart}
                  onOpenVariants={handleOpenVariants}
                  onAnimateToCart={triggerFlyToCart}
                />
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