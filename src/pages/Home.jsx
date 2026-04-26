import { useDialog } from "../context/DialogContext";
import useIsMobile from "../useIsMobile";

import Benefit from "../components/Benefit";
import LocateClinic from "../components/LocateClinic";
import Veterinarians from "../components/Veterinarians";
import ServiceCarousel from "../components/ServiceCarousel";
import Testimonials from "../components/Testimonials";
import WhyUs from "../components/WhyUs";
import ArticlesCarousel from "../components/ArticlesCarousel";
import OffersBanner from "../components/Banner";
import Footer from "../components/Footer";
// import f1 from "../assets/f1.png";
import mobiles from "../assets/mobiles.png";
import appstore from "../assets/appstore.svg";
import playstore from "../assets/playstore.svg";

// import headerbg from "../assets/headerbg.png";
// import headerbgMobile from "../assets/headerbg-mobile.png";

import headerbg from "../assets/Homedesktop.png";
import dogs from "../assets/Homedogs.png";
import headerbgMobile from "../assets/homemobile.jpg";
import hiImage from "../assets/hi.jpg";
import heart from "../assets/clip.png";

import StatsBar from "../components/StatsBar";

import appstore1 from "../assets/appstore.png";
import playstore1 from "../assets/playstore.png";

export default function Home() {
  const { showDialog } = useDialog();
  const isMobile = useIsMobile();
  return (
    <>
      <div className='bg-black text-white py-2 overflow-hidden flex items-center'>
        <marquee className="text-xl sm:text-2xl outfit-medium m-0" behavior="scroll" direction="left" scrollamount="12">
          Delivery in Gurugram & nearby areas ! | <span className="font-bold underline">Upto 30% off on selected brands</span>
        </marquee>
      </div>
      <section
        className="w-full bg-cover bg-center bg-no-repeat min-h-[40vh] sm:h-[70vh] md:h-[80vh] flex flex-col md:block"
      // style={{
      //   backgroundImage: `url(${headerbg})`,
      // }}
      >
        <h1 className="text-4xl text-center sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl balsamiq-sans-bold leading-tight pt-5 bg-white pb-3 md:pb-5">
          Pet Care in Minutes
        </h1>
        <div
          className="mx-auto flex flex-col justify-end sm:px-8 md:px-20 md:flex-row md:items-start md:justify-around py-10 md:pt-0 h-full rounded overflow-hidden bg-[#FFD000]"
        // style={{ minHeight: "340px" }}
        >
          {/* Left: Text */}
          <div className="flex flex-col px-4 md:mt-10 md:bg-none md:pt-10">
            <p className="sm:mb-6 sm:max-w-md md:max-w-lg text-sm sm:text-base md:text-2xl 2xl:text-4xl font-medium text-center md:text-left">
              Get everything your pet needs — 
              <img src={heart} alt="heart" className="inline-block w-6 h-6 md:w-8 md:h-8 ml-2 -mt-1" />
              <br/>Food, medicine, toys, treats - delivered in 59 minutes.
            </p>
            {!isMobile && (
              <>
                {/* <p className="text-base text-black font-medium">
                  Get Up to <span className="font-bold">50% OFF</span> on every
                  order on Petric App.
                </p> */}
                <div className="flex justify-start items-center gap-4 mt-2">
                  <a
                    href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={appstore1} alt="iOS" className="h-12 sm:h-12 2xl:h-16" />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.petric.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={playstore1}
                      alt="Android"
                      className="h-12 sm:h-12 2xl:h-16"
                    />
                  </a>
                </div>
              </>
            )}
          </div>
          <div className="flex items-end justify-center md:justify-end 2xl:mt-20 flex-shrink-0 w-full md:w-auto">
            <img
              src={dogs}
              alt="Pets"
              className="w-[70%] sm:w-[55%] md:w-auto md:h-[55vh] max-w-none object-contain object-bottom"
            />
          </div>
        </div>
      </section >

      {isMobile && (
        <div
          className="text-black text-center px-2 py-2"
          style={{ backgroundImage: `url(${headerbgMobile})` }}
        >
          <p className="text-base  outfit-medium font-semibold">
            Get Up to <span className="font-bold">50% OFF</span>
            <br /> on every order on Petric App.
          </p>
          <div className="flex justify-center items-center gap-4 mt-2">
            <a
              href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={appstore1} alt="iOS" className="h-12 sm:h-10" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.petric.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={playstore1} alt="Android" className="h-12 sm:h-10" />
            </a>
          </div>
        </div>
      )
      }

      {/* <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[50vh] sm:h-[70vh] md:h-[80vh] flex flex-col md:block" style={{ backgroundImage: `url(${isMobile ? headerbgMobile : headerbg})` }}>
        <div className="mx-auto flex flex-col sm:px-8 md:px-20 md:flex-row md:items-center justify-between pt-6 md:pt-0 h-full rounded overflow-hidden" style={{ minHeight: '340px' }}>
          Left: Text
          <div className="flex flex-col md:justify-center px-4 sm:px-8 py-6 sm:py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl balsamiq-sans-bold primary-color mb-3 sm:mb-4 leading-tight">
              YOUR PET'S TRUE,<br className='hidden md:block'/>
              <span className="text-[#FF5757]"> CO-PARENT</span>
            </h1>
            <p className="text-black mb-4 sm:mb-6 sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg font-medium">
              Healthcare, Products, Love – Everything our little one deserves  <br /> Because parenting is easier, together
            </p>
            <button className="bg-[#1D3557] block text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow transition w-fit text-sm sm:text-base" onClick={showDialog}>Book Appointment</button>
          </div>
        </div>
        <button className="bg-[#1D3557] md:hidden mb-3 ml-3 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow transition w-fit text-sm sm:text-base" onClick={showDialog}>Book Appointment</button>
      </section> */}
      <img src={hiImage} alt="Welcome" className="w-full h-auto block" />
      <StatsBar />
      <Benefit />
      {/* <LocateClinic /> */}
      <ServiceCarousel />
      <Veterinarians />
      <WhyUs />
      <OffersBanner />
      <Testimonials />
      {/* <div
        className="w-full flex flex-col md:flex-row items-center justify-between py-8 sm:py-12 bg-cover bg-no-repeat h-[280px] sm:h-[400px] px-4 sm:px-20"
        style={{ backgroundImage: `url(${f1})` }}
      > */}
      <div
        className="w-full flex flex-col md:flex-row items-center justify-between py-8 sm:py-12 bg-gradient-to-r from-[#1F395E] to-[#325B96] h-[280px] sm:h-[400px] px-4 sm:px-20"
      >
        <div className="flex-1 flex flex-col gap-4 text-white max-w-lg">
          <h2 className="text-2xl md:text-4xl outfit-bold">
            Your Pet's Entire World.
            <br /> One Tap Away.
          </h2>
          <div className="flex gap-4 mt-2">
            <a
              href="https://apps.apple.com/us/app/petric-pet-care-app/id6752010764"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={appstore} alt="iOS" className="h-12 sm:h-14" />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.petric.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={playstore} alt="Android" className="h-12 sm:h-14" />
            </a>
          </div>
        </div>
        <img src={mobiles} alt="Android" height={400} width={400} className="hidden md:block" />
      </div>
      {/* <ArticlesCarousel /> */}

      <Footer />
    </>
  );
}
