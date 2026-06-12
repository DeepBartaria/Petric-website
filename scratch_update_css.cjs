const fs = require('fs');
const file = './src/pages/PetricLandingPage.css';
let css = fs.readFileSync(file, 'utf8');

// Navbar
css = css.replace('.petric-landing .navbar {\n  background: var(--black);', '.petric-landing .navbar {\n  background: var(--white);\n  border-bottom: 2px solid var(--yellow);');
css = css.replace('.petric-landing .nav-logo span { color: var(--white); }', '.petric-landing .nav-logo span { color: var(--yellow); }');
css = css.replace('.petric-landing .nav-logo {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--yellow);', '.petric-landing .nav-logo {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text);');

// Hero
css = css.replace('.petric-landing .hero {\n  background: var(--black);', '.petric-landing .hero {\n  background: var(--off-white);');
css = css.replace('.petric-landing .hero h1 {\n  font-size: 46px;\n  font-weight: 900;\n  color: var(--white);', '.petric-landing .hero h1 {\n  font-size: 46px;\n  font-weight: 900;\n  color: var(--text);');
css = css.replace('.petric-landing .hero-body {\n  font-size: 15px;\n  color: rgba(255,255,255,0.55);', '.petric-landing .hero-body {\n  font-size: 15px;\n  color: var(--gray-mid);');
css = css.replace('.petric-landing .btn-secondary {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  background: transparent;\n  color: var(--white);', '.petric-landing .btn-secondary {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  background: transparent;\n  color: var(--text);');
css = css.replace('border: 1.5px solid rgba(255,255,255,0.2);', 'border: 1.5px solid var(--gray);');

// Offer card
css = css.replace('.petric-landing .offer-card {\n  background: var(--black);', '.petric-landing .offer-card {\n  background: var(--white);\n  border: 2px solid var(--yellow);');
css = css.replace('.petric-landing .offer-headline {\n  font-size: 19px;\n  font-weight: 900;\n  color: var(--white);', '.petric-landing .offer-headline {\n  font-size: 19px;\n  font-weight: 900;\n  color: var(--text);');
css = css.replace('.petric-landing .offer-list li {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: rgba(255,255,255,0.8);', '.petric-landing .offer-list li {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--text);');

// Cat card see more
css = css.replace('.petric-landing .cat-card.see-more {\n  background: var(--black);\n  border-color: var(--black);', '.petric-landing .cat-card.see-more {\n  background: var(--yellow);\n  border-color: var(--yellow);');
css = css.replace('.petric-landing .cat-card.see-more .cat-name { color: var(--yellow); }', '.petric-landing .cat-card.see-more .cat-name { color: var(--text); }');

// Why card dark
css = css.replace('.petric-landing .why-card.dark {\n  background: var(--black);', '.petric-landing .why-card.dark {\n  background: var(--yellow);');
css = css.replace('.petric-landing .why-card.dark .why-title { color: var(--yellow); }', '.petric-landing .why-card.dark .why-title { color: var(--text); }');
css = css.replace('.petric-landing .why-card.dark .why-desc { color: rgba(255,255,255,0.5); }', '.petric-landing .why-card.dark .why-desc { color: var(--text); }');

// Testi card
css = css.replace('.petric-landing .testi-card {\n  background: var(--black);', '.petric-landing .testi-card {\n  background: var(--white);\n  border: 1px solid var(--gray);');
css = css.replace('.petric-landing .testi-text {\n  font-size: 14px;\n  font-style: italic;\n  color: rgba(255,255,255,0.85);', '.petric-landing .testi-text {\n  font-size: 14px;\n  font-style: italic;\n  color: var(--text);');
css = css.replace('.petric-landing .author-name {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--white);', '.petric-landing .author-name {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text);');
css = css.replace('.petric-landing .author-sub {\n  font-size: 11px;\n  font-weight: 600;\n  color: rgba(255,255,255,0.45);', '.petric-landing .author-sub {\n  font-size: 11px;\n  font-weight: 600;\n  color: var(--gray-mid);');

// Final CTA
css = css.replace('.petric-landing .btn-dark {\n  display: block;\n  background: var(--black);\n  color: var(--white);', '.petric-landing .btn-dark {\n  display: block;\n  background: var(--white);\n  color: var(--text);\n  border: 1.5px solid var(--gray);');

// Sticky bar
css = css.replace('.petric-landing .sticky-bar {\n  position: fixed;\n  bottom: 0; left: 50%;\n  transform: translateX(-50%);\n  width: 100%; max-width: 430px;\n  background: var(--black);', '.petric-landing .sticky-bar {\n  position: fixed;\n  bottom: 0; left: 50%;\n  transform: translateX(-50%);\n  width: 100%; max-width: 430px;\n  background: var(--white);');
css = css.replace('.petric-landing .sticky-sub span {\n  font-size: 11px;\n  font-weight: 700;\n  color: rgba(255,255,255,0.45);', '.petric-landing .sticky-sub span {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--gray-mid);');

// Desktop navbar override
css = css.replace('  .petric-landing .navbar {\n    padding: 20px 80px;\n    background: var(--black);\n    max-width: none;\n    margin: 0;\n  }', '  .petric-landing .navbar {\n    padding: 20px 80px;\n    background: var(--white);\n    border-bottom: 2px solid var(--yellow);\n    max-width: none;\n    margin: 0;\n  }');

fs.writeFileSync(file, css);
console.log("Done replacing CSS");
