import BestServices from '../components/BestServices';
import Veterinarians from '../components/Veterinarians';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import StatsBar from '../components/StatsBar';

import { useDialog } from '../context/DialogContext';

// import headerbg from '../assets/healthcareherobg.png';
// import headerbgMobile from '../assets/healthcareherobg-mobile.png';
import headerbg from '../assets/healthcaredesktop.jpg';
import headerbgMobile from '../assets/healthcaremobile.jpg';
import useIsMobile from '../useIsMobile';

export default function HealthCare() {
  const { showDialog } = useDialog();
  const isMobile = useIsMobile();
  return (
    <>
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[80vh] sm:h-[70vh] md:h-[80vh] flex flex-col justify-between" style={{ backgroundImage: `url(${isMobile ? headerbgMobile : headerbg})` }}>
        <div className="flex flex-col px-4 sm:px-8 md:px-20 md:flex-row md:items-center justify-between pt-6 md:pt-0 h-full rounded overflow-hidden flex-1" style={{ minHeight: '340px' }}>
          {/* Left: Text */}
          <div className="flex-1 flex flex-col md:justify-center px-4 sm:px-8  sm:py-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl balsamiq-sans-bold primary-color leading-tight" >
            Where Experience <br />
              <span> Meets Compassion</span>
            </h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl balsamiq-sans-bold text-[#FF5757] mb-6 sm:mb-8 md:mb-12 leading-tight">
            Trusted Vets, <br />
              <span>Just a Click Away</span>
            </h1>
            <button className="bg-[#1D3557] block text-white px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-lg font-semibold shadow transition w-fit text-sm sm:text-base" onClick={showDialog}>Book Appointment</button>
          </div>
        </div>
        {/* <button className="bg-[#1D3557] md:hidden mb-3 ml-7 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow transition w-fit text-sm sm:text-base" onClick={showDialog}>Book Appointment</button> */}
      </section>
      <StatsBar />
      <BestServices />
      <div className='py-10 md:py-20'>
        <Veterinarians />
      </div>
      <Testimonials />
      <Footer />
    </>
  );
} 