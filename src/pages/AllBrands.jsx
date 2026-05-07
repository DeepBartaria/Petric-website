import React, { useEffect } from 'react';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

// Use same hero banner as /products
import headerbg from '../assets/petsproductherobg.png';

// Brand Images
import pedigree from '../assets/pedigree.png';
import drools from '../assets/drools.png';
import whiskas from '../assets/whiskas.png';
import royalcanin from '../assets/royalcanin.png';
import sheba from '../assets/sheba.png';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import brand3 from '../assets/brand3.png';
import brand4 from '../assets/brand4.png';
import brand5 from '../assets/brand5.png';
import brand6 from '../assets/brand6.png';

// Create brand arrays
const allBrands = [
  { img: pedigree, alt: 'Pedigree', name: 'Pedigree' },
  { img: royalcanin, alt: 'Royal Canin', name: 'Royal Canin' },
  { img: brand1, alt: 'Farmina N&D', name: 'Farmina N&D' },
  { img: brand2, alt: 'Vet-Life', name: 'Vet-Life' },
  { img: sheba, alt: 'Sheba', name: 'Sheba' },
  { img: whiskas, alt: 'Whiskas', name: 'Whiskas' },
  { img: drools, alt: 'Drools', name: 'Drools' },
  { img: brand3, alt: 'HUFT', name: 'HUFT' },
  { img: brand4, alt: 'JerHigh', name: 'JerHigh' },
  { img: brand5, alt: 'Purina Pro', name: 'Purina Pro' },
  { img: brand6, alt: 'Farmina Matisse', name: 'Farmina Matisse' },
];

const dogBrands = [
  { img: pedigree, alt: 'Pedigree', name: 'Pedigree' },
  { img: drools, alt: 'Drools', name: 'Drools' },
  { img: brand1, alt: 'Farmina N&D', name: 'Farmina N&D' },
  { img: brand4, alt: 'JerHigh', name: 'JerHigh' },
  { img: brand5, alt: 'Purina Pro', name: 'Purina Pro' },
  { img: royalcanin, alt: 'Royal Canin', name: 'Royal Canin' },
];

const catBrands = [
  { img: whiskas, alt: 'Whiskas', name: 'Whiskas' },
  { img: sheba, alt: 'Sheba', name: 'Sheba' },
  { img: royalcanin, alt: 'Royal Canin', name: 'Royal Canin' },
  { img: brand6, alt: 'Farmina Matisse', name: 'Farmina Matisse' },
];

const BrandGrid = ({ title, brands, showName = false }) => (
  <div className="mb-14">
    <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 pl-4 border-l-4 border-[#FFD000]">{title}</h2>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
      {brands.map((brand, i) => (
        <div key={i} className="flex flex-col items-center group cursor-pointer">
          <div className="w-full aspect-square bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center justify-center p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <img src={brand.img} alt={brand.alt} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          {showName && (
            <span className="mt-3 text-sm font-semibold text-gray-800 text-center group-hover:text-black">{brand.name}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function AllBrands() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <NewHomeNavbar />
      
      {/* Hero Banner (from /products) */}
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[40vh] sm:h-[60vh] md:h-[70vh] flex items-center" style={{ backgroundImage: `url(${headerbg})` }}>
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold balsamiq-sans-bold text-black leading-tight mb-4 max-w-3xl drop-shadow-sm">
            Discover Top Brands
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#FF5757] max-w-xl bg-white/90 p-4 rounded-xl shadow-sm inline-block">
            Premium quality for your best friend
          </p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-16 w-full flex-grow">
        {/* All Brands (With names) */}
        <BrandGrid title="All Brands" brands={allBrands} showName={true} />

        {/* Cat Brands (With names) */}
        <BrandGrid title="Cat Brands" brands={catBrands} showName={true} />

        {/* Dog Brands (With names) */}
        <BrandGrid title="Dog Brands" brands={dogBrands} showName={true} />
      </main>

      {/* Sections requested */}
      <Benefit />
      <WhyTrustUs />
      <OffersBanner />
      <Testimonials />
      <Footer />
    </div>
  );
}
