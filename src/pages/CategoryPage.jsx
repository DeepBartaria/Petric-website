import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import CartAnimationLayer from '../components/CartAnimationLayer';
import useCartAnimation from '../hooks/useCartAnimation';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import BestOffer from '../components/BestOffer';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { get, post } from '../helper/api';
import { getAllCategoryProductsTemp } from '../api/categoryProductsApi';
import headerbg from '../assets/petsproductherobg.png';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { logActivity } from '../helper/analytics';
import ProductCard from '../components/ProductCard';
import ProductSkeletonCard from '../components/ProductSkeletonCard';
import VariantPopup from '../components/VariantPopup';
import useProductCoupons from '../hooks/useProductCoupons';
import { getFullProductForVariantPopup } from '../utils/variantPopupProduct';
import {createSlug} from '../helper/slug';
import SEO from "../components/SEO";
const LIMIT = 20;

const categoryImagesGlob = import.meta.glob('../assets/category/*.png', { eager: true, import: 'default' });

const getCategoryBanners = (catName) => {
  if (!catName) return { web: null, phone: null };
  const lowerCat = catName.toLowerCase();
  
  let baseName = lowerCat;
  if (lowerCat.includes('treats')) baseName = 'treats';
  else if (lowerCat.includes('medicines') || lowerCat.includes('pharmacy')) baseName = 'pharmacy';
  else if (lowerCat.includes('toys')) baseName = 'toys';
  else if (lowerCat.includes('vet')) baseName = 'vet food';
  else if (lowerCat.includes('fish') || lowerCat.includes('birds')) baseName = 'fish, birds & more';
  else if (lowerCat.includes('grooming')) baseName = 'grooming';
  else if (lowerCat.includes('walking')) baseName = 'walking gear';
  else if (lowerCat.includes('essentials')) baseName = 'essentials';
  else if (lowerCat.includes('litter')) baseName = 'cat litter';
  else if (lowerCat.includes('dog food')) baseName = 'dog food';
  else if (lowerCat.includes('cat food')) baseName = 'cat food';

  let webUrl = null;
  let phoneUrl = null;
  
  const findMatch = (pattern) => {
    const key = Object.keys(categoryImagesGlob).find(k => k.toLowerCase().endsWith(pattern.toLowerCase()));
    return key ? categoryImagesGlob[key] : null;
  };

  if (baseName === 'cat litter') phoneUrl = findMatch('cat litter__phone.png');
  else if (baseName === 'all categories') phoneUrl = findMatch('all-categories_phone.png');
  else phoneUrl = findMatch(`${baseName}_phone.png`);

  if (baseName === 'fish, birds & more' || baseName === 'grooming' || baseName === 'walking gear') {
    webUrl = findMatch(`${baseName}_web.png`);
  } else if (baseName === 'pharmacy') {
    webUrl = findMatch('pharmacy.png') || findMatch('pharmacy (2).png');
  } else {
    webUrl = findMatch(`${baseName}.png`);
  }
  
  return {
    web: webUrl || phoneUrl || null,
    phone: phoneUrl || webUrl || null
  };
};

