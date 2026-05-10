import React, { useState } from 'react';
import { FiChevronDown, FiMinus, FiPlus, FiShoppingBag, FiStar, FiCheck, FiHelpCircle } from 'react-icons/fi';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import product1 from '../assets/product1.png';

const productData = {
  name: 'Farmina VetLife Diabetic Canine Formula Adult Dog Dry Food',
  brand: 'Vet-Life',
  category: 'Dog Food ; Vet Food',
  petType: 'dog',
  lifeStage: 'Adult',
  breedSize: 'Small ; Medium ; Large',
  flavour: '',
  productType: 'Dry Food ; Vet Recommended',
  availableSizes: ['2kg', '12kg'],
  seoTitle: 'Farmina VetLife Diabetic Canine Formula Adult | Petric',
  metaDescription: 'Vet-recommended farmina vetlife diabetic canine formula adult dog dry food. Formulated for dog\'s specific health need. Delivered in minutes on Petric.',
  h1Headline: 'Because Your Dog\'s Health Is Non-Negotiable',
  productInfo: 'When your vet mentions a diabetic condition, the next question every dog parent asks is: "But will he/she actually eat it?" With Farmina VetLife Diabetic Canine Formula Adult Dog Dry Food, the answer is almost always yes. Formulated by veterinary nutritionists at Vet-Life, this diet takes care of the clinical side so you can focus on the belly rubs and long walks.',
  keyBenefits: [
    'Clinically formulated to support diabetic management',
    'Developed by veterinary nutritionists',
    'No supplements needed alongside',
    'Suitable for all breed sizes'
  ],
  usageTip: 'Always transition gradually over 7–10 days. Mix increasing amounts of this food with your dog\'s current diet to avoid tummy upset.',
  faqs: [
    {
      question: 'Does my dog need a vet\'s prescription to order this?',
      answer: 'Not on Petric! You can buy it without a prescription on our platform. However, vet diet foods work best when prescribed for a specific condition, so if your vet has recommended it, feel free to buy it. If you\'re considering it independently, a quick vet chat never hurts.'
    },
    {
      question: 'Can I mix this with my dog\'s regular food?',
      answer: 'In general, therapeutic diets like this are most effective when fed as the sole source of nutrition, as mixing can dilute the clinical benefit. If you\'re transitioning, do it gradually over 7–10 days. It\'s always best to consult a vet or reach out to us via WhatsApp.'
    },
    {
      question: 'How long will my dog need to stay on this diet?',
      answer: 'That really depends on your dog\'s condition and your vet\'s guidance. Some dogs stay on therapeutic diets long-term, others transition off after a recovery period. The best person to answer this is your vet, but we\'re here to make sure you never run out while they\'re on it.'
    }
  ],
  description: 'Farmina Vet Life Diabetic Canine Formula Adult Dog Dry Food is a specially crafted therapeutic diet designed to help manage diabetes mellitus in adult dogs. Formulated with controlled levels of carbohydrates, low glycemic ingredients, and high-quality protein sources, this prescription diet supports blood sugar regulation and helps maintain a healthy weight. As part of the trusted Farmina dog food Vet Life range, this grain-free formula promotes metabolic balance and overall wellness in diabetic dogs.',
  price: '₹1,850',
  oldPrice: '₹2,100',
  discount: '12%'
};

