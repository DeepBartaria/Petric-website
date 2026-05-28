import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import CartAnimationLayer from '../components/CartAnimationLayer';
import useCartAnimation from '../hooks/useCartAnimation';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { get, post } from '../helper/api';
import { getAllCategoryProductsTemp } from '../api/categoryProductsApi';
import headerbg from '../assets/petsproductherobg.png';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { logActivity } from '../helper/analytics';
import ProductCard from '../components/ProductCard';
import VariantPopup from '../components/VariantPopup';
import useProductCoupons from '../hooks/useProductCoupons';
import { getFullProductForVariantPopup } from '../utils/variantPopupProduct';
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
  const { cartRef, flyItems, toasts, cartShake, triggerFlyToCart, onFlyComplete, dismissToast } =
    useCartAnimation();

  const productCoupons = useProductCoupons();
  const [isVariantPopupOpen, setIsVariantPopupOpen] = useState(false);
  const [variantPopupProduct, setVariantPopupProduct] = useState(null);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);
    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);

  // const [cartItems, setCartItems] = useState([]);

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

    useEffect(() => {
    if (categoryName) {
      const description = activeSubcategory
        ? `User view ${categoryName} > ${activeSubcategory.name} subcategory`
        : `User view ${categoryName} category`;

      logActivity(description, 'Web_CategoryView');
    }
  }, [categoryName, activeSubcategory]);

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

  const handleAddToCart = (product, event) => {
    // Fly animation: find the product image inside the card that was clicked
    if (event && triggerFlyToCart) {
      const card = event.currentTarget.closest('[data-product-card]');
      const img = card?.querySelector('img');
      if (img) triggerFlyToCart(img, product.img, product.name);
    }
    addProductToCart(product);

    logActivity(
      `User Add to Cart ${product?.name || ''}`,
      'Web_AddToCart'
    );

  };

  const handleOpenProduct = (product) => {
    navigate(`/product/${product.id}`);

     logActivity(
      `User Click Product ${product?.name || ''}`,
      'Web_ProductClick'
    );
  };

  const handleOpenVariants = async (product) => {
    setIsCartOpen(false);
    window.dispatchEvent(new Event('closeCart'));
    
    logActivity(
      `User View Variants ${product?.name || ''}`,
      'Web_OpenVariant'
    );    

    try {
      const fullProduct = await getFullProductForVariantPopup(product, get);
      const variants = Array.isArray(fullProduct?.variants) ? fullProduct.variants : [];

      if (variants.length > 1) {
        setVariantPopupProduct(fullProduct);
        setIsVariantPopupOpen(true);
        return;
      }

      addProductToCart(fullProduct);
    } catch (error) {
      console.error('Variant popup product fetch failed:', error);

      const variants = Array.isArray(product?.variants) ? product.variants : [];

      if (variants.length > 1) {
        setVariantPopupProduct(product);
        setIsVariantPopupOpen(true);
        return;
      }

      addProductToCart(product);
    }
  };

  const handleSubcategoryClick = (sub) => {
    setActiveSubcategory(sub);
    logActivity(
      `User View Subcategory ${categoryName} > ${sub?.name || 'All'}`,
      'Web_SubcategoryView'
    );
    const params = sub ? `?subCategory=${sub._id}` : '';
    navigate(`/category/${categoryId}${params}`, {
      state: { categoryName, subCategoryName: sub?.name },
      replace: true
    });
  };

  const handleCategoryNavClick = (cat) => {
    navigate(`/category/${cat._id}`, { state: { categoryName: cat.name } });
    logActivity(
      `User View Category ${cat?.name || ''}`,
      'Web_TopBarCateogries'
    );
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

      {/* Hero Banner */}
      <section
              className="w-full bg-white bg-cover bg-center bg-no-repeat h-[140px] md:h-[180px] flex items-center"
              style={{ backgroundImage: `url(${headerbg})` }}
            >
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center items-center text-center">
                <h1 className="text-3xl md:text-4xl font-bold balsamiq-sans-bold text-black leading-tight mb-2 max-w-3xl drop-shadow-sm">
                  {categoryName || 'Category'}
                </h1>
                <p className="text-xs md:text-sm font-semibold text-[#FF5757] bg-white/85 px-4 py-2 rounded-lg shadow-sm inline-block">
                  Essentials for your pet
                </p>
              </div>
            </section>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 md:py-8 w-full flex-grow flex flex-col md:flex-row gap-4 md:gap-8">

        {/* Mobile Subcategory Selector */}
        <div className="flex md:hidden flex-col sticky top-[133px] z-[80] bg-[#FCFCFC] py-2 -mx-4 px-4 shadow-sm border-b border-gray-100 mb-3">
          {subcategories.length > 0 && (
            <div className="flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden">
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
        <div className="hidden md:flex w-full md:w-1/4 lg:w-1/5 shrink-0 flex-col overflow-y-auto max-h-screen pr-2 sticky top-4 custom-scrollbar">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {products.map((product, i) => (
                  <ProductCard
                    key={`${product.id}-${i}`}
                    product={product}
                    coupons={productCoupons}
                    onOpenProduct={handleOpenProduct}
                    onAddToCart={handleAddToCart}
                    onOpenVariants={handleOpenVariants}
                    onAnimateToCart={triggerFlyToCart}
                  />
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