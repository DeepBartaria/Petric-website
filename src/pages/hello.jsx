import React from "react";
import "./PetricLandingPage.css";
import landingPageImg from "../assets/landing_page.png";
import logoImg from "../assets/logocrop.png";
import lpWebVideo from "../assets/lp_web.mp4";
import lpMobVideo from "../assets/lp_mob.mp4";
import { get } from "../helper/api";
import HelloFooter from "../components/HelloFooter";

const PetricLandingPage = () => {
  const [activeTesti, setActiveTesti] = React.useState(0);
  const [showSticky, setShowSticky] = React.useState(false);
  const [showStickySub, setShowStickySub] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [shopCategories, setShopCategories] = React.useState([]);
  const [heroBtnState, setHeroBtnState] = React.useState('hidden'); // hidden, visible, exiting

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
      setActiveTesti((prev) => (prev + 1) % 3);
    }, 4000);
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
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
        <div className={`hero-btns ${heroBtnState}`}>
          <a href="https://www.petric.in" className="btn-primary">Shop Now →</a>
          <a href="https://wa.me/918295756962" className="btn-secondary">
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* ── SECTION 3: OFFER ── */}
      <div ref={offerRef} className="offer-section">
        <div className="offer-grid">

          <div className="offer-card premium">
            <div className="offer-tag-container">
              <span className="offer-tag pulse-animation">🐾 Limited Offer</span>
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
          <a href="https://www.petric.in/all-categories" className="see-all">See all</a>
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
            <div className="testi-text">"My dog ran out of food at 11pm. Petric delivered in 25 minutes. This app is genuinely life-saving."</div>
            <div className="testi-author">
              <div className="author-dot">🐕</div>
              <div>
                <div className="author-name">Priya M.</div>
                <div className="author-sub">Sector 56 · Labrador parent</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 1 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"The 24/7 pharmacy genuinely saved us during a late-night scare. Calm, fast, and totally sorted."</div>
            <div className="testi-author">
              <div className="author-dot">🐈</div>
              <div>
                <div className="author-name">Aakash R.</div>
                <div className="author-sub">DLF Phase 3 · Cat parent</div>
              </div>
            </div>
          </div>

          <div className={`testi-card ${activeTesti === 2 ? 'active' : ''}`}>
            <div className="testi-stars">★★★★★</div>
            <div className="testi-text">"No app needed, no delivery fee. I open the site, order, done. Easiest thing in my week."</div>
            <div className="testi-author">
              <div className="author-dot">🐶</div>
              <div>
                <div className="author-name">Simran K.</div>
                <div className="author-sub">Sushant Lok · Beagle parent</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="divider"></div>

      {/* ── SECTION 7: FINAL CTA ── */}
      <div className="final-cta">
        <h2>Every pet.<br/>Every need.<br/>Every time.</h2>
        <p className="final-cta-sub">Can't find an item? Tell us — we'll get it for you.</p>
        <div className="final-cta-btns">
          <a href="https://wa.me/918295756962" className="btn-outline-dark">Request an Item</a>
          <a href="https://www.petric.in" className="btn-dark">See Products →</a>
        </div>
      </div>

      {/* WhatsApp Strip */}
      <a href="https://wa.me/918295756962" className="wa-strip">
        <span className="wa-text">Call or WhatsApp</span>
      </a>

      {/* Footer */}
      {/* 
      <div className="footer">
        <strong>Petric</strong><br/>
        Delivering in Gurgaon &amp; nearby areas<br/>
        No delivery · No platform · No COD fees
      </div> 
      */}

      {/* Global Footer component */}
      <HelloFooter />

      <div className="sticky-spacer"></div>

      {/* ── SECTION 8: STICKY BAR ── */}
      <div className={`sticky-bar ${showSticky ? 'sticky-enter' : 'sticky-exit'}`}>
        <a href="https://www.petric.in">🛒 Shop Now — Extra 8% Off First 4 Orders</a>
        {showStickySub && (
          <div className="sticky-sub">
            <span className="sub-item" style={{ animationDelay: '0s' }}>No delivery fee</span>
            <span className="sub-item" style={{ animationDelay: '0.1s' }}>No platform fee</span>
            <span className="sub-item" style={{ animationDelay: '0.2s' }}>No COD charges</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default PetricLandingPage;
