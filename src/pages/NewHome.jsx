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
import ProductSkeletonCard from '../components/ProductSkeletonCard';
import { FiChevronDown, FiChevronRight, FiStar, FiGift, FiPercent, FiAward, FiClock } from "react-icons/fi";
import { get } from '../helper/api';
import useCart from '../hooks/useCart';
import useProductCoupons from '../hooks/useProductCoupons';
import { logActivity } from '../helper/analytics';


import banner1 from '../assets/main_banner1.webp';
import banner2 from '../assets/main_banner2.webp';
import banner3 from '../assets/main_banner3.webp';
import tempImg from '../assets/tempimg.png';

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
  const [isHomeLoading, setIsHomeLoading] = useState(true);

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
      } finally {
        setIsHomeLoading(false);
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

    // logActivity(
    //   `User added to Cart ${product?.name || ''}`,
    //   'Web_HomeProdtoCart'
    // );
  };

  const handleOpenProduct = (product) => {
    navigate(`/product/${product.id}`);

    // logActivity(
    //   `User Open ${product?.name || ''}`,
    //   'Web_HomepageProdOpen'
    // );
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
        {isHomeLoading ? (
          <div className="mb-14">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
            <div className="flex gap-3 md:gap-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-5 pt-2 px-1 md:px-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductSkeletonCard key={i} mobileMode="carousel" desktopMode="carousel" className="md:w-[260px] lg:w-[280px] md:max-w-[280px]" />
              ))}
            </div>
          </div>
        ) : topHomeSection && (
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
            </div>
          </div>
        </div>
        {/* Personalized Welcome Banner */}
        {!user && (
          <div className="mb-14 bg-gradient-to-br from-[#FFD000] via-[#FFDF33] to-[#FFF0B3] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl border border-yellow-300/40 relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="flex flex-row items-center lg:items-start justify-center lg:justify-start gap-5 md:gap-8 w-full lg:w-auto shrink-0 relative z-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden border-[3px] md:border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] bg-white relative group">
                <img src={tempImg} alt="Pet" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-col items-start gap-3 md:gap-5 text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-black leading-[1.1] tracking-tight font-black drop-shadow-sm">
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
                  className="inline-flex h-10 md:h-12 min-w-[130px] md:min-w-[160px] items-center justify-center rounded-full bg-white px-6 md:px-8 text-[13px] md:text-[15px] font-black text-black shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] hover:text-[#FF5757] mt-1 ring-1 ring-black/5"
                >
                  SIGN IN NOW!
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 w-full max-w-sm lg:w-[340px] shrink-0 self-center lg:self-center relative z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-3.5 flex items-center gap-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] cursor-pointer group">
                <div className="bg-[#FFF4B8] p-2 rounded-full group-hover:bg-[#FFD000] transition-colors duration-300">
                  <FiPercent className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-gray-800 text-[14px] md:text-[15px] leading-tight">
                  Upto 30% off on <br /> selected brand.
                </span>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-3.5 flex items-center gap-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] cursor-pointer group">
                <div className="bg-[#FFF4B8] p-2 rounded-full group-hover:bg-[#FFD000] transition-colors duration-300">
                  <FiAward className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-gray-800 text-[14px] md:text-[15px] leading-tight">
                  Exclusive members <br /> only deals.
                </span>
              </div>

              <div className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-3.5 flex items-center gap-4 shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-white/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] cursor-pointer group">
                <div className="bg-[#FFF4B8] p-2 rounded-full group-hover:bg-[#FFD000] transition-colors duration-300">
                  <FiClock className="w-5 h-5 text-black shrink-0" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-gray-800 text-[14px] md:text-[15px] leading-tight">
                  Early access to <br /> all future sales
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Sections from API */}
        {isHomeLoading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx} className="mb-14">
              <div className="h-8 w-48 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-1 md:px-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductSkeletonCard key={i} mobileMode="carousel" desktopMode="grid" />
                ))}
              </div>
            </div>
          ))
        ) : remainingHomeSections.map((section, idx) => {
          const isBestOffers = section.title.toLowerCase().includes('best offers');
          return (
          <div key={idx} className="mb-14">
            <h2 className="text-2xl font-bold text-black mb-6">{section.title}</h2>
            <div
              className={`flex md:grid ${
                isBestOffers
                  ? (section.products.length <= 8 ? 'md:grid-cols-8' : 'md:grid-flow-col md:grid-rows-2 md:auto-cols-[minmax(110px,130px)] lg:auto-cols-[minmax(120px,140px)]')
                  : (section.products.length <= 8 ? 'md:grid-cols-4' : 'md:grid-flow-col md:grid-rows-2 md:auto-cols-[minmax(220px,260px)] lg:auto-cols-[minmax(240px,280px)]')
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
        )})}

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