const productTabs = {
  description: {
    label: 'Description',
    title: productData.productInfo,
    body: productData.description,
    points: productData.keyBenefits.map(b => ({ text: b, icon: FiCheck })),
  },
  details: {
    label: 'Product Details',
    title: 'Product Specifications',
    body: 'Complete nutritional specifications for this therapeutic diet.',
    points: [
      { text: `Brand: ${productData.brand}`, icon: FiCheck },
      { text: `Category: ${productData.category}`, icon: FiCheck },
      { text: `Pet Type: ${productData.petType}`, icon: FiCheck },
      { text: `Life Stage: ${productData.lifeStage}`, icon: FiCheck },
      { text: `Breed Size: ${productData.breedSize}`, icon: FiCheck },
      { text: `Product Type: ${productData.productType}`, icon: FiCheck },
      { text: `Available Sizes: ${productData.availableSizes.join(', ')}`, icon: FiCheck },
    ],
  },
  usage: {
    label: 'Usage & Feeding',
    title: 'How to Feed',
    body: productData.usageTip,
    points: [
      { text: 'Transition gradually over 7–10 days', icon: FiCheck },
      { text: 'Mix with current food initially', icon: FiCheck },
      { text: 'Always keep fresh water available', icon: FiCheck },
      { text: 'Feed as sole diet for best results', icon: FiCheck },
    ],
  },
  faqs: {
    label: 'FAQs',
    title: 'Frequently Asked Questions',
    body: 'Get answers to common questions about this product.',
    points: productData.faqs.map(faq => ({ text: faq.question, icon: FiHelpCircle, answer: faq.answer })),
  },
};

function ProductCard({ product }) {
  return (
    <article className="bg-white border border-gray-100 rounded-3xl w-[45vw] md:w-full shrink-0 snap-center md:snap-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden group p-3 md:p-4 shadow-sm">
      <div className="w-full h-28 md:h-36 flex items-center justify-center bg-gray-50 rounded-xl mb-3 p-1 relative">
        <img src={product.img} alt={product.name} className="h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute top-2 left-2 bg-[#FF5757] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          15% Off
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">{product.brand}</p>
        <h3 className="font-bold text-black text-xs md:text-sm line-clamp-2 mb-1">{product.name}</h3>
        <span className="text-[10px] md:text-xs text-gray-500 mb-2">{product.weight || '1 kg'}</span>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[9px] md:text-[10px] line-through">₹{product.oldPrice || '999'}</span>
            <span className="font-bold text-black text-sm md:text-lg">{product.price || '₹850'}</span>
          </div>
          <button className="bg-[#FFD000] text-black text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 md:py-1.5 rounded-full hover:bg-[#ffdb33] hover:scale-105 transition-all shadow-sm">
            ADD
          </button>
        </div>
      </div>
    </article>
  );
}

const similarProducts = [
  { img: product1, brand: 'Farmina', name: 'VetLife Renal Canine Formula', price: '₹1,950', oldPrice: '2,200' },
  { img: product1, brand: 'Farmina', name: 'VetLife Hepatic Canine Formula', price: '₹1,800', oldPrice: '2,050' },
  { img: product1, brand: 'Farmina', name: 'N&D Pumpkin Dog Food Adult', price: '₹2,200', oldPrice: '2,500' },
  { img: product1, brand: 'Royal Canin', name: 'Glybalance Dog Food', price: '₹1,750', oldPrice: '1,999' },
];

