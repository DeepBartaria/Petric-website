import React, { useState, useEffect, useRef } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingBag, FiCheck, FiUsers } from 'react-icons/fi';
import NewHomeNavbar from '../components/NewHomeNavbar';
import ProductCard from '../components/ProductCard';
import VariantPopup from '../components/VariantPopup';
import useCartAnimation from '../hooks/useCartAnimation';
import CartAnimationLayer from '../components/CartAnimationLayer';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import CartFloatingButton from '../components/CartFloatingButton';
import { get, post } from '../helper/api';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { logActivity } from '../helper/analytics';
import { trackViewContent } from '../helper/metaPixel';


// Deterministic "random" number from product id so it doesn't change on re-render
function formatProductForCard(p) {
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
    createdAt: p.createdAt,
    brand: p.brand?.name || 'Petric'
  };
}

function getPetParentCount(id = '') {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  // Range: 120 – 3400
  return 120 + (hash % 3281);
}



export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [isVariantPopupOpen, setIsVariantPopupOpen] = useState(false);
  const [variantPopupProduct, setVariantPopupProduct] = useState(null);
  
  const { cartRef, flyItems, toasts, cartShake, triggerFlyToCart, onFlyComplete, dismissToast } = useCartAnimation();

  const handleOpenVariants = (prod) => {
    setVariantPopupProduct(prod);
    setIsVariantPopupOpen(true);
  };

  const handleAddToCartForCard = (p) => {
    // P could be from VariantPopup or direct ProductCard add.
    // Ensure it has all required cart fields.
    const cartProduct = {
      id: p.id || p._id,
      productId: p.productId || p._id,
      img: p.img || p.productImage,
      brand: p.brand?.name || p.brand || 'Petric',
      name: p.name,
      variantName: p.variantName || p.weight || '',
      unit: p.unit || '',
      price: (p.discountedPrice || p.originalPrice || p.price || 0).toString(),
      oldPrice: (p.originalPrice || p.oldPrice || 0).toString(),
      originalPrice: p.originalPrice || 0,
      discountedPrice: p.discountedPrice || p.price || 0,
      variantId: p.variantId || null,
      quantity: p.quantity || 1,
    };
    addProductToCart(cartProduct);
  };

  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    pendingCartProduct,
    setPendingCartProduct,
    addProductToCart,
    handleUpdateQuantity,
    handleLoginSuccess,
  } = useCart();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [brandProducts, setBrandProducts] = useState([]);
  const loggedProductDetailsRef = useRef(null);
  const [btnBounce, setBtnBounce] = useState(false);
  
  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener('openCart', handleOpenCart);

    return () => window.removeEventListener('openCart', handleOpenCart);
  }, []);


  const handleAddToCart = () => {
    if (!product) return;

    setBtnBounce(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setBtnBounce(true)));

    const cartProduct = {
      id: product._id,
      productId: product._id,
      img: product.productImage,
      brand: product.brand?.name || 'Petric',
      name: product.name,
      description: product.description || '',
      weight: selectedSize ? selectedSize.name : '',
      variantName: selectedSize ? selectedSize.name : '',
      unit: selectedSize ? selectedSize.unit : '',
      price: (selectedSize?.discountedPrice || selectedSize?.originalPrice || product.originalPrice || 0).toString(),
      oldPrice: (selectedSize?.originalPrice || product.originalPrice || 0).toString(),
      originalPrice: selectedSize?.originalPrice || product.originalPrice || 0,
      discountedPrice: selectedSize?.discountedPrice || selectedSize?.originalPrice || product.originalPrice || 0,
      variantId: selectedSize ? selectedSize._id : null,
      quantity,
    };

    addProductToCart(cartProduct);

    logActivity(
      `User Added to Cart ${product?.name || ''}${selectedSize?.name ? ` - ${selectedSize.name}` : ''}`,
      'Web_AddToCart'
    );
  };

  

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await get(`product/details/single/${id}`);
        if (res.type === 'success' && res.product) {
          const productLogId = res.product._id || id;

          if (loggedProductDetailsRef.current !== productLogId) {
            loggedProductDetailsRef.current = productLogId;

            trackViewContent(res.product);

            logActivity(
              `User View Details of ${res.product.name}`,
              'Web_ProductDetails'
            );
          }

          const p = res.product;
          setProduct(p);
          if (p.variants?.length > 0) setSelectedSize(p.variants[0]);
          setMainImage(p.productImage);

          // Similar products (same category)
          const categoryId = Array.isArray(p.productCategory)
            ? p.productCategory[0]?._id
            : p.productCategory?._id;

          if (categoryId) {
            try {
              const similarRes = await post('product/list/all/forUser', {
                page: 1, limit: 6, productCategory: [categoryId],
              });
              if (similarRes?.products) {
                setSimilarProducts(
                  similarRes.products
                    .filter(sp => sp._id !== p._id)
                    .slice(0, 4)
                    .map(sp => {
                      const v = sp.variants?.[0] || {};
                      return {
                        id: sp._id, img: sp.productImage,
                        brand: sp.brand?.name || 'Petric', name: sp.name,
                        price: v.discountedPrice || v.originalPrice || 0,
                        oldPrice: v.originalPrice,
                        discount: v.discountedPrice && v.originalPrice && v.originalPrice > v.discountedPrice
                          ? Math.round(((v.originalPrice - v.discountedPrice) / v.originalPrice) * 100) + '%' : '',
                      };
                    })
                );
              }
            } catch (err) { console.error('Similar products error', err); }
          }

          // More by brand
          const brandId = typeof p.brand === 'object' ? p.brand?._id : p.brand;
          if (brandId) {
            try {
              const brandRes = await post('product/list/all/forUser', {
                page: 1, limit: 6, brand: [brandId],
              });
              if (brandRes?.products) {
                setBrandProducts(
                  brandRes.products
                    .filter(bp => bp._id !== p._id)
                    .slice(0, 5)
                    .map(bp => formatProductForCard(bp))
                );
              }
            } catch (err) { console.error('Brand products error', err); }
          }
        }
      } catch (err) {
        console.error('Failed to load product', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] font-sans text-black relative flex flex-col">
        <NewHomeNavbar />
        <main className="mx-auto max-w-[1400px] px-3 md:px-8 py-4 md:py-10 w-full flex-1">
          {/* Breadcrumb Skeleton */}
          <div className="mb-4 h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>

          {/* Product Hero Section Skeleton */}
          <section className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr] gap-4 md:gap-8 mb-8 md:mb-12">
            {/* Left: Image Skeleton */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl md:rounded-[2rem] bg-gray-100 border border-gray-100 p-4 md:p-8 flex items-center justify-center shadow-sm min-h-[240px] md:min-h-[480px] animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-gray-100 animate-pulse border-2 border-gray-100"></div>
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-gray-100 animate-pulse border-2 border-gray-100"></div>
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-gray-100 animate-pulse border-2 border-gray-100"></div>
              </div>
            </div>

            {/* Right: Product Info Skeleton */}
            <aside className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col gap-4">
              <div className="h-6 md:h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>

              <div className="h-10 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>

              <div className="h-8 md:h-10 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>

              <div className="flex gap-3">
                <div className="h-10 md:h-11 w-24 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="h-10 md:h-11 flex-1 rounded-full bg-gray-200 animate-pulse"></div>
              </div>
              
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-50">
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </aside>
          </section>

          {/* Description Skeleton */}
          <section className="mb-10 md:mb-14">
            <div className="h-6 md:h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-8 shadow-sm">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col">
        <NewHomeNavbar />
        <div className="flex-1 flex items-center justify-center flex-col gap-3">
          <div className="text-5xl">🐾</div>
          <h2 className="text-2xl font-bold text-gray-700">Product not found.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const brandName = product.brand?.name || (Array.isArray(product.brand) ? product.brand[0]?.name : 'Petric');
  const brandId =
    product?.brand?._id ||
    (Array.isArray(product?.brand)
      ? product.brand[0]?._id
      : null);
  const categoryName = (Array.isArray(product.productCategory)
    ? product.productCategory[0]?.name
    : product.productCategory?.name) || 'Category';
  const availableSizes = product.variants?.length > 0 ? product.variants : [];
  const currentPrice = selectedSize
    ? (selectedSize.discountedPrice || selectedSize.originalPrice)
    : (product.discountedPrice || product.originalPrice || 0);
  const oldPrice = selectedSize ? selectedSize.originalPrice : product.originalPrice;
  const hasDiscount = oldPrice && oldPrice > currentPrice;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;
  const galleryImages = [product.productImage, ...(product.productGallery || [])].filter(Boolean);
  const petParentCount = getPetParentCount(product._id);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-black relative">
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
        onAddToCart={handleAddToCartForCard}
        onAnimateToCart={triggerFlyToCart}
      />

      <main className="mx-auto max-w-[1400px] px-3 md:px-8 py-4 md:py-10">

        {/* Breadcrumb */}
        <div className="mb-4 text-[10px] md:text-xs font-medium text-gray-400 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          <span className="underline underline-offset-2 hover:text-black cursor-pointer transition-colors">Home</span>
          <span>&gt;</span>
          <span className="underline underline-offset-2 hover:text-black cursor-pointer transition-colors">{categoryName}</span>
          <span>&gt;</span>
          <span className="underline underline-offset-2 hover:text-black cursor-pointer transition-colors">{brandName}</span>
          <span>&gt;</span>
          <span className="underline underline-offset-2 text-black line-clamp-1 max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Hero Section */}
        <section className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr] gap-4 md:gap-8 mb-8 md:mb-12">

          {/* Left: Image + Gallery */}
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl md:rounded-[2rem] bg-white border border-gray-100 p-4 md:p-8 flex items-center justify-center overflow-hidden shadow-sm min-h-[240px] md:min-h-[480px]">
              <img
                src={mainImage}
                alt={product.name}
                className="max-h-[260px] md:max-h-[380px] w-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 px-1 [&::-webkit-scrollbar]:hidden">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`h-16 w-16 md:h-20 md:w-20 rounded-xl border-2 flex items-center justify-center bg-white shrink-0 transition-all ${
                      mainImage === img ? 'border-[#FFD000] shadow-sm' : 'border-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <aside className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 p-4 md:p-6 shadow-sm flex flex-col gap-4">

            {/* Assurance tag */}
            {/* <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-600 border border-blue-100">
                <FiCheck className="h-3 w-3" /> Petric Assured
              </span>
            </div> */}

            {/* Title & Brand */}
            <div className="flex flex-col gap-1">
              <h1 className="text-lg md:text-xl font-bold text-black leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                {brandId ? (
                  <Link onClick={(e) => e.stopPropagation()}
                    to={`/all-categories?brandId=${brandId}&brandName=${encodeURIComponent(brandName)}`}
                    className="text-xs md:text-sm font-bold text-gray-600 underline underline-offset-2 hover:text-[#F5C400] transition-colors"
                  >
                    by: {brandName}
                  </Link>
                ) : (
                  <p className="text-xs md:text-sm font-bold text-gray-600">
                    by: {brandName}
                  </p>
                )}
              </div>
            </div>

            {/* Pet parents social proof — replaces star rating */}
            <div className="flex items-center gap-2 bg-[#FFF9E5] border border-[#FFE880] rounded-xl px-3 py-2 w-fit">
              <FiUsers className="h-3.5 w-3.5 text-[#B8860B] shrink-0" />
              <span className="text-xs font-bold text-[#7A5C00]">
                {petParentCount.toLocaleString('en-IN')} pet parents bought this
              </span>
            </div>

            {/* Variant selector */}
            {availableSizes.length > 0 && (
              <div>
                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Select Variant</p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 md:h-10 px-3 md:px-4 rounded-xl border text-xs md:text-sm font-bold transition-all ${
                        selectedSize?._id === size._id
                          ? 'border-[#FFD000] bg-[#FFD000] text-black shadow-sm'
                          : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-[#FFD000]'
                      }`}
                    >
                      {size.unit || size.name || size.weight || `Variant ${i + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-2xl md:text-3xl font-extrabold">₹{currentPrice}</p>
              {hasDiscount && (
                <>
                  <p className="text-sm md:text-base font-bold text-gray-400 line-through">₹{oldPrice}</p>
                  <span className="text-xs md:text-sm font-extrabold text-white bg-green-500 px-2 py-0.5 rounded-full">
                    {discountPercent}% off
                  </span>
                </>
              )}
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 md:h-11 items-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 shadow-sm">
                <button
                  className="grid h-10 md:h-11 w-9 md:w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(v => Math.max(1, v - 1))}
                >
                  <FiMinus className="h-3.5 w-3.5" />
                </button>
                <span className="grid h-10 md:h-11 min-w-9 md:min-w-10 place-items-center bg-white text-sm font-extrabold border-x border-gray-100">
                  {quantity}
                </span>
                <button
                  className="grid h-10 md:h-11 w-9 md:w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(v => v + 1)}
                >
                  <FiPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                onAnimationEnd={() => setBtnBounce(false)}
                className={`flex-1 flex h-10 md:h-11 items-center justify-center gap-2 rounded-full bg-[#FFD000] px-4 text-sm font-extrabold hover:bg-[#ffdb33] hover:scale-[1.02] hover:shadow-md transition-all${btnBounce ? ' animate-add-btn-bounce' : ''}`}
              >
                <FiShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>

            {/* Trust bullets */}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
              {[
                '100% Authentic Product',
                'Premium Quality Assured',
                'Fast Delivery to Your Door',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                  <FiCheck className="h-3.5 w-3.5 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* Product Description — single section, no tabs */}
        <section className="mb-10 md:mb-14">
          <h2 className="text-xl md:text-2xl font-extrabold text-black mb-4 pb-3 border-b border-gray-100">
            Product Description
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 md:p-8 shadow-sm">
            {product.description ? (
              <p className="text-sm md:text-base leading-7 text-gray-700 whitespace-pre-line">
                {product.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">No description available for this product.</p>
            )}

            {/* Key details chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { label: 'Brand', value: brandName },
                { label: 'Category', value: categoryName },
                { label: 'Pet Type', value: Array.isArray(product.petType) ? product.petType.join(', ') : product.petType },
                ...(Array.isArray(product.lifeStage) && product.lifeStage.length > 0
                  ? [{ label: 'Life Stage', value: product.lifeStage.map(l => l.name).join(', ') }] : []),
                ...(Array.isArray(product.breedSize) && product.breedSize.length > 0
                  ? [{ label: 'Breed Size', value: product.breedSize.map(b => b.name).join(', ') }] : []),
              ].filter(d => d.value).map((detail, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700">
                  <span className="text-gray-400">{detail.label}:</span>
                  <span className="font-bold text-black">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
// More by Brand 
        {brandProducts.length > 0 && (
          <section className="mb-10 md:mb-14">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              
              <h2 className="text-xl md:text-2xl font-extrabold text-black">
                More by{' '}
                {brandId ? (
                  <Link
                    to={`/all-categories?brandId=${brandId}&brandName=${encodeURIComponent(brandName)}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-[#B8860B] hover:text-[#F5C400] underline underline-offset-2 decoration-[#B8860B]/40 hover:decoration-[#F5C400] transition-colors duration-200"
                  >
                    {brandName}
                  </Link>
                ) : (
                  <span className="text-[#B8860B]">{brandName}</span>
                )}
              </h2>

              {brandId && (
                <Link
                  to={`/all-categories?brandId=${brandId}&brandName=${encodeURIComponent(brandName)}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] md:text-xs font-bold underline underline-offset-2 text-black hover:text-[#F5C400] transition-colors whitespace-nowrap"
                >
                  View All
                </Link>
              )}

            </div>

            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-3 md:pb-0">
              {brandProducts.map((p, i) => (
                <ProductCard 
                  key={i} 
                  product={p} 
                  mobileMode="carousel" 
                  desktopMode="carousel" 
                  onOpenProduct={(prod) => navigate(`/product/${prod.id}`)} 
                  onOpenVariants={(prod) => navigate(`/product/${prod.id}`)}
                  onAddToCart={(prod) => {
                    const cartProduct = {
                      id: prod.id,
                      productId: prod.id,
                      img: prod.img,
                      brand: prod.brand || 'Petric',
                      name: prod.name,
                      price: (prod.discountedPrice || prod.originalPrice || 0).toString(),
                      oldPrice: (prod.originalPrice || 0).toString(),
                      originalPrice: prod.originalPrice || 0,
                      discountedPrice: prod.discountedPrice || prod.originalPrice || 0,
                      quantity: 1,
                    };
                    addProductToCart(cartProduct);
                  }}
                  className="md:w-[260px] lg:w-[280px] md:max-w-[280px]"
                />
              ))}
            </div>

          </section>
        )}

        // Similar Products 
        {similarProducts.length > 0 && (
          <section className="mb-10 md:mb-14">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h2 className="text-xl md:text-2xl font-extrabold text-black">You May Also Like</h2>
            </div>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-3 md:pb-0">
              {similarProducts.map((p, i) => (
                <ProductCard 
                  key={i} 
                  product={p} 
                  mobileMode="carousel" 
                  desktopMode="carousel" 
                  onOpenProduct={(prod) => navigate(`/product/${prod.id}`)} 
                  onOpenVariants={(prod) => navigate(`/product/${prod.id}`)}
                  onAddToCart={(prod) => {
                    const cartProduct = {
                      id: prod.id,
                      productId: prod.id,
                      img: prod.img,
                      brand: prod.brand || 'Petric',
                      name: prod.name,
                      price: (prod.discountedPrice || prod.originalPrice || 0).toString(),
                      oldPrice: (prod.originalPrice || 0).toString(),
                      originalPrice: prod.originalPrice || 0,
                      discountedPrice: prod.discountedPrice || prod.originalPrice || 0,
                      quantity: 1,
                    };
                    addProductToCart(cartProduct);
                  }}
                  className="md:w-[260px] lg:w-[280px] md:max-w-[280px]"
                />
              ))}
            </div>
          </section>
        )}
*/}

      </main>

      <Footer />
    </div>
  );
}