export default function CategoryPage() {
  const params = useParams();
  const identifier = params.identifier || params.slug || params.categoryId;
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const subCategoryParam = searchParams.get('subCategory');

  const [categoryName, setCategoryName] = useState(location.state?.categoryName || '');
  const [subcategories, setSubcategories] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
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
  const categorySEO = {
    "Dog Food": {
      title:
        "Buy Dog Food Online in Gurgaon | Fast Delivery | Petric",
      description:
        "Order dog food online in Gurgaon. Royal Canin, Farmina, Pedigree, Purina and more delivered fast across Gurgaon.",
    },

    "Cat Food": {
      title:
        "Buy Cat Food Online in Gurgaon | Fast Delivery | Petric",
      description:
        "Get cat food delivered in Gurgaon. Sheba, Whiskas, Royal Canin, Farmina and more.",
    },

    "Pet Treats": {
      title:
        "Dog & Cat Treats Delivery in Gurgaon | Petric",
      description:
        "Shop premium dog and cat treats in Gurgaon. JerHigh, Temptations, HUFT and more.",
    },

    "Pet Medicines": {
      title:
        "Pet Medicines & Emergency Supplies in Gurgaon | Petric",
      description:
        "Buy pet medicines online in Gurgaon with fast delivery.",
    },

    "Pet Toys": {
      title:
        "Pet Toys for Dogs & Cats in Gurgaon | Petric",
      description:
        "Discover fun and engaging toys for dogs and cats with fast delivery.",
    },

    "Vet Prescribed Pet Food": {
      title:
        "Prescription Pet Food in Gurgaon | Petric",
      description:
        "Royal Canin Veterinary Diet, Farmina VetLife and more.",
    },

    "Cat Litter": {
      title:
        "Buy Cat Litter Online in Gurgaon | Petric",
      description:
        "Order cat litter in Gurgaon. Clumping, scented and unscented options.",
    },
  };

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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [allCategories, setAllCategories] = useState([]);

  // Sentinel ref for infinite scroll
  const sentinelRef = useRef(null);
  // Track fetch key to discard stale responses
  const fetchKeyRef = useRef(0);
  const lastCategoryLogRef = useRef('');

  useEffect(() => {
    // Instantly clear products and show skeleton loader for immediate visual feedback
    setProducts([]);
    setIsInitialLoading(true);
    
    // Optimistically update category name to change the banner instantly
    if (location.state?.categoryName) {
      setCategoryName(location.state.categoryName);
    }
    
    fetchPageData();
  }, [identifier]);

  const fetchPageData = async () => {
    try {
      const catRes = await get("product/category");

      if (!catRes?.categories) return;

      setAllCategories(catRes.categories);

      const currentCat = catRes.categories.find(
        c => createSlug(c.name) === identifier || c._id === identifier
      );

      if (!currentCat) {
        navigate("/all-categories");
        return;
      }

      setCategoryId(currentCat._id);
      setCategoryName(currentCat.name);

      const subRes = await get(
        `product/subCategory?categoryId=${currentCat._id}`
      );

      if (subRes?.subCategories) {
        setSubcategories(subRes.subCategories);

        if (subCategoryParam) {
          const found = subRes.subCategories.find(
            s => createSlug(s.name) === subCategoryParam || s._id === subCategoryParam
          );
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
      const logKey = `${categoryId}:${activeSubcategory?._id || 'all'}`;

      if (lastCategoryLogRef.current === logKey) return;
      lastCategoryLogRef.current = logKey;

      const description = activeSubcategory
        ? `User view ${categoryName} > ${activeSubcategory.name} subcategory`
        : `User view ${categoryName} category`;

      logActivity(description, 'Web_CategoryView');
    }
  }, [categoryName, activeSubcategory]);

  // Reset and refetch when category or subcategory filter changes
  useEffect(() => {
    if (!categoryId) return;

    setProducts([]);
    setCurrentPage(1);
    setTotalPages(1);

    fetchKeyRef.current += 1;

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

    // logActivity(
    //   `User Add to Cart ${product?.name || ''}`,
    //   'Web_AddToCart'
    // );

  };

  const handleOpenProduct = (product) => {
    navigate(`/product/${product.id}`);

    //  logActivity(
    //   `User Click Product ${product?.name || ''}`,
    //   'Web_ProductClick'
    // );
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
    
    const params = sub
      ? `?subCategory=${createSlug(sub.name)}`
      : '';
    navigate(`/category/${identifier}${params}`, {
      state: {
        categoryName,
        subCategoryName: sub?.name
      },
      replace: true
    });

  };

  const handleCategoryNavClick = (cat) => {
    navigate(`/category/${createSlug(cat.name)}`, { state: { categoryName: cat.name } });
    
  };

  const seo =
    categorySEO[categoryName] || {
      title: `${categoryName} Online in Gurgaon | Petric`,
      description: `Shop ${categoryName} online in Gurgaon with fast delivery from Petric.`,
    };

  const banners = getCategoryBanners(categoryName);

  return (
    <>  
      <SEO
        title={seo.title}
        description={seo.description}
        canonical={`https://petric.in/category/${identifier}`}
      />
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
        <section className="relative w-full h-[140px] md:h-[180px] flex items-center justify-center overflow-hidden bg-[#F8F9FA]">
          {banners.web && banners.phone ? (
            <picture className="absolute inset-0 z-0 w-full h-full">
              <source media="(max-width: 767px)" srcSet={banners.phone} />
              <img src={banners.web} alt={categoryName} className="w-full h-full object-cover object-center" />
            </picture>
          ) : (
            <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${headerbg})` }} />
          )}
          
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center items-center text-center">
            <div className="inline-block bg-white/40 backdrop-blur-md px-8 py-4 md:px-12 md:py-6 rounded-3xl shadow-2xl border border-white/60 transform transition-transform duration-300 hover:scale-105">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold balsamiq-sans-bold text-black drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] tracking-wide">
                {categoryName || 'Category'}
              </h1>
            </div>
          </div>
        </section>

        <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-3 md:py-8 w-full flex-grow flex flex-col md:flex-row gap-4 md:gap-8">

          {/* Mobile Subcategory Selector */}
          <div className="flex md:hidden flex-col sticky top-[133px] z-[80] bg-[#FCFCFC] pt-6 pb-2 -mx-4 px-4 shadow-sm border-b border-gray-100 mb-3">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeletonCard key={i} />)}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">🐾</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-400 text-sm">Try selecting a different subcategory</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
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
                  {isFetchingMore && Array.from({ length: 4 }).map((_, i) => <ProductSkeletonCard key={`skel-${i}`} />)}
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
          {/* <BestOffer /> */}
          <Testimonials />
          <Footer />
        </div>
      </div>
    </> 
  );
}