export default function Sample() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [selectedSize, setSelectedSize] = useState(productData.availableSizes[0]);
  const activeContent = productTabs[activeTab];

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <NewHomeNavbar />

      <main className="mx-auto max-w-[1400px] px-4 md:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="mb-5 text-xs md:text-sm font-bold text-gray-700 underline underline-offset-4 decoration-1">
          Home / {productData.category.split(' ; ')[0]} / {productData.brand} / {productData.name}
        </div>

        {/* Product Section */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(340px,1fr)]">
          {/* Product Image */}
          <div className="min-h-[280px] rounded-[2rem] bg-gray-50 border border-gray-100 p-6 md:min-h-[450px] flex items-center justify-center overflow-hidden group shadow-sm">
            <img src={product1} alt={productData.name} className="max-h-[340px] w-auto object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
          </div>

          {/* Product Info Sidebar */}
          <aside className="rounded-3xl border border-gray-100 bg-white p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="inline-flex items-center rounded-full bg-[#FF5757] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                Vet Recommended
              </div>
              <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700 shadow-sm">
                Therapeutic Diet
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-extrabold leading-tight md:text-xl mb-1">
              {productData.name}
            </h1>
            <p className="text-sm font-bold text-gray-600">by: {productData.brand}</p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
              <span className="flex items-center gap-1 font-extrabold">
                <FiStar className="h-4 w-4 fill-[#FFD000] text-[#FFD000]" />
                4.9
              </span>
              <span>247 diabetic dogs managed with this</span>
            </div>

            {/* Size Selector */}
            <div className="mt-4">
              <p className="text-xs font-bold text-gray-500 mb-2">Select Size</p>
              <div className="flex gap-2">
                {productData.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 px-4 rounded-xl border text-sm font-bold transition-all ${
                      selectedSize === size
                        ? 'border-[#FFD000] bg-[#FFD000] text-black shadow-sm'
                        : 'border-gray-100 bg-gray-50 hover:border-[#FFD000]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-4 flex flex-wrap items-baseline gap-4">
              <p className="text-xl md:text-2xl font-extrabold">MRP: {productData.price}</p>
              <p className="text-sm font-bold text-gray-500 line-through">{productData.oldPrice}</p>
              <p className="text-sm font-extrabold text-green-700">{productData.discount} off</p>
            </div>

            {/* Benefits Summary */}
            <div className="mt-4 space-y-2">
              {productData.keyBenefits.slice(0, 3).map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                  <FiCheck className="h-4 w-4 text-green-600 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex h-10 items-center overflow-hidden rounded-full border border-gray-100 bg-gray-50 shadow-sm">
                <button
                  className="grid h-10 w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="grid h-10 min-w-10 place-items-center bg-white text-sm font-extrabold">{quantity}</span>
                <button
                  className="grid h-10 w-10 place-items-center hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
              <button className="flex h-10 items-center gap-2 rounded-full bg-[#FFD000] px-8 text-sm font-extrabold hover:bg-[#ffdb33] hover:scale-105 hover:shadow-md transition-all">
                <FiShoppingBag />
                Add to Cart
              </button>
            </div>

            {/* Usage Tip */}
            <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-3">
              <p className="text-xs font-bold text-blue-800 mb-1">Feeding Tip</p>
              <p className="text-xs text-blue-700">{productData.usageTip}</p>
            </div>
          </aside>
        </section>

        {/* H1 Headline Banner */}
        <section className="mt-8 rounded-[2rem] bg-gradient-to-r from-[#FFF9E5] to-[#F8F9FA] border border-[#FFE880] p-6 md:p-8 shadow-sm">
          <h2 className="text-xl md:text-2xl font-extrabold text-black">{productData.h1Headline}</h2>
          <p className="mt-3 text-sm text-gray-700 leading-relaxed">{productData.productInfo}</p>
        </section>

        {/* Product Tabs Navigation */}
        <nav className="mt-8 grid max-w-[820px] grid-cols-4 gap-2 text-sm font-extrabold">
          {Object.entries(productTabs).map(([key, tab]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                className={`rounded-full px-3 py-2 text-center transition-all text-xs md:text-sm ${
                  isActive
                    ? 'bg-[#FFD000] shadow-sm'
                    : 'bg-gray-50 hover:bg-[#FFD000]'
                }`}
                onClick={() => setActiveTab(key)}
                type="button"
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Tab Content */}
        <section className="mt-4 rounded-[2rem] border border-gray-100 bg-white p-5 md:p-8 shadow-sm">
          <div className="rounded-2xl bg-gray-50 p-5 md:p-6">
            <h2 className="text-lg font-extrabold">{activeContent.title}</h2>

            {/* FAQ Tab - Special Rendering */}
            {activeTab === 'faqs' ? (
              <div className="mt-4 space-y-3">
                {activeContent.points.map((faq, i) => (
                  <div key={i} className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left text-sm font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      <span>{faq.text}</span>
                      <FiChevronDown className={`h-4 w-4 shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFaq === i && (
                      <div className="px-4 pb-4 pt-0 text-xs text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-gray-700">
                  {activeContent.body}
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                  {activeContent.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-2xl bg-white border border-gray-100 p-4 text-sm font-bold text-gray-800 shadow-sm">
                      <point.icon className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Similar Products */}
        <section className="mt-10 pb-8">
          <h2 className="mb-6 text-2xl font-bold text-black">Products like this...</h2>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory [&::-webkit-scrollbar]:hidden pb-4 pt-2 px-2 md:p-0">
            {similarProducts.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}