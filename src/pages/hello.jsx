import React from "react";
import "./PetricLandingPage.css";
import landingPageImg from "../assets/landing_page.png";
import mobLimitedImg from "../assets/mob_limited.png";
import logoImg from "../assets/logocrop.png";
import lpWebVideo from "../assets/lp_web.mp4";
import lpMobVideo from "../assets/lp_mob.mp4";
import { get } from "../helper/api";
import HelloFooter from "../components/HelloFooter";
import { FiChevronRight, FiShield, FiPackage, FiZap, FiTag } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';

// ── Hardcoded brand list REMOVED — now fetched from API ──

const PetricLandingPage = () => {
  const [activeTesti, setActiveTesti] = React.useState(0);
  const [showSticky, setShowSticky] = React.useState(false);
  const [showStickySub, setShowStickySub] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [shopCategories, setShopCategories] = React.useState([]);
  const [heroBtnState, setHeroBtnState] = React.useState('hidden'); // hidden, visible, exiting
  const brandsScrollRef = React.useRef(null);
  const [brandsScrollPos, setBrandsScrollPos] = React.useState(0);
  const whatsappRef = React.useRef(null);
  const offerRef = React.useRef(null);

  // ── NEW: brands state fetched from API ──
  const [brands, setBrands] = React.useState([]);

  React.useEffect(() => {
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
          setShopCategories(formattedCategories.slice(0, 11));
        }
      } catch (error) {
        console.error('Error fetching shop categories:', error);
      }
    };
    fetchShopCategories();
  }, []);

  // ── NEW: fetch brands from API (same logic as NewHome.jsx) ──
  React.useEffect(() => {
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
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  const handleTimeUpdate = (e) => {
    const time = e.target.currentTime;
    if (time >= 5 && time <= 17) {
      if (heroBtnState !== 'visible') setHeroBtnState('visible');
    } else {
      if (heroBtnState === 'visible') setHeroBtnState('exiting');
      else if (time < 1 && heroBtnState === 'exiting') setHeroBtnState('hidden');
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      if (whatsappRef.current) {
        setShowSticky(whatsappRef.current.getBoundingClientRect().bottom < 0);
      }
      if (offerRef.current) {
        setShowStickySub(offerRef.current.getBoundingClientRect().bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTesti((prev) => (prev + 1) % 5);
    }, 4000);
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
    <div className="petric-landing">
      {/* ── SECTION 1: RUNNING STRIP ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
          <span>NOW DELIVERING IN GURGAON &amp; NEARBY AREAS</span>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="https://www.petric.in" className="nav-logo">
          <img src={logoImg} alt="Petric Logo" style={{ height: '32px', display: 'block' }} />
        </a>
        <a href="https://www.petric.in" className="nav-cta">Shop Now</a>
      </nav>

      {/* ── SECTION 2: HERO ── */}
      <section ref={whatsappRef} className={`hero ${isMobile ? 'hero-mobile' : 'hero-desktop'}`}>
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          autoPlay
          loop
          muted
          playsInline
          className="hero-bg-video"
          src={isMobile ? lpMobVideo : lpWebVideo}
          onTimeUpdate={handleTimeUpdate}
        />
      </section>

      {/* ── SECTION 3: OFFER ── */}
      <div ref={offerRef} className="offer-section">
        <div className="offer-grid">

          <div className="offer-card premium">
            <div className="offer-tag-container">
              <span className="offer-tag pulse-animation">Limited Offer</span>
            </div>
            <div className="offer-headline">
              Grab <span className="highlight-discount">Extra 8% OFF</span><br/>on your first 4 orders!
            </div>
            <div className="offer-divider"></div>
            <ul className="offer-list">
              <li><span className="check-icon">✨</span> Zero delivery fees</li>
              <li><span className="check-icon">✨</span> Zero platform fees</li>
              <li><span className="check-icon">✨</span> Zero COD charges</li>
            </ul>
          </div>

          <div className="offer-card premium" style={{ backgroundImage: `url(${mobLimitedImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '180px', border: 'none', boxShadow: '0 0 20px 4px rgba(255, 208, 0, 0.6)' }}>
            <div className="offer-tag-container" style={{ position: 'absolute', top: '12px', left: '12px', margin: 0 }}>
              <span className="offer-tag pulse-animation" style={{ padding: '4px 8px', fontSize: '9px', letterSpacing: '0.8px' }}>Limited Offer</span>
            </div>
            <ul className="offer-list" style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, justifyContent: 'center', gap: '6px', flexWrap: 'wrap', padding: '0 10px' }}>
              <li style={{ background: 'white', padding: '4px 8px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', fontSize: '9px', fontWeight: 700 }}><span className="check-icon">✨</span> Zero delivery fees</li>
              <li style={{ background: 'white', padding: '4px 8px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', fontSize: '9px', fontWeight: 700 }}><span className="check-icon">✨</span> Zero platform fees</li>
              <li style={{ background: 'white', padding: '4px 8px', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.15)', fontSize: '9px', fontWeight: 700 }}><span className="check-icon">✨</span> Zero COD charges</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── SHOP BY BRANDS ── */}
      <div className="section">
        <div className="mb-10">
          <div className="section-header" style={{ marginBottom: "20px" }}>
            <div className="section-title">Your Favourite Brands </div>
            <a href="https://www.petric.in/all-brands" className="text-base text-black underline underline-offset-4 decoration-1 transition-all duration-300 hover:text-gray-600 hover:underline-offset-2">See all</a>
          </div>

          {/* ── DESKTOP: single scrollable row — NewHome.jsx style ── */}
          <div className="hidden md:flex items-center gap-2">
            {brandsScrollPos > 0 && (
              <button
                onClick={() => brandsScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                className="shrink-0 bg-black text-white p-1 rounded-full flex items-center justify-center h-8 w-8 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <FiChevronRight className="h-5 w-5 text-[#FFD000] rotate-180" strokeWidth={2.5} />
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
                  <a
                    key={i}
                    href={`https://www.petric.in/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="relative shrink-0 flex flex-col items-center justify-center gap-2 w-24 cursor-pointer group"
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300">
                      <img
                        src={brand.img}
                        alt={brand.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {brand.alt && (
                      <span className="text-[11px] font-medium text-gray-600 text-center truncate w-full">
                        {brand.alt}
                      </span>
                    )}
                    {brand.discount && (
                      <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full leading-none">
                        {brand.discount} off
                      </span>
                    )}
                  </a>
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

          {/* ── MOBILE: two scrollable rows — NewHome.jsx style ── */}
          <div className="md:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-4 pb-2" style={{ width: 'max-content' }}>
              {/* Row 1 — even-indexed brands */}
              <div className="flex gap-4 px-2">
                {brands.filter((_, i) => i % 2 === 0).map((brand, i) => (
                  <a
                    key={i}
                    href={`https://www.petric.in/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group w-[calc((100vw-80px)/3.5)] max-w-[110px]"
                  >
                    <div className="rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 w-[calc((100vw-80px)/3.5)] h-[calc((100vw-80px)/3.5)] max-w-[110px] max-h-[110px]">
                      <img src={brand.img} alt={brand.alt} className="w-full h-full object-cover" />
                    </div>
                    {brand.alt && (
                      <span className="text-[11px] font-medium text-gray-600 text-center truncate w-full">
                        {brand.alt}
                      </span>
                    )}
                    {brand.discount && (
                      <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full leading-none">
                        {brand.discount} off
                      </span>
                    )}
                  </a>
                ))}
              </div>
              {/* Row 2 — odd-indexed brands */}
              <div className="flex gap-4 px-2">
                {brands.filter((_, i) => i % 2 === 1).map((brand, i) => (
                  <a
                    key={i}
                    href={`https://www.petric.in/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group w-[calc((100vw-80px)/3.5)] max-w-[110px]"
                  >
                    <div className="rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 w-[calc((100vw-80px)/3.5)] h-[calc((100vw-80px)/3.5)] max-w-[110px] max-h-[110px]">
                      <img src={brand.img} alt={brand.alt} className="w-full h-full object-cover" />
                    </div>
                    {brand.alt && (
                      <span className="text-[11px] font-medium text-gray-600 text-center truncate w-full">
                        {brand.alt}
                      </span>
                    )}
                    {brand.discount && (
                      <span className="text-[10px] font-bold text-[#FF5757] bg-red-50 border border-red-100 px-2 py-0.5 rounded-full leading-none">
                        {brand.discount} off
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── SECTION 4: CATEGORIES ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Categories for You </div>
          <a href="https://www.petric.in/all-categories" className="text-base text-black underline underline-offset-4 decoration-1 transition-all duration-300 hover:text-gray-600 hover:underline-offset-2">See all</a>
        </div>
        <div className="cat-grid">
          {shopCategories.map((category) => (
            <a key={category.id} href={`https://www.petric.in/category/${category.id}`} className="cat-card">
              {category.img ? (
                <img src={category.img} alt={category.name} className="cat-icon-img" />
              ) : (
                <span className="cat-icon">{category.name?.charAt(0)}</span>
              )}
              <span className="cat-name">{category.name}</span>
            </a>
          ))}
          <a href="https://www.petric.in/all-categories" className="cat-card see-more">
            <span className="cat-icon">＋</span>
            <span className="cat-name">More</span>
          </a>
        </div>
      </div>

      {/* ── SECTION 5: WHY PETRIC ── */}
      <div className="why-section">
        <div className="section-header">
          <div className="section-title">Why Petric</div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 w-full">
          <div className="why-card col-span-2 relative">
            <FiShield className="absolute -bottom-2 -right-1 text-black opacity-[0.03]" size={80} />
            <span className="why-icon text-black"><FiShield size={26} /></span>
            <div className="why-title relative z-10">Only authentic products</div>
            <div className="why-desc relative z-10">Official sources to ensure no expired and poor-quality products</div>
          </div>
          <div className="why-card col-span-1 relative">
            <FiPackage className="absolute -bottom-2 -right-1 text-black opacity-[0.03]" size={80} />
            <span className="why-icon text-black"><FiPackage size={26} /></span>
            <div className="why-title relative z-10">2000+ pet products</div>
            <div className="why-desc relative z-10">Shop your pet’s favourite brands</div>
          </div>
          <div className="why-card col-span-1 relative">
            <FiZap className="absolute -bottom-2 -right-1 text-black opacity-[0.03]" size={80} />
            <span className="why-icon text-black"><FiZap size={26} /></span>
            <div className="why-title relative z-10">Minutes, not hours</div>
            <div className="why-desc relative z-10">Gurgaon's fastest pet supply delivery</div>
          </div>
          <div className="why-card col-span-1 relative">
            <FiTag className="absolute -bottom-2 -right-1 text-black opacity-[0.03]" size={80} />
            <span className="why-icon text-black"><FiTag size={26} /></span>
            <div className="why-title relative z-10">Best deals</div>
            <div className="why-desc relative z-10">Discounts on MRP plus coupon off</div>
          </div>
          <div className="why-card col-span-1 relative">
            <FaRupeeSign className="absolute -bottom-2 -right-1 text-black opacity-[0.03]" size={80} />
            <span className="why-icon text-black"><FaRupeeSign size={26} /></span>
            <div className="why-title relative z-10">No hidden charges</div>
            <div className="why-desc relative z-10">What you see is what you pay</div>
          </div>
        </div>
      </div>

      {/* ── SECTION 6: TESTIMONIALS ── */}
      <div className="testi-section">
        <div className="section-header">
          <div className="section-title">Pet parents love us</div>
        </div>
        <div className="testi-scroll">

          <div className={`testi-card ${activeTesti === 0 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"You have made an app that was much much needed for pet parents"</div>
            <div className="testi-author">
              <div className="author-dot">🐕</div>
              <div>
                <div className="author-name">Nidhi · Dog parent</div>
                <div className="author-sub">Gurugram</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 1 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"Thanks for adding a layer of convenience for all pet parents"</div>
            <div className="testi-author">
              <div className="author-dot">🐈</div>
              <div>
                <div className="author-name">Megha · Cat parent</div>
                <div className="author-sub">Gurugram</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 2 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"This app was very much needed. Keep up the good work"</div>
            <div className="testi-author">
              <div className="author-dot">🐶</div>
              <div>
                <div className="author-name">Utkarsh · Dog parent</div>
                <div className="author-sub">Gurugram</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 3 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"I love how you operate. Will definitely put in a word with my friends"</div>
            <div className="testi-author">
              <div className="author-dot">🐱</div>
              <div>
                <div className="author-name">Bhawna · Cat parent</div>
                <div className="author-sub">Gurugram</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 4 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"I've placed 2 orders just now and can't thank you enough for what you've created."</div>
            <div className="testi-author">
              <div className="author-dot">🐾</div>
              <div>
                <div className="author-name">Akshay · Dog parent</div>
                <div className="author-sub">Gurugram</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="divider"></div>

      {/* ── SECTION 7: FINAL CTA ── */}
      <div className="final-cta">
        <h2>Every pet.<br/>Every need.<br/>Every time.</h2>
        <p className="final-cta-sub">Can't find an item? We'll get it for you.</p>
        <div className="final-cta-btns">
          <a href="https://wa.me/918295756962" className="btn-outline-dark">Enquire on WhatsAp</a>
          <a href="https://www.petric.in" className="btn-dark">See all Products →</a>
        </div>
      </div>

      {/* ── SECTION 8: STICKY BAR ── */}
      <div className={`sticky-bar ${showSticky ? 'sticky-enter' : 'sticky-exit'}`}>
        <a href="https://www.petric.in">
          Shop Now (Extra 8% Off, First 4 Orders)
        </a>
        {showStickySub && (
          <div className="sticky-sub">
            <span className="sub-item" style={{ animationDelay: '0s' }}>
              <span className="text-[#00B85C] text-sm leading-none">✓</span> No delivery fee
            </span>
            <span className="sub-item" style={{ animationDelay: '0.1s' }}>
              <span className="text-[#00B85C] text-sm leading-none">✓</span> No platform fee
            </span>
            <span className="sub-item" style={{ animationDelay: '0.2s' }}>
              <span className="text-[#00B85C] text-sm leading-none">✓</span> No COD charges
            </span>
          </div>
        )}
      </div>

    </div>
    
    {/* Global Footer component */}
    <HelloFooter />

    <div className="sticky-spacer"></div>
    </>
  );
};

export default PetricLandingPage;