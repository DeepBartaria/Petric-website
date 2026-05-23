import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { get, post } from '../helper/api';
import { FiChevronDown, FiMinus, FiPlus } from "react-icons/fi";
import headerbg from '../assets/petsproductherobg.png';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { logPageVisit } from '../helper/analytics';
const LIMIT = 20;

export default function AllCategories() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');
  const brandId = searchParams.get('brandId');
  const brandName = searchParams.get('brandName');

  // const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    pendingCartProduct,
    addProductToCart,
    handleUpdateQuantity,
    handleLoginSuccess,
  } = useCart();

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  useEffect(() => {
    const handleResetCategories = () => {
      setActiveCategory(null);
      setActiveSubcategory(null);
    };
    window.addEventListener('resetCategories', handleResetCategories);
    return () => window.removeEventListener('resetCategories', handleResetCategories);
  }, []);

  // const [cartItems, setCartItems] = useState([]);

  const [categoriesData, setCategoriesData] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  
  const [expandedCategory, setExpandedCategory] = useState(null);

  const sentinelRef = useRef(null);
  const fetchKeyRef = useRef(0);
  // Refs for scrolling category/subcategory pills to active position on mobile
  const mobileCategoryScrollRef = useRef(null);
  const mobileSubcategoryScrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [catRes, subRes] = await Promise.all([
        get('product/category'),
        get('product/subCategory')
      ]);

      if (catRes?.categories && subRes?.subCategories) {
        const combined = catRes.categories.map(c => ({
          _id: c._id,
          name: c.name,
          img: c.categoryImage || c.image || '',
          subcategories: subRes.subCategories.filter(s => s.category?._id === c._id)
        }));

        setCategoriesData(combined);
        if (combined.length > 0 && !searchQuery && !brandId) {
          // No longer automatically setting activeCategory to show category grid
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      logPageVisit(`Searched for products: "${searchQuery}"`);
    } else if (brandName) {
      logPageVisit(`Visited brand products page: ${brandName}`);
    } else if (activeCategory) {
      const description = activeSubcategory
        ? `Visited category: ${activeCategory.name} > ${activeSubcategory.name}`
        : `Visited category: ${activeCategory.name}`;
      logPageVisit(description);
    }
  }, [activeCategory, activeSubcategory, searchQuery, brandId, brandName]);

  useEffect(() => {
    if (activeCategory || searchQuery || brandId) {
      setProducts([]);
      setCurrentPage(1);
      setTotalPages(1);
      fetchKeyRef.current += 1;
      fetchProducts(1, true, fetchKeyRef.current);
    }
  }, [activeCategory, activeSubcategory, searchQuery, brandId]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage, false, fetchKeyRef.current);
    }
  }, [currentPage]);

  const fetchProducts = async (page, isReset, fetchKey) => {
    if (isReset) {
      setIsInitialLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const body = { page, limit: LIMIT };

      if (searchQuery) {
        body.search = searchQuery;
      } else if (brandId) {
        body.brand = [brandId];
      }

      if (!searchQuery && !brandId) {
        if (activeSubcategory && activeSubcategory.name !== "ALL") {
          body.productSubCategory = [activeSubcategory._id];
        } else if (activeCategory) {
          body.productCategory = [activeCategory._id];
        }
      }

      body.sort = { isBestSeller: -1, isBestAvailable: -1, createdAt: 1 };

      const res = await post('product/list/all/forUser', body);

      if (fetchKey !== fetchKeyRef.current) return;

      if (res && res.products) {
        setTotalProducts(res.totalProducts || 0);
        setTotalPages(res.totalPages || 1);

        const formatted = res.products.map(p => {
            const variant = p.variants?.[0] || {};
            return {
              id: p._id,
              productId: p._id,
              variantId: variant._id || null,
              variantName: variant.name || '',
              unit: variant.unit || '',
              img: p.productImage,
              name: p.name,
              weight: variant.name || '',
              price: variant.discountedPrice ? `₹${variant.discountedPrice}` : '',
              oldPrice: variant.originalPrice ? `₹${variant.originalPrice}` : '',
              originalPrice: variant.originalPrice || 0,
              discountedPrice: variant.discountedPrice || variant.originalPrice || 0,
              discount:
                variant.originalPrice && variant.discountedPrice && variant.originalPrice > variant.discountedPrice
                  ? Math.round(((variant.originalPrice - variant.discountedPrice) / variant.originalPrice) * 100) + '%'
                  : '',
              variants: (p.variants || []).map(v => ({
                id: v._id,
                weight: v.name,
                unit: v.unit || '',
                originalPrice: v.originalPrice || 0,
                discountedPrice: v.discountedPrice || v.originalPrice || 0,
                price: v.discountedPrice ? `₹${v.discountedPrice}` : '',
                oldPrice: v.originalPrice ? `₹${v.originalPrice}` : '',
                discount:
                  v.originalPrice && v.discountedPrice && v.originalPrice > v.discountedPrice
                    ? Math.round(((v.originalPrice - v.discountedPrice) / v.originalPrice) * 100) + '%'
                    : '',
              })),
              isBestSeller: p.isBestSeller,
              isBestAvailable: p.isBestAvailable,
              createdAt: p.createdAt,
            };
          });

        setProducts(prev => (isReset ? formatted : [...prev, ...formatted]));
      } else {
        if (isReset) {
          setProducts([]);
          setTotalProducts(0);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      if (isReset) {
        setProducts([]);
        setTotalProducts(0);
      }
    } finally {
      if (fetchKey !== fetchKeyRef.current) return;
      setIsInitialLoading(false);
      setIsFetchingMore(false);
    }
  };

  const observerRef = useRef(null);
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingMore && !isInitialLoading && currentPage < totalPages) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [isFetchingMore, isInitialLoading, currentPage, totalPages]);

  const handleAddToCart = (product) => {
    addProductToCart(product);
  };

  const handleCategoryClick = (category) => {
    if (searchQuery || brandId) navigate('/all-categories');
    setActiveCategory(category);
    setActiveSubcategory(category.subcategories[0] || null);
  };

  const handleSubcategoryClick = (category, sub) => {
    if (searchQuery || brandId) navigate('/all-categories');
    setActiveCategory(category);
    setActiveSubcategory(sub);
  };

  const SkeletonCard = () => (
    <div className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-2.5 md:p-4 shadow-sm animate-pulse">
      <div className="w-full h-24 md:h-40 bg-gray-100 rounded-xl mb-3"></div>
      <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
      <div className="h-3 bg-gray-100 rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-100 rounded w-1/3 mt-4"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans flex flex-col relative">
      <NewHomeNavbar />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onLoginSuccess={handleLoginSuccess}
        loginBackCloses={Boolean(pendingCartProduct)}
      />

      <CartFloatingButton
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Hero Banner */}
      <section
        className="w-full bg-white bg-cover bg-center bg-no-repeat h-[18vh] sm:h-[25vh] md:h-[30vh] flex items-center"
        style={{ backgroundImage: `url(${headerbg})` }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold balsamiq-sans-bold text-black leading-tight mb-2 md:mb-4 max-w-3xl drop-shadow-sm">
            All Categories
          </h1>
          <p className="text-sm sm:text-xl md:text-xl font-bold text-[#FF5757] max-w-xl bg-white/90 px-3 py-2 md:p-4 rounded-xl shadow-sm inline-block">
            Everything your pet needs in one place
          </p>
        </div>
      </section>

      {/* ── MOBILE: sticky category + subcategory filter bar ── */}
      <div className="md:hidden sticky top-[160px] z-[80] bg-[#FCFCFC] border-b border-gray-100 shadow-sm">


        {/* Subcategory pills row — only shown when there are subcategories */}
        {activeCategory && activeCategory.subcategories.length > 0 && (
          <div
            ref={mobileSubcategoryScrollRef}
            className="flex gap-2 overflow-x-auto px-4 pt-8 pb-3 [&::-webkit-scrollbar]:hidden"
          >
            {categoriesData
              .find(c => c._id === activeCategory._id)
              ?.subcategories.map((sub) => (
                <button
                  key={sub._id}
                  onClick={() => setActiveSubcategory(sub)}
                  className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${
                    activeSubcategory?._id === sub._id
                      ? 'bg-[#FFD000] text-black'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
          </div>
        )}
      </div>

      <main className="max-w-[1400px] mx-auto px-3 md:px-8 py-4 md:py-12 w-full flex-grow flex flex-col md:flex-row gap-4 md:gap-8 items-start">

        {/* Left Sidebar: Categories (Desktop only) */}
        <aside className="hidden md:flex w-56 lg:w-64 shrink-0 flex-col gap-2 sticky top-6 self-start max-h-[calc(100vh-5rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden pb-6">
          {categoriesData.map((category) => (
            <div
              key={category._id}
              className="rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <button
                onClick={() => {
                  setExpandedCategory(expandedCategory === category._id ? null : category._id);
                  handleCategoryClick(category);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                  activeCategory?._id === category._id
                    ? 'bg-[#FFF4B8] border-l-4 border-l-[#FFD000] rounded-l-none'
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent rounded-l-none'
                } ${expandedCategory === category._id ? 'rounded-b-none' : ''}`}
              >
                <span className={`text-sm font-bold tracking-wide text-left leading-snug ${
                  activeCategory?._id === category._id ? 'text-black' : 'text-gray-600'
                }`}>
                  {category.name}
                </span>
                <FiChevronDown
                  className={`shrink-0 h-4 w-4 ml-2 text-gray-400 transition-transform duration-300 ${
                    expandedCategory === category._id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedCategory === category._id && (
                <div className="border-t border-gray-100 flex flex-col pb-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub._id}
                      onClick={() => handleSubcategoryClick(category, sub)}
                      className={`w-full text-left px-5 py-2.5 text-sm transition-colors flex items-center gap-2.5 border-l-4 ${
                        activeSubcategory?._id === sub._id
                          ? 'text-black font-semibold bg-[#FFFBEA] border-l-[#FFD000]'
                          : 'text-gray-500 hover:text-black hover:bg-gray-50 border-l-transparent'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
                        activeSubcategory?._id === sub._id ? 'bg-[#FFD000]' : 'bg-gray-300'
                      }`} />
                      <span className="leading-snug">{sub.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        {/* Right Content: Products Grid */}
        <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">

          {/* Breadcrumbs & Header */}
          <div className="mb-4 md:mb-8 border-b border-gray-200 pb-3 md:pb-6">
            {/* Breadcrumbs — hidden on mobile to save space */}
            <div className="hidden md:flex text-[10px] md:text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-4 md:mb-6 flex-wrap items-center gap-1.5 md:gap-2">
              <Link
                to="/"
                className="underline underline-offset-2 cursor-pointer hover:text-black transition-colors"
              >
                HOMEPAGE
              </Link>
              <span>&gt;</span>
              {activeCategory && (
                <>
                  <Link
                    to={`/category/${activeCategory._id}`}
                    state={{ categoryName: activeCategory.name }}
                    className="underline underline-offset-2 cursor-pointer hover:text-black transition-colors"
                  >
                    {activeCategory.name}
                  </Link>
                </>
              )}
              {activeSubcategory && (
                <>
                  <span>&gt;</span>
                  <Link
                    to={`/category/${activeCategory._id}?subCategory=${activeSubcategory._id}`}
                    state={{
                      categoryName: activeCategory.name,
                      subCategoryName: activeSubcategory.name
                    }}
                    className="underline decoration-black underline-offset-2 decoration-[1.5px] text-black hover:text-gray-700 transition-colors"
                  >
                    {activeSubcategory.name}
                  </Link>
                </>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <h1 className="text-2xl md:text-5xl font-extrabold text-black tracking-tight leading-tight">
                {!activeCategory && !searchQuery && !brandId
                  ? "All Categories"
                  : searchQuery
                    ? `Results for "${searchQuery}"`
                    : brandName
                      ? `Brand: ${brandName}`
                      : (activeSubcategory?.name || activeCategory?.name)}
              </h1>

              <span className="shrink-0 text-[10px] md:text-xs text-gray-400 font-bold tracking-wide">
                {!activeCategory && !searchQuery && !brandId
                  ? `${categoriesData.length} categories`
                  : searchQuery || brandName
                    ? `${totalProducts} found`
                    : `${totalProducts} products`}
              </span>
            </div>
          </div>

          {/* Sort By */}
          {/* 
          {!(!activeCategory && !searchQuery && !brandId) && (
            <div className="flex justify-end mb-4 md:mb-6">
              <span className="text-[10px] md:text-xs text-gray-500 font-bold tracking-wider cursor-pointer hover:text-black transition-colors">
                SORT BY: <span className="text-black ml-1">POPULARITY ∨</span>
              </span>
            </div>
          )} 
          */}

          {/* Product Grid */}
          {!activeCategory && !searchQuery && !brandId ? (
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 mt-4">
                {categoriesData.map((cat, index) => {
                  return (
                    <div
                      key={cat._id}
                      onClick={() => handleCategoryClick(cat)}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-full aspect-square rounded-3xl shadow-sm flex items-center justify-center p-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-white">
                        {cat.img ? (
                          <img src={cat.img} alt={cat.name} className="w-full h-full object-contain scale-[1.15] group-hover:scale-[1.25] transition-transform duration-300" />
                        ) : (
                          <span className="text-3xl md:text-5xl font-black text-gray-300">{cat.name?.charAt(0)}</span>
                        )}
                      </div>
                      
                      <span className="mt-3 text-sm font-semibold text-gray-800 text-center group-hover:text-black">{cat.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Best Seller Section */}
              <div className="mt-16 pt-8 border-t border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Best Seller</h2>
                <div className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2">
                  {[
                    { id: 'd1', name: "Royal Canin Mini Adult Dog Food", img: "https://placehold.co/200/FFF/000?text=Product", weight: "2 kg", price: "₹1,850", oldPrice: "₹2,000", discount: "7%" },
                    { id: 'd2', name: "Whiskas Adult Ocean Fish Cat Food", img: "https://placehold.co/200/FFF/000?text=Product", weight: "1.2 kg", price: "₹390", oldPrice: "₹450", discount: "13%" },
                    { id: 'd3', name: "Farmina N&D Chicken & Pomegranate", img: "https://placehold.co/200/FFF/000?text=Product", weight: "2.5 kg", price: "₹2,500", oldPrice: "₹2,800", discount: "10%" },
                    { id: 'd4', name: "Drools Absolute Calcium Bone", img: "https://placehold.co/200/FFF/000?text=Product", weight: "40 Pcs", price: "₹250", oldPrice: "₹300", discount: "16%" },
                    { id: 'd5', name: "Himalaya Erina EP Tick Shampoo", img: "https://placehold.co/200/FFF/000?text=Product", weight: "200 ml", price: "₹180", oldPrice: "₹200", discount: "10%" },
                  ].map((product, i) => (
                    <div key={i} className="bg-white rounded-3xl w-[45vw] md:w-[260px] lg:w-[280px] shrink-0 snap-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-3 md:p-4 shadow-sm border border-gray-50">
                      <div className="w-full h-28 md:h-40 flex items-center justify-center bg-gray-50 rounded-xl mb-3 md:mb-4 p-1 md:p-2 relative">
                        <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                          {product.discount && (
                            <div className="bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{product.discount} Off</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="font-bold text-black text-xs md:text-sm line-clamp-2 mb-0.5 md:mb-1">{product.name}</h3>
                        <div className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">{product.weight}</div>
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <div className="flex flex-col">
                            <span className="font-bold text-black text-sm md:text-base">{product.price}</span>
                            <span className="text-[10px] md:text-xs text-gray-400 line-through">{product.oldPrice}</span>
                          </div>
                          {(() => {
                            const cartItem = cartItems.find(item => item.productId === (product.id || product._id));
                            return cartItem ? (
                              <div className="flex h-7 md:h-8 items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 shadow-sm" onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="grid h-7 md:h-8 w-7 md:w-8 place-items-center hover:bg-gray-100 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(cartItem.id, cartItem.quantity - 1); }}
                                >
                                  <FiMinus className="h-3 w-3" />
                                </button>
                                <span className="grid h-7 md:h-8 min-w-7 md:min-w-8 place-items-center bg-white text-[10px] md:text-xs font-extrabold border-x border-gray-100">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  className="grid h-7 md:h-8 w-7 md:w-8 place-items-center hover:bg-gray-100 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(cartItem.id, cartItem.quantity + 1); }}
                                >
                                  <FiPlus className="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="bg-[#FFD000] text-black text-[10px] md:text-sm font-bold px-4 md:px-6 py-1 md:py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 transition-all">ADD</button>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Most Brought Section */}
              <div className="mt-10 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Most Brought</h2>
                <div className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2">
                  {[
                    { id: 'd6', name: "Pedigree Adult Meat & Rice", img: "https://placehold.co/200/FFF/000?text=Product", weight: "3 kg", price: "₹650", oldPrice: "₹720", discount: "10%" },
                    { id: 'd7', name: "Sheba Rich Fish Premium", img: "https://placehold.co/200/FFF/000?text=Product", weight: "70 g", price: "₹45", oldPrice: "₹50", discount: "10%" },
                    { id: 'd8', name: "Goodies Energy Treats", img: "https://placehold.co/200/FFF/000?text=Product", weight: "500 g", price: "₹350", oldPrice: "₹400", discount: "12%" },
                    { id: 'd9', name: "TickFree Flea Comb", img: "https://placehold.co/200/FFF/000?text=Product", weight: "1 Pc", price: "₹150", oldPrice: "₹199", discount: "25%" },
                    { id: 'd10', name: "Chappi Adult Chicken", img: "https://placehold.co/200/FFF/000?text=Product", weight: "3 kg", price: "₹490", oldPrice: "₹550", discount: "11%" },
                  ].map((product, i) => (
                    <div key={i} className="bg-white rounded-3xl w-[45vw] md:w-[260px] lg:w-[280px] shrink-0 snap-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-3 md:p-4 shadow-sm border border-gray-50">
                      <div className="w-full h-28 md:h-40 flex items-center justify-center bg-gray-50 rounded-xl mb-3 md:mb-4 p-1 md:p-2 relative">
                        <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                          {product.discount && (
                            <div className="bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">{product.discount} Off</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col flex-grow">
                        <h3 className="font-bold text-black text-xs md:text-sm line-clamp-2 mb-0.5 md:mb-1">{product.name}</h3>
                        <div className="text-[10px] md:text-xs text-gray-500 mb-1 md:mb-2">{product.weight}</div>
                        <div className="flex items-center justify-between gap-2 mt-auto">
                          <div className="flex flex-col">
                            <span className="font-bold text-black text-sm md:text-base">{product.price}</span>
                            <span className="text-[10px] md:text-xs text-gray-400 line-through">{product.oldPrice}</span>
                          </div>
                          {(() => {
                            const cartItem = cartItems.find(item => item.productId === (product.id || product._id));
                            return cartItem ? (
                              <div className="flex h-7 md:h-8 items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 shadow-sm" onClick={(e) => e.stopPropagation()}>
                                <button
                                  className="grid h-7 md:h-8 w-7 md:w-8 place-items-center hover:bg-gray-100 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(cartItem.id, cartItem.quantity - 1); }}
                                >
                                  <FiMinus className="h-3 w-3" />
                                </button>
                                <span className="grid h-7 md:h-8 min-w-7 md:min-w-8 place-items-center bg-white text-[10px] md:text-xs font-extrabold border-x border-gray-100">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  className="grid h-7 md:h-8 w-7 md:w-8 place-items-center hover:bg-gray-100 transition-colors"
                                  onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(cartItem.id, cartItem.quantity + 1); }}
                                >
                                  <FiPlus className="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="bg-[#FFD000] text-black text-[10px] md:text-sm font-bold px-4 md:px-6 py-1 md:py-2 rounded-full hover:bg-[#ffdb33] hover:scale-105 transition-all">ADD</button>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : isInitialLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400 text-sm">Try selecting a different category</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-6">
                {products.map((product, i) => (
                  <div
                    key={`${product.id}-${i}`}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-2 md:p-4 shadow-sm"
                  >
                    <div className="w-full h-[110px] md:h-40 flex items-center justify-center bg-gray-50 rounded-xl md:rounded-2xl mb-2 md:mb-4 p-1.5 md:p-2 relative">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 flex flex-col gap-0.5 md:gap-1 items-end">
                        {product.discount && product.discount !== '0%' && (
                          <div className="bg-[#FF5757] text-white text-[7px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm">
                            {product.discount} Off
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-black text-[11px] md:text-sm line-clamp-2 mb-0.5 md:mb-1">{product.name}</h3>
                      <span className="text-[10px] md:text-xs text-gray-400 mb-1 md:mb-2">{product.weight}</span>
                      <div className="mt-auto flex items-center justify-between gap-1">
                        <div className="flex flex-col min-w-0">
                          {product.oldPrice && product.oldPrice !== product.price && (
                            <span className="text-gray-400 text-[9px] md:text-[10px] line-through">{product.oldPrice}</span>
                          )}
                          <span className="font-bold text-black text-sm md:text-lg leading-tight">{product.price}</span>
                        </div>
                        {(() => {
                          const cartItem = cartItems.find(item => item.productId === (product.id || product._id));
                          return cartItem ? (
                            <div className="flex h-7 md:h-8 items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 shadow-sm" onClick={(e) => e.stopPropagation()}>
                              <button
                                className="grid h-7 md:h-8 w-7 md:w-8 place-items-center hover:bg-gray-100 transition-colors"
                                onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(cartItem.id, cartItem.quantity - 1); }}
                              >
                                <FiMinus className="h-3 w-3" />
                              </button>
                              <span className="grid h-7 md:h-8 min-w-7 md:min-w-8 place-items-center bg-white text-[10px] md:text-xs font-extrabold border-x border-gray-100">
                                {cartItem.quantity}
                              </span>
                              <button
                                className="grid h-7 md:h-8 w-7 md:w-8 place-items-center hover:bg-gray-100 transition-colors"
                                onClick={(e) => { e.stopPropagation(); handleUpdateQuantity(cartItem.id, cartItem.quantity + 1); }}
                              >
                                <FiPlus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                              className="bg-[#FFD000] text-black text-[10px] md:text-sm font-bold px-2.5 md:px-6 py-1 md:py-2 rounded-lg md:rounded-full hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all"
                            >
                              ADD
                            </button>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ))}

                {isFetchingMore && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
              </div>

              <div ref={sentinelRef} className="h-10 mt-4" />

              {!isFetchingMore && currentPage >= totalPages && products.length > 0 && (
                <p className="text-center text-gray-400 text-sm font-bold py-6 tracking-wide">
                  — You've seen all {totalProducts} products —
                </p>
              )}
            </>
          )}
        </div>
      </main>

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