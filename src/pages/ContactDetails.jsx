import { useEffect } from 'react';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import useIsMobile from '../useIsMobile';

import headerbg from '../assets/about-us/aboutusherobg.png';
import headerbgMobile from '../assets/about-us/aboutusherobg-mobile.png';
import mission from '../assets/about-us/about1.png';

export default function ContactDetails() {

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  const isMobile = useIsMobile();

  return (
    <>
      <ContactUs />
      <Footer />
    </>
  );
} 