import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { get, post } from '../helper/api';
import { getAllCategoryProductsTemp } from '../api/categoryProductsApi';
import headerbg from '../assets/petsproductherobg.png';

const LIMIT = 20;

export default function CategoryPage() {
  const { categoryId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const subCategoryParam = searchParams.get('subCategory');

  const [categoryName, setCategoryName] = useState(location.state?.categoryName || '');
  const [subcategories, setSubcategories] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const [isCartOpen, setIsCartOpen] = useState(false);
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  const [cartItems, setCartItems] = useState([]);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  // Sentinel ref for infinite scroll
  const sentinelRef = useRef(null);
  // Track fetch key to discard stale responses
  const fetchKeyRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPageData();
  }, [categoryId]);

  const fetchPageData = async () => {
    try {
      const [subRes, catRes] = await Promise.all([
        get(`product/subCategory?categoryId=${categoryId}`),
        get('product/category')
      ]);

      if (catRes?.categories) {
        setAllCategories(catRes.categories);
        const currentCat = catRes.categories.find(c => c._id === categoryId);
        if (currentCat) setCategoryName(currentCat.name);
      }

      if (subRes?.subCategories) {
        setSubcategories(subRes.subCategories);
        if (subCategoryParam) {
          const found = subRes.subCategories.find(s => s._id === subCategoryParam);
          setActiveSubcategory(found || null);
        } else {
          setActiveSubcategory(null);
        }
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
    }
  };

  // Reset and refetch when category or subcategory filter changes
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalPages(1);
    fetchKeyRef.current += 1;
    // TEMPORARY: using fetchAllProductsTemp instead of fetchProducts until backend velocity sort is deployed.
    // To restore paginated behavior: change the next line back to:  fetchProducts(1, true, fetchKeyRef.current); 
    fetchAllProductsTemp(fetchKeyRef.current);
  }, [categoryId, activeSubcategory]);

  // Fetch additional pages
  useEffect(() => {
    if (currentPage > 1) {
      fetchProducts(currentPage, false, fetchKeyRef.current);
    }
  }, [currentPage]);

  // === TEMPORARY: fetch all products + sort on frontend ===
  // Replaces the paginated fetchProducts below until the backend supports a required sortBy without login.
  const fetchAllProductsTemp = async (fetchKey) => {
    setIsInitialLoading(true);
    setProducts([]);

    const res = await getAllCategoryProductsTemp({
      categoryId,
      subCategoryId: activeSubcategory?._id,
    });

    // Discard if a newer fetch was triggered in the meantime
    if (fetchKey !== fetchKeyRef.current) {
      setIsInitialLoading(false);
      return;
    }

    if (res?.products) {
      // Sort: bestSeller first, then bestAvailable, then oldest createdAt first
      const sorted = [...res.products].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
      });

      const formatted = sorted.map((p) => {
        const variant = p.variants?.[0] || {};
        return {
          id: p._id,
          img: p.productImage,
          name: p.name,
          weight: variant.name || '',
          price: variant.discountedPrice ? `₹${variant.discountedPrice}` : '',
          oldPrice: variant.originalPrice ? `₹${variant.originalPrice}` : '',
          discount:
            variant.originalPrice && variant.discountedPrice && variant.originalPrice > variant.discountedPrice
              ? Math.round(((variant.originalPrice - variant.discountedPrice) / variant.originalPrice) * 100) + '%'
              : '',
          isBestSeller: p.isBestSeller,
          isBestAvailable: p.isBestAvailable,
          createdAt: p.createdAt,
        };
      });

      setProducts(formatted);
      setTotalProducts(res.totalProducts || formatted.length);
      setTotalPages(1);   // single fetch — no further pagination
      setCurrentPage(1);
    } else {
      setProducts([]);
      setTotalProducts(0);
    }

    setIsInitialLoading(false);
  };

  const fetchProducts = async (page, isReset, fetchKey) => {
    if (isReset) {
      setIsInitialLoading(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const body = { page, limit: LIMIT };

      if (activeSubcategory) {
        body.productSubCategory = [activeSubcategory._id];
      } else {
        body.productCategory = [categoryId];
      }

      // Tell the backend to sort: bestSeller first, then bestAvailable, then oldest→newest
      // Your backend should apply: .sort({ isBestSeller: -1, isBestAvailable: -1, createdAt: 1 })

      body.sort = { isBestSeller: -1, isBestAvailable: -1, createdAt: 1 };

      const res = await post('product/list/all/forUser', body);

      // Discard stale response
      if (fetchKey !== fetchKeyRef.current) return;

      if (res?.products) {
        setTotalProducts(res.totalProducts || 0);
        setTotalPages(res.totalPages || 1);

        // No client-side sort — backend returns data pre-sorted across the full dataset
        const formatted = res.products.map(p => {
            const variant = p.variants?.[0] || {};
            return {
              id: p._id,
              img: p.productImage,
              name: p.name,
              weight: variant.name || '',
              price: variant.discountedPrice ? `₹${variant.discountedPrice}` : '',
              oldPrice: variant.originalPrice ? `₹${variant.originalPrice}` : '',
              discount:
                variant.originalPrice && variant.discountedPrice && variant.originalPrice > variant.discountedPrice
                  ? Math.round(((variant.originalPrice - variant.discountedPrice) / variant.originalPrice) * 100) + '%'
                  : '',
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

  // Intersection Observer for infinite scroll
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

  const handleSubcategoryClick = (sub) => {
    setActiveSubcategory(sub);
    const params = sub ? `?subCategory=${sub._id}` : '';
    navigate(`/category/${categoryId}${params}`, {
      state: { categoryName, subCategoryName: sub?.name },
      replace: true
    });
  };

  const handleCategoryNavClick = (cat) => {
    navigate(`/category/${cat._id}`, { state: { categoryName: cat.name } });
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
      />

      <CartFloatingButton
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onClick={() => setIsCartOpen(true)}
      />

      {/* Hero Banner */}
      <section
              className="w-full bg-white bg-cover bg-center bg-no-repeat h-[20vh] sm:h-[25vh] md:h-[30vh] flex items-center"
              style={{ backgroundImage: `url(${headerbg})` }}
            >
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center items-center text-center">
                <h1 className="text-4xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold balsamiq-sans-bold text-black leading-tight mb-4 max-w-3xl drop-shadow-sm">
                  All Categories
                </h1>
                <p className="text-lg sm:text-xl md:text-xl font-bold text-[#FF5757] max-w-xl bg-white/90 p-4 rounded-xl shadow-sm inline-block">
                  Everything your pet needs 
                </p>
              </div>
            </section>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12 w-full flex-grow flex flex-col md:flex-row gap-6 md:gap-10">

        {/* Mobile Subcategory Selector */}
        <div className="flex md:hidden flex-col gap-3">
          <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden">
            {allCategories.map((cat) => (
              <button
                key={cat._id}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors shrink-0 ${cat._id === categoryId ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-200'}`}
                onClick={() => handleCategoryNavClick(cat)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {subcategories.length > 0 && (
            <div className="flex overflow-x-auto gap-2 pb-2 [&::-webkit-scrollbar]:hidden">
              <button
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${!activeSubcategory ? 'bg-[#FFD000] text-black' : 'bg-gray-100 text-gray-600'}`}
                onClick={() => handleSubcategoryClick(null)}
              >
                All
              </button>
              {subcategories.map((sub) => (
                <button
                  key={sub._id}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${activeSubcategory?._id === sub._id ? 'bg-[#FFD000] text-black' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => handleSubcategoryClick(sub)}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Left Sidebar: Categories (Desktop) */}
        <div className="underline underline-offset-4 hidden md:flex w-full md:w-1/4 lg:w-1/5 shrink-0 flex-col overflow-y-auto max-h-screen pr-2 sticky top-4 custom-scrollbar">
          {allCategories.map((cat) => {
            const isActive = cat._id === categoryId;
            return (
              <div key={cat._id} className="mb-8">
                <h3
                  className={`text-[13px] font-extrabold uppercase tracking-widest mb-4 cursor-pointer transition-colors ${isActive ? 'text-black' : 'text-gray-800 hover:text-black'}`}
                  onClick={() => handleCategoryNavClick(cat)}
                >
                  {cat.name}
                </h3>
                {isActive && subcategories.length > 0 && (
                  <div className="flex flex-col gap-3 pl-3 border-l-2 border-gray-100">
                    <span
                      onClick={() => handleSubcategoryClick(null)}
                      className={`text-sm cursor-pointer transition-colors ${!activeSubcategory ? 'text-[#FFD000] font-bold' : 'text-gray-500 hover:text-[#FFD000]'}`}
                    >
                      All
                    </span>
                    {subcategories.map((sub) => (
                      <span
                        key={sub._id}
                        onClick={() => handleSubcategoryClick(sub)}
                        className={`text-sm cursor-pointer transition-colors ${activeSubcategory?._id === sub._id ? 'text-[#FFD000] font-bold' : 'text-gray-500 hover:text-[#FFD000]'}`}
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Content: Products Grid */}
        <div className="w-full md:w-3/4 lg:w-4/5 flex flex-col">

          {/* Breadcrumbs & Header */}
          <div className="mb-6 md:mb-8 border-b border-gray-200 pb-4 md:pb-6">
            <div className="text-[10px] md:text-[11px] text-gray-500 uppercase font-bold tracking-widest mb-4 md:mb-6 flex flex-wrap items-center gap-1.5 md:gap-2">
              <span
                className="cursor-pointer hover:text-black transition-colors"
                onClick={() => navigate('/')}
              >
                HOMEPAGE
              </span>
              <span>&gt;</span>
              <span
                className="cursor-pointer hover:text-black transition-colors"
                onClick={() => { setActiveSubcategory(null); navigate(`/category/${categoryId}`, { state: { categoryName }, replace: true }); }}
              >
                {categoryName}
              </span>
              {activeSubcategory && (
                <>
                  <span>&gt;</span>
                  <span className="text-black">{activeSubcategory.name}</span>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight">
                {activeSubcategory?.name || categoryName}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-bold tracking-wide">
                  PRODUCTS IN CATEGORY: {totalProducts}
                </span>
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div className="flex justify-end mb-6">
            <span className="text-xs text-gray-500 font-bold tracking-wider cursor-pointer hover:text-black transition-colors">
              SORT BY: <span className="text-black ml-1">POPULARITY ∨</span>
            </span>
          </div>

          {/* Product Grid */}
          {isInitialLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-4">🐾</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-400 text-sm">Try selecting a different subcategory</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {products.map((product, i) => (
                  <div
                    key={`${product.id}-${i}`}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white border border-gray-100 rounded-2xl md:rounded-3xl w-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-2.5 md:p-4 shadow-sm"
                  >
                    <div className="w-full h-24 md:h-40 flex items-center justify-center bg-gray-50 rounded-xl md:rounded-2xl mb-2 md:mb-4 p-1.5 md:p-2 relative">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 flex flex-col gap-1 items-end">
                        {product.isBestSeller && (
                          <div className="bg-black text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm">
                            Best Seller
                          </div>
                        )}
                        {!product.isBestSeller && product.isBestAvailable && (
                          <div className="bg-green-600 text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm">
                            Best Seller
                          </div>
                        )}

                        {product.discount && product.discount !== '0%' && (
                          <div className="bg-[#FF5757] text-white text-[8px] md:text-[10px] font-bold px-1.5 md:px-2 py-0.5 rounded-full shadow-sm">
                            {product.discount} Off
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-black text-[11px] md:text-sm line-clamp-2 mb-1">{product.name}</h3>
                      <span className="text-[10px] md:text-xs text-gray-500 mb-2">{product.weight}</span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex flex-col">
                          {product.oldPrice && product.oldPrice !== product.price && (
                            <span className="text-gray-400 text-[9px] md:text-[10px] line-through">{product.oldPrice}</span>
                          )}
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

                {/* Skeleton cards while fetching more */}
                {isFetchingMore && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
              </div>

              {/* Sentinel element for IntersectionObserver */}
              <div ref={sentinelRef} className="h-10 mt-4" />

              {/* End of results */}
              {!isFetchingMore && currentPage >= totalPages && products.length > 0 && (
                <p className="text-center text-gray-400 text-sm font-bold py-6 tracking-wide">
                  — You've seen all {totalProducts} products —
                </p>
              )}
            </>
          )}
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