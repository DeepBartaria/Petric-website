import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NewHomeNavbar from '../components/NewHomeNavbar';
import Benefit from '../components/Benefit';
import WhyTrustUs from '../components/WhyTrustUs';
import OffersBanner from '../components/Banner';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { get } from '../helper/api';

// Use same hero banner as /products
import headerbg from '../assets/petsproductherobg.png';

const DOG_BRAND_NAMES = [
  'Pedigree', 'Drools', 'Farmina N&D', 'JerHigh', 'Purina Pro', 'Royal Canin'
];

const CAT_BRAND_NAMES = [
  'Whiskas', 'Sheba', 'Royal Canin', 'Farmina Matisse'
];

const BrandGrid = ({ title, brands, showName = false }) => (
  <div className="mb-14">
    <h2 className="text-2xl md:text-3xl font-bold text-black mb-8 pl-4 border-l-4 border-[#FFD000]">{title}</h2>
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6">
      {brands.map((brand, i) => (
        <Link to={`/all-categories?brandId=${brand.id}&brandName=${encodeURIComponent(brand.name)}`} key={i} className="flex flex-col items-center group cursor-pointer">
          <div className="w-full aspect-square bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center justify-center p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
            <img src={brand.img} alt={brand.alt} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
          {showName && (
            <span className="mt-3 text-sm font-semibold text-gray-800 text-center group-hover:text-black">{brand.name}</span>
          )}
        </Link>
      ))}
    </div>
  </div>
);

export default function AllBrands() {
  const [allBrands, setAllBrands] = useState([]);
  const [dogBrands, setDogBrands] = useState([]);
  const [catBrands, setCatBrands] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBrands = async () => {
      try {
        const response = await get('product/brand');
        if (response && response.productBrands) {
          const formattedBrands = response.productBrands.map(b => ({
            id: b._id,
            img: b.image,
            alt: b.name,
            name: b.name
          }));
          setAllBrands(formattedBrands);
          setDogBrands(formattedBrands.filter(b => DOG_BRAND_NAMES.includes(b.name)));
          setCatBrands(formattedBrands.filter(b => CAT_BRAND_NAMES.includes(b.name)));
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
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
