import BestGroomingServices from '../components/BestGroomingService';
import OtherServiceForPet from '../components/OtherServiceForPet';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

import { useDialog } from '../context/DialogContext';

import headerbg from '../assets/grooming/groomingherobg.png';
import headerbgMobile from '../assets/grooming/groomingherobg-mobile.png';
import useIsMobile from '../useIsMobile';

export default function Grooming() {
  const { showDialog } = useDialog();
  const isMobile = useIsMobile();
  return (
    <>
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[60vh] sm:h-[70vh] md:h-[80vh]  flex flex-col justify-between" style={{ backgroundImage: `url(${isMobile ? headerbgMobile : headerbg})` }}>
        <div className="flex flex-col px-4 sm:px-8 md:px-20 md:flex-row md:items-center justify-between pt-6 md:pt-0 h-full rounded overflow-hidden flex-1" style={{ minHeight: '340px' }}>
          {/* Left: Text */}
          <div className="flex-1 flex flex-col md:justify-center px-4 sm:px-8  sm:py-10">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl balsamiq-sans-bold primary-color mb-3 sm:mb-4 leading-tight">
            Tail Wags,<br />
              <span className="text-[#FF5757]">Happy Hearts</span>
            </h1>
            <p className="primary-color mb-4 sm:mb-6 max-w-xs sm:max-w-sm md:max-w-md text-base sm:text-lg md:text-2xl font-medium">
              Expert Grooming, With Care
            </p>
            <button className="bg-[#1D3557] block text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow hover:bg-[#22306b] transition w-fit text-sm sm:text-base" onClick={showDialog}>Book Appointment</button>
          </div>
        </div>
        {/* <button className="bg-[#1D3557] md:hidden mb-3 ml-7 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow transition w-fit text-sm sm:text-base" onClick={showDialog}>Book Appointment</button> */}
        </section>
      <BestGroomingServices />
      {/* <OtherServiceForPet /> */}
      <Testimonials />
      <Footer />
    </>
  );
} 