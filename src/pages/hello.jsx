import React from "react";
import "./PetricLandingPage.css";

const PetricLandingPage = () => {
  const [activeTesti, setActiveTesti] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveTesti((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="petric-landing">
      {/* ── SECTION 1: RUNNING STRIP ── */}
      <div className="ticker-wrap">
        <div className="ticker-track">
          <span>Now delivering in Gurgaon &amp; nearby areas</span>
          <span>Now delivering in Gurgaon &amp; nearby areas</span>
          <span>Now delivering in Gurgaon &amp; nearby areas</span>
          <span>Now delivering in Gurgaon &amp; nearby areas</span>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="https://www.petric.in" className="nav-logo">petric<span>.</span></a>
        <a href="https://www.petric.in" className="nav-cta">Shop Now</a>
      </nav>

      {/* ── SECTION 2: HERO ── */}
      <section className="hero">
        <div className="hero-badge">
          <div className="live-dot"></div>
          Delivering right now
        </div>
        <h1>Pet supplies.<br/><span className="highlight">In minutes.</span></h1>
        <p className="hero-body">Everything you need delivered straight to your door. Fast, reliable, and hassle-free.</p>
        <div className="hero-btns">
          <a href="https://www.petric.in" className="btn-primary">Shop Now →</a>
          <a href="https://wa.me/918295756962" className="btn-secondary">
            <span className="whatsapp-icon">💬</span>
            Order via WhatsApp
          </a>
        </div>
      </section>

      {/* ── SECTION 3: OFFER ── */}
      <div className="offer-section">
        <div className="offer-grid">

          {/* Left: Offer */}
          <div className="offer-card">
            <div className="offer-tag">Limited Offer</div>
            <div className="offer-headline">Extra <span className="yellow">8% off</span> your first 4 orders</div>
            <ul className="offer-list">
              <li>Zero delivery fees</li>
              <li>Zero platform fees</li>
              <li>Zero COD charges</li>
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
          <a href="https://www.petric.in/category/688bb653d965e37b6406d2f0" className="cat-card">
            <span className="cat-icon">🐕</span>
            <span className="cat-name">Dog Food</span>
          </a>
          <a href="https://www.petric.in/category/688bb661d965e37b6406d2f5" className="cat-card">
            <span className="cat-icon">🐈</span>
            <span className="cat-name">Cat Food</span>
          </a>
          <a href="https://www.petric.in/category/688bb67cd965e37b6406d2fe" className="cat-card">
            <span className="cat-icon">🦴</span>
            <span className="cat-name">Treats</span>
          </a>
          <a href="https://www.petric.in/category/688bb8d2d965e37b6406d3af" className="cat-card">
            <span className="cat-icon">🏥</span>
            <span className="cat-name">Vet Food</span>
          </a>
          <a href="https://www.petric.in/category/689dd0df62fd763e5a773308" className="cat-card">
            <span className="cat-icon">💊</span>
            <span className="cat-name">Pharmacy</span>
          </a>
          <a href="https://www.petric.in/category/69e7dd7bbfdbb023ad83b8bb" className="cat-card">
            <span className="cat-icon">🪣</span>
            <span className="cat-name">Cat Litter</span>
          </a>
          <a href="https://www.petric.in/category/688bc48cd965e37b6406d4e8" className="cat-card">
            <span className="cat-icon">🧴</span>
            <span className="cat-name">Essentials</span>
          </a>
          <a href="https://www.petric.in/category/69e8021dbfdbb023ad876b89" className="cat-card">
            <span className="cat-icon">🎾</span>
            <span className="cat-name">Toys</span>
          </a>
          <a href="https://www.petric.in/category/69d0ca2227624a14c7c44c10" className="cat-card">
            <span className="cat-icon">🦮</span>
            <span className="cat-name">Walking Gear</span>
          </a>
          <a href="https://www.petric.in/category/688bc4dcd965e37b6406d4ed" className="cat-card">
            <span className="cat-icon">✂️</span>
            <span className="cat-name">Grooming</span>
          </a>
          <a href="https://www.petric.in/category/68b66de432dd7dfb3033009a" className="cat-card">
            <span className="cat-icon">🐟</span>
            <span className="cat-name">Fish &amp; Birds</span>
          </a>
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
          <div className="why-card dark" data-icon="⚡">
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
          <div className="why-card dark" data-icon="₹">
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
        <div className="final-cta-label">We've got you covered</div>
        <h2>Every pet.<br/>Every need.<br/>Every time.</h2>
        <p className="final-cta-sub">Can't find an item? Tell us — we'll get it for you.</p>
        <div className="final-cta-btns">
          <a href="https://www.petric.in" className="btn-dark">See Products →</a>
          <a href="https://wa.me/918295756962" className="btn-outline-dark">💬 Request an Item</a>
        </div>
      </div>

      {/* WhatsApp Strip */}
      <a href="https://wa.me/918295756962" className="wa-strip">
        <span style={{fontSize: '20px'}}>💬</span>
        <span className="wa-text">Call or WhatsApp: <span className="wa-num">82957-56962</span></span>
      </a>

      {/* Footer */}
      <div className="footer">
        <strong>Petric</strong> · Gurgaon ka apna pet care app<br/>
        Delivering in Gurgaon &amp; nearby areas<br/>
        No delivery · No platform · No COD fees
      </div>

      <div className="sticky-spacer"></div>

      {/* ── SECTION 8: STICKY BAR ── */}
      <div className="sticky-bar">
        <a href="https://www.petric.in">🛒 Shop Now — Extra 8% Off First 4 Orders</a>
        <div className="sticky-sub">
          <span>No delivery fee</span>
          <span>No platform fee</span>
          <span>No COD charges</span>
        </div>
      </div>

    </div>
  );
};

export default PetricLandingPage;
