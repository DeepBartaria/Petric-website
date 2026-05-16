import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiChevronDown, FiMinus, FiPlus, FiShoppingBag, FiStar, FiCheck, FiHelpCircle } from 'react-icons/fi';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import { get, post } from '../helper/api';

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <article 
      onClick={() => {
        navigate(`/product/${product.id}`);
        window.scrollTo(0, 0);
      }}
      className="bg-white border border-gray-100 rounded-2xl w-[45vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-2.5 md:p-4 shadow-sm"
    >
      <div className="w-full h-24 md:h-32 flex items-center justify-center bg-gray-50 rounded-xl mb-2 md:mb-3 p-1 relative">
        <img src={product.img || product.productImage} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
        {product.discount && (
          <div className="absolute top-1.5 left-1.5 bg-[#FF5757] text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
            {product.discount}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow px-0.5">
        <p className="text-[9px] md:text-xs text-gray-500 mb-0.5">{product.brand}</p>
        <h3 className="font-bold text-black text-[10px] md:text-sm line-clamp-2 mb-1">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-gray-400 text-[8px] md:text-[10px] line-through">₹{product.oldPrice}</span>
            )}
            <span className="font-bold text-black text-sm md:text-base">₹{product.price}</span>
          </div>
          <button className="bg-[#FFD000] text-black text-[9px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full hover:bg-[#ffdb33] hover:scale-105 transition-all shadow-sm">
            ADD
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await get(`product/details/single/${id}`);
        if (res.type === 'success' && res.product) {
          const fetchedProduct = res.product;
          setProduct(fetchedProduct);
          if (fetchedProduct.variants && fetchedProduct.variants.length > 0) {
            setSelectedSize(fetchedProduct.variants[0]);
          }
          setMainImage(fetchedProduct.productImage);
          
          // Fetch similar products based on the category
          const categoryId = Array.isArray(fetchedProduct.productCategory) 
            ? fetchedProduct.productCategory[0]?._id 
            : fetchedProduct.productCategory?._id;
            
          if (categoryId) {
             try {
                // Using post since list/all/forUser requires it
                const similarRes = await post('product/list/all/forUser', {
                   page: 1,
                   limit: 5,
                   productCategory: [categoryId]
                });
                
                if (similarRes && similarRes.products) {
                   // Filter out the current product and take up to 4
                   const filtered = similarRes.products
                     .filter(p => p._id !== fetchedProduct._id)
                     .slice(0, 4)
                     .map(p => {
                       const variant = p.variants?.[0] || {};
                       return {
                         id: p._id,
                         img: p.productImage,
                         brand: p.brand?.name || 'Petric',
                         name: p.name,
                         price: variant.discountedPrice || variant.originalPrice || p.originalPrice || 0,
                         oldPrice: variant.originalPrice || p.originalPrice,
                         discount: variant.discountedPrice && variant.originalPrice && variant.originalPrice > variant.discountedPrice 
                           ? Math.round(((variant.originalPrice - variant.discountedPrice) / variant.originalPrice) * 100) + '%'
                           : ''
                       };
                     });
                   setSimilarProducts(filtered);
                }
             } catch (err) {
                console.error("Failed to load similar products", err);
             }
          }
        }
      } catch (err) {
        console.error("Failed to load product details", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans text-black flex flex-col">
        <NewHomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FFD000] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white font-sans text-black flex flex-col">
        <NewHomeNavbar />
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-2xl font-bold">Product not found.</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const brandName = product.brand?.name || (Array.isArray(product.brand) ? product.brand[0]?.name : 'Petric');
  const categoryName = (Array.isArray(product.productCategory) ? product.productCategory[0]?.name : product.productCategory?.name) || 'Category';
  const availableSizes = product.variants && product.variants.length > 0 ? product.variants : [];
  
  // Calculate price based on selected variant or fallback to product base price
  const currentPrice = selectedSize ? (selectedSize.discountedPrice || selectedSize.originalPrice) : (product.discountedPrice || product.originalPrice || 0);
  const oldPrice = selectedSize ? selectedSize.originalPrice : product.originalPrice;
  const hasDiscount = oldPrice && oldPrice > currentPrice;
  const discountPercent = hasDiscount ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

  const productTabs = {
    description: {
      label: 'Description',
      title: 'Product Information',
      body: product.description || 'No detailed description available for this product.',
      points: [
        { text: 'Premium Quality Assured', icon: FiCheck },
        { text: '100% Authentic Product', icon: FiCheck }
      ],
    },
    details: {
      label: 'Details',
      title: 'Specifications',
      body: 'Complete details for this product.',
      points: [
        { text: `Brand: ${brandName}`, icon: FiCheck },
        { text: `Category: ${categoryName}`, icon: FiCheck },
        { text: `Pet Type: ${Array.isArray(product.petType) ? product.petType.join(', ') : (product.petType || 'All Pets')}`, icon: FiCheck },
        ...(Array.isArray(product.lifeStage) && product.lifeStage.length > 0 ? [{ text: `Life Stage: ${product.lifeStage.map(l => l.name).join(', ')}`, icon: FiCheck }] : []),
        ...(Array.isArray(product.breedSize) && product.breedSize.length > 0 ? [{ text: `Breed Size: ${product.breedSize.map(b => b.name).join(', ')}`, icon: FiCheck }] : []),
      ],
    },
    usage: {
      label: 'Usage',
      title: 'How to use',
      body: product.shortDescription || 'Follow general guidelines or consult your vet.',
      points: [
        { text: 'Always keep fresh water available', icon: FiCheck },
      ],
    },
    faqs: {
      label: 'FAQs',
      title: 'Frequently Asked Questions',
      body: 'Get answers to common questions about this product.',
      points: [
        { text: 'Can I order this online?', icon: FiHelpCircle, answer: 'Yes, it is available for delivery.' }
      ],
    },
  };

  const activeContent = productTabs[activeTab];

  // Removed dummy similar products

  const galleryImages = [product.productImage, ...(product.productGallery || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <NewHomeNavbar />

      <main className="mx-auto max-w-[1400px] px-3 md:px-8 py-4 md:py-10">
        {/* Breadcrumb */}
        <div className="mb-4 text-[10px] md:text-sm font-medium text-gray-600 overflow-x-auto whitespace-nowrap">
          Home / {categoryName} / {brandName}
        </div>

        <section className="flex flex-col md:grid md:grid-cols-[1.6fr_1fr] gap-4 md:gap-6">
          {/* Product Image & Gallery */}
          <div className="flex flex-col gap-3">
            <div className="min-h-[240px] md:min-h-[450px] rounded-2xl md:rounded-[2rem] bg-gray-50 border border-gray-100 p-4 md:p-6 flex items-center justify-center overflow-hidden shadow-sm">
              <img src={mainImage} alt={product.name} className="max-h-[280px] md:max-h-[340px] w-auto object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105" />
            </div>
            {galleryImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                {galleryImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setMainImage(img)}
                    className={`h-16 w-16 md:h-20 md:w-20 rounded-xl border-2 flex items-center justify-center bg-gray-50 shrink-0 transition-all ${mainImage === img ? 'border-[#FFD000]' : 'border-gray-100 hover:border-gray-300'}`}
                  >
                    <img src={img} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Sidebar */}
          <aside className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white p-3 md:p-6 shadow-sm transition-all duration-300 hover:shadow-md">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              <div className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-blue-700 shadow-sm">
                Petric Assured
              </div>
            </div>

            {/* Title */}
            <h1 className="text-base md:text-xl font-extrabold leading-tight mb-1">
              {product.name}
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-600">by: {brandName}</p>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2 text-xs md:text-sm text-gray-700">
              <span className="flex items-center gap-0.5 font-extrabold">
                <FiStar className="h-3.5 w-3.5 fill-[#FFD000] text-[#FFD000]" />
                4.9
              </span>
            </div>

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="mt-3">
                <p className="text-[10px] md:text-xs font-bold text-gray-500 mb-1.5">Select Variant</p>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 md:h-10 px-3 rounded-lg border text-xs md:text-sm font-bold transition-all ${
                        selectedSize?._id === size._id
                          ? 'border-[#FFD000] bg-[#FFD000] text-black shadow-sm'
                          : 'border-gray-100 bg-gray-50 hover:border-[#FFD000]'
                      }`}
                    >
                      {size.unit || size.weight || `Variant ${index + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <p className="text-lg md:text-2xl font-extrabold">₹{currentPrice}</p>
              {hasDiscount && (
                <>
                  <p className="text-xs md:text-sm font-bold text-gray-400 line-through">₹{oldPrice}</p>
                  <p className="text-xs md:text-sm font-extrabold text-green-600">{discountPercent}% off</p>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-9 md:h-10 items-center overflow-hidden rounded-full border border-gray-100 bg-gray-50 shadow-sm">
                <button
                  className="grid h-9 md:h-10 w-8 md:w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="h-3.5 w-3.5" />
                </button>
                <span className="grid h-9 md:h-10 min-w-8 md:min-w-10 place-items-center bg-white text-xs md:text-sm font-extrabold">{quantity}</span>
                <button
                  className="grid h-9 md:h-10 w-8 md:w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <FiPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button className="flex-1 flex h-9 md:h-10 items-center justify-center gap-1.5 rounded-full bg-[#FFD000] px-4 text-xs md:text-sm font-extrabold hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all">
                <FiShoppingBag className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </aside>
        </section>

        {/* Product Tabs Navigation */}
        <nav className="mt-6 md:mt-8 grid grid-cols-4 gap-1.5 md:gap-2 text-xs md:text-sm font-extrabold">
          {Object.entries(productTabs).map(([key, tab]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                className={`rounded-full px-2 py-1.5 md:px-3 md:py-2 text-center transition-all truncate ${
                  isActive
                    ? 'bg-[#FFD000] shadow-sm'
                    : 'bg-gray-50 hover:bg-[#FFD000]'
                }`}
                onClick={() => setActiveTab(key)}
                type="button"
              >
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <section className="mt-3 rounded-2xl border border-gray-100 bg-white p-3 md:p-8 shadow-sm">
          <div className="rounded-xl md:rounded-2xl bg-gray-50 p-3 md:p-6">
            <h2 className="text-sm md:text-lg font-extrabold">{activeContent.title}</h2>

            {/* FAQ Tab - Special Rendering */}
            {activeTab === 'faqs' ? (
              <div className="mt-3 space-y-2">
                {activeContent.points.map((faq, i) => (
                  <div key={i} className="rounded-lg bg-white border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-3 text-left text-xs md:text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <span className="pr-2">{faq.text}</span>
                      <FiChevronDown className={`h-4 w-4 shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFaq === i && (
                      <div className="px-3 pb-3 pt-1 text-[10px] md:text-xs text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-2 text-xs md:text-sm leading-5 md:leading-6 text-gray-700">
                  {activeContent.body}
                </p>
                <div className="mt-4 grid gap-2 md:gap-3 md:grid-cols-2">
                  {activeContent.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl bg-white border border-gray-100 p-3 text-[10px] md:text-sm font-medium text-gray-800 shadow-sm">
                      <point.icon className="h-3.5 w-3.5 mt-0.5 text-green-600 shrink-0" />
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}