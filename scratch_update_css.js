const fs = require('fs');
const file = './src/pages/PetricLandingPage.css';
let css = fs.readFileSync(file, 'utf8');

// Navbar
css = css.replace('.navbar {\n  background: var(--black);', '.navbar {\n  background: var(--white);\n  border-bottom: 2px solid var(--yellow);');
css = css.replace('.nav-logo span { color: var(--white); }', '.nav-logo span { color: var(--yellow); }');
css = css.replace('.nav-logo {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--yellow);', '.nav-logo {\n  font-size: 22px;\n  font-weight: 900;\n  color: var(--text);');

// Hero
css = css.replace('.hero {\n  background: var(--black);', '.hero {\n  background: var(--off-white);');
css = css.replace('.hero h1 {\n  font-size: 46px;\n  font-weight: 900;\n  color: var(--white);', '.hero h1 {\n  font-size: 46px;\n  font-weight: 900;\n  color: var(--text);');
css = css.replace('.hero-body {\n  font-size: 15px;\n  color: rgba(255,255,255,0.55);', '.hero-body {\n  font-size: 15px;\n  color: var(--gray-mid);');
css = css.replace('color: var(--white);\n  font-family: \'Nunito\', sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  padding: 15px 24px;\n  border-radius: var(--radius-btn);\n  text-decoration: none;\n  border: 1.5px solid rgba(255,255,255,0.2);', 'color: var(--text);\n  font-family: \'Nunito\', sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  padding: 15px 24px;\n  border-radius: var(--radius-btn);\n  text-decoration: none;\n  border: 1.5px solid var(--gray);');

// Offer card
css = css.replace('.offer-card {\n  background: var(--black);', '.offer-card {\n  background: var(--white);\n  border: 2px solid var(--yellow);');
css = css.replace('.offer-headline {\n  font-size: 19px;\n  font-weight: 900;\n  color: var(--white);', '.offer-headline {\n  font-size: 19px;\n  font-weight: 900;\n  color: var(--text);');
css = css.replace('color: rgba(255,255,255,0.8);', 'color: var(--text);'); // offer list li

// Cat card see more
css = css.replace('.cat-card.see-more {\n  background: var(--black);\n  border-color: var(--black);', '.cat-card.see-more {\n  background: var(--yellow);\n  border-color: var(--yellow);');
css = css.replace('.cat-card.see-more .cat-name { color: var(--yellow); }', '.cat-card.see-more .cat-name { color: var(--text); }');

// Why card dark
css = css.replace('.why-card.dark {\n  background: var(--black);', '.why-card.dark {\n  background: var(--yellow);');
css = css.replace('.why-card.dark .why-title { color: var(--yellow); }', '.why-card.dark .why-title { color: var(--text); }');
css = css.replace('.why-card.dark .why-desc { color: rgba(255,255,255,0.5); }', '.why-card.dark .why-desc { color: var(--text); }');

// Testi card
css = css.replace('.testi-card {\n  background: var(--black);', '.testi-card {\n  background: var(--white);\n  border: 1px solid var(--gray);');
css = css.replace('color: rgba(255,255,255,0.85);', 'color: var(--text);'); // testi-text
css = css.replace('.author-name {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--white);', '.author-name {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text);');
css = css.replace('color: rgba(255,255,255,0.45);', 'color: var(--gray-mid);'); // author-sub

// Final CTA
css = css.replace('.btn-dark {\n  display: block;\n  background: var(--black);\n  color: var(--white);', '.btn-dark {\n  display: block;\n  background: var(--white);\n  color: var(--text);\n  border: 1.5px solid var(--gray);');

// Sticky bar
css = css.replace('.sticky-bar {\n  position: fixed;\n  bottom: 0; left: 50%;\n  transform: translateX(-50%);\n  width: 100%; max-width: 430px;\n  background: var(--black);', '.sticky-bar {\n  position: fixed;\n  bottom: 0; left: 50%;\n  transform: translateX(-50%);\n  width: 100%; max-width: 430px;\n  background: var(--white);');

// Desktop navbar
css = css.replace('background: var(--black);\n    max-width: none;\n    margin: 0;', 'background: var(--white);\n    border-bottom: 2px solid var(--yellow);\n    max-width: none;\n    margin: 0;');


fs.writeFileSync(file, css);
console.log("Done replacing CSS");
