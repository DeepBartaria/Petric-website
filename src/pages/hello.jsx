import React from "react";
import "./PetricLandingPage.css";
import landingPageImg from "../assets/landing_page.png";
import logoImg from "../assets/logocrop.png";
import lpWebVideo from "../assets/lp_web.mp4";
import lpMobVideo from "../assets/lp_mob.mp4";
import { get } from "../helper/api";
import HelloFooter from "../components/HelloFooter";
import { FiChevronRight } from 'react-icons/fi';
import pedigree from '../assets/pedigree.png';
import royalcanin from '../assets/royalcanin.png';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import sheba from '../assets/sheba.png';
import whiskas from '../assets/whiskas.png';
import drools from '../assets/drools.png';
import brand3 from '../assets/brand3.png';
import brand4 from '../assets/brand4.png';
import brand5 from '../assets/brand5.png';
import brand6 from '../assets/brand6.png';

const brands = [
  { id: 'b1', name: 'Pedigree', img: pedigree, alt: 'Pedigree', discount: '26%' },
  { id: 'b2', name: 'Royal Canin', img: royalcanin, alt: 'Royal Canin', discount: '27%' },
  { id: 'b3', name: 'Farmina N&D', img: brand1, alt: 'Farmina N&D', discount: '28%' },
  { id: 'b4', name: 'Vet-Life', img: brand2, alt: 'Vet-Life', discount: '23%' },
  { id: 'b5', name: 'Sheba', img: sheba, alt: 'Sheba', discount: '24%' },
  { id: 'b6', name: 'Whiskas', img: whiskas, alt: 'Whiskas', discount: '24%' },
  { id: 'b7', name: 'Drools', img: drools, alt: 'Drools', discount: '28%' },
  { id: 'b8', name: 'HUFT', img: brand3, alt: 'HUFT', discount: '17%' },
  { id: 'b9', name: 'JerHigh', img: brand4, alt: 'JerHigh', discount: '15%' },
  { id: 'b10', name: 'Purina Pro', img: brand5, alt: 'Purina Pro', discount: '23%' },
  { id: 'b11', name: 'Farmina Matisse', img: brand6, alt: 'Farmina Matisse', discount: '24%' },
];
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
        {/*
        <div className="hero-badge">
          <div className="live-dot"></div>
          Delivering right now
        </div>
        */}
        {/*
        <h1>Pet supplies.<br/><span className="highlight">In minutes.</span></h1>
        <p className="hero-body">Everything you need delivered straight to your door. Fast, reliable, and hassle-free.</p>
        */}

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

        </div>
      </div>

      {/* ── SECTION 4: CATEGORIES ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-title">Shop by Category</div>
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

      {/* ── SHOP BY BRANDS ── */}
      <div className="section">
        <div className="mb-10">
          <div className="section-header" style={{ marginBottom: "20px" }}>
            <div className="section-title">Shop by Brands</div>
            <a href="https://www.petric.in/all-brands" className="text-base text-black underline underline-offset-4 decoration-1 transition-all duration-300 hover:text-gray-600 hover:underline-offset-2">See all</a>
          </div>

          {/* ── DESKTOP: single scrollable row ── */}
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
                    className="relative shrink-0 flex flex-col items-center justify-center gap-2 w-28 cursor-pointer group mt-4 pb-4"
                  >
                    <div className="relative group cursor-pointer w-24 h-24 mx-2">
                      <div className="w-24 h-24 rounded-full overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 flex items-center justify-center">
                        <img src={brand.img} alt={brand.alt} className="w-[85%] h-[85%] rounded-full object-contain transition-transform duration-300 group-hover:scale-105" />
                      </div>
                      {brand.discount && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[76px] h-[36px] z-10 drop-shadow-sm pointer-events-none">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <path 
                              d="M 10,15 Q 50,-5 90,15 A 10,10 0 0,1 90,35 Q 50,15 10,35 A 10,10 0 0,1 10,15 Z" 
                              fill="#E32731" 
                            />
                            <defs>
                              <path id={`textPath-desktop-${i}`} d="M 10,27 Q 50,7 90,27" />
                            </defs>
                            <text fill="white" fontSize="16" fontWeight="900" fontFamily='"Balsamiq Sans", cursive' letterSpacing="0.5px">
                              <textPath href={`#textPath-desktop-${i}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                                {brand.discount} off
                              </textPath>
                            </text>
                          </svg>
                        </div>
                      )}
                    </div>
                    {brand.alt && (
                      <span className="text-[12px] font-bold text-[#4B5563] text-center w-full mt-2 tracking-wide truncate">{brand.alt}</span>
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

          {/* ── MOBILE: two scrollable rows ── */}
          <div className="md:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-4 pb-2" style={{ width: 'max-content' }}>
              {/* Row 1 — odd-indexed brands */}
              <div className="flex gap-4 px-2">
                {brands.filter((_, i) => i % 2 === 0).map((brand, i) => (
                  <a
                    key={i}
                    href={`https://www.petric.in/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="flex flex-col items-center shrink-0 cursor-pointer group w-[calc((100vw-80px)/3.5)] max-w-[110px] pt-2 pb-4 gap-3"
                  >
                    <div className="relative">
                      <div className="rounded-full overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 w-[calc((100vw-80px)/3.5)] h-[calc((100vw-80px)/3.5)] max-w-[110px] max-h-[110px] bg-white border border-gray-50 flex items-center justify-center">
                        <img src={brand.img} alt={brand.alt} className="w-[85%] h-[85%] rounded-full object-contain" />
                      </div>
                      {brand.discount && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[72px] h-[34px] z-10 drop-shadow-sm pointer-events-none">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <path 
                              d="M 10,15 Q 50,-5 90,15 A 10,10 0 0,1 90,35 Q 50,15 10,35 A 10,10 0 0,1 10,15 Z" 
                              fill="#E32731" 
                            />
                            <defs>
                              <path id={`textPath-mob1-${i}`} d="M 10,27 Q 50,7 90,27" />
                            </defs>
                            <text fill="white" fontSize="16" fontWeight="900" fontFamily='"Balsamiq Sans", cursive' letterSpacing="0.5px">
                              <textPath href={`#textPath-mob1-${i}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                                {brand.discount} off
                              </textPath>
                            </text>
                          </svg>
                        </div>
                      )}
                    </div>
                    {brand.alt && (
                      <span className="text-[12px] font-bold text-[#4B5563] text-center truncate w-full tracking-wide">{brand.alt}</span>
                    )}
                  </a>
                ))}
              </div>
              {/* Row 2 — even-indexed brands */}
              <div className="flex gap-4 px-2">
                {brands.filter((_, i) => i % 2 === 1).map((brand, i) => (
                  <a
                    key={i}
                    href={`https://www.petric.in/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`}
                    className="flex flex-col items-center shrink-0 cursor-pointer group w-[calc((100vw-80px)/3.5)] max-w-[110px] pt-2 pb-4 gap-3"
                  >
                    <div className="relative">
                      <div className="rounded-full overflow-visible shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300 group-active:scale-95 w-[calc((100vw-80px)/3.5)] h-[calc((100vw-80px)/3.5)] max-w-[110px] max-h-[110px] bg-white border border-gray-50 flex items-center justify-center">
                        <img src={brand.img} alt={brand.alt} className="w-[85%] h-[85%] rounded-full object-contain" />
                      </div>
                      {brand.discount && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[72px] h-[34px] z-10 drop-shadow-sm pointer-events-none">
                          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                            <path 
                              d="M 10,15 Q 50,-5 90,15 A 10,10 0 0,1 90,35 Q 50,15 10,35 A 10,10 0 0,1 10,15 Z" 
                              fill="#E32731" 
                            />
                            <defs>
                              <path id={`textPath-mob2-${i}`} d="M 10,27 Q 50,7 90,27" />
                            </defs>
                            <text fill="white" fontSize="16" fontWeight="900" fontFamily='"Balsamiq Sans", cursive' letterSpacing="0.5px">
                              <textPath href={`#textPath-mob2-${i}`} startOffset="50%" textAnchor="middle" dominantBaseline="middle">
                                {brand.discount} off
                              </textPath>
                            </text>
                          </svg>
                        </div>
                      )}
                    </div>
                    {brand.alt && (
                      <span className="text-[12px] font-bold text-[#4B5563] text-center truncate w-full tracking-wide">{brand.alt}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 5: WHY PETRIC ── */}
      <div className="why-section">
        <div className="section-header">
          <div className="section-title">Why Petric</div>
        </div>
        <div className="why-grid">
          <div className="why-card" data-icon="⚡">
            <span className="why-icon">⚡</span>
            <div className="why-title">Minutes, not hours</div>
            <div className="why-desc">Gurgaon's fastest pet supply delivery</div>
          </div>
          <div className="why-card" data-icon="📦">
            <span className="why-icon">📦</span>
            <div className="why-title">2000+ pet products</div>
            <div className="why-desc">Shop your favourite brands and products</div>
          </div>
          <div className="why-card" data-icon="🏷️">
            <span className="why-icon">🏷️</span>
            <div className="why-title">Best offers</div>
            <div className="why-desc">Discounts on MRP plus coupon off</div>
          </div>
          <div className="why-card" data-icon="₹">
            <span className="why-icon">₹</span>
            <div className="why-title">No hidden charges</div>
            <div className="why-desc">What you see is what you pay</div>
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
                <div className="author-name">Nidhi</div>
                <div className="author-sub">Gurugram · Pet parent</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 1 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"Thanks for adding a layer of convenience for all pet parents"</div>
            <div className="testi-author">
              <div className="author-dot">🐈</div>
              <div>
                <div className="author-name">Pet parent</div>
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
                <div className="author-name">Utkarsh</div>
                <div className="author-sub">Gurugram · Pet parent</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 3 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"I love how you operate. Will definitely put in a word with my friends"</div>
            <div className="testi-author">
              <div className="author-dot">🐱</div>
              <div>
                <div className="author-name">Pet parent</div>
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
                <div className="author-name">Pet parent</div>
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
        <p className="final-cta-sub">Tell us, we'll get it for you.</p>
        <div className="final-cta-btns">
          <a href="https://wa.me/918295756962" className="btn-outline-dark">Request an Item</a>
          <a href="https://www.petric.in" className="btn-dark">See Products →</a>
        </div>
      </div>



      {/* Footer */}
      {/* 
      <div className="footer">
        <strong>Petric</strong><br/>
        Delivering in Gurgaon &amp; nearby areas<br/>
        No delivery · No platform · No COD fees
      </div> 
      */}


      {/* ── SECTION 8: STICKY BAR ── */}
      <div className={`sticky-bar ${showSticky ? 'sticky-enter' : 'sticky-exit'}`}>
        <a href="https://www.petric.in">
          Shop Now Extra 8% Off First 4 Orders
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
