import { useEffect } from 'react';
import ServiceCarousel from '../components/ServiceCarousel';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';
import useIsMobile from '../useIsMobile';

import headerbg from '../assets/about-us/aboutusherobg.png';
import headerbgMobile from '../assets/about-us/aboutusherobg-mobile.png';
import mission from '../assets/about-us/about1.png';

export default function AboutUs() {

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
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[50vh] sm:h-[70vh] md:h-[80vh]" style={{ backgroundImage: `url(${isMobile ? headerbgMobile : headerbg})` }}>
        <div className="mx-auto flex flex-col px-4 sm:px-8 md:px-20 md:flex-row items-center justify-between pt-6 md:pt-0 h-full rounded overflow-hidden" style={{ minHeight: '340px' }}>
          {/* Left: Text */}
          <div className="flex-1 flex flex-col md:justify-center px-4 sm:px-8 py-6 sm:py-10">
            <p className="text-black mb-2 sm:mb-4 max-w-xs text-center md:text-left sm:max-w-sm md:max-w-md text-base sm:text-base md:text-3xl font-medium">
              Not Just a Platform
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl balsamiq-sans-bold primary-color mb-3 sm:mb-4 leading-tight">
              A Promise of Better <br />
              <span className="text-[#FF5757]">Pet Care, Every Day</span>
            </h1>
            {/* <button className="bg-[#1D3557] text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-[#22306b] transition w-fit">Book Appointment</button> */}
          </div>
        </div>
      </section>
      <section className="pt-10 md:pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">

            {/* Image */}
            <div className="w-full md:w-5/12">
              <img
                src={mission}
                alt="Veterinarian with a dog and a cat"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-7/12 flex flex-col gap-4 text-center md:text-left">
              <p className="text-[#333] text-sm sm:text-base md:text-xl leading-relaxed">
                Born in the heart of Gurgaon, Petric was founded by pet parents who live the same life as every other pet parent out there.
              </p>

              <p className="text-[#333] text-sm sm:text-base md:text-xl leading-relaxed">
                Whether it's running out of kibble at night, searching for urgent medicine, or wondering which toy is actually safe - we've experienced it all.
              </p>

              <p className="text-[#333] text-sm sm:text-base md:text-xl leading-relaxed">
                We noticed that while the world was getting faster, pet care was staying slow.
              </p>

              <p className="text-[#333] text-sm sm:text-base md:text-xl leading-relaxed">
                We decided to change that.
              </p>
            </div>

          </div>
        </div>
      </section>
      <ServiceCarousel />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
} 