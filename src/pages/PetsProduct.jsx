import Essentials from '../components/Essentials';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { useDialog } from '../context/DialogContext';
import headerbg from '../assets/petsproductherobg.png';

export default function PetsProducts() {
  const { showDialog } = useDialog();
  return (
    <>
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[40vh] sm:h-[70vh] md:h-[80vh]" style={{ backgroundImage: `url(${headerbg})` }}>
        <div className="mx-auto flex flex-col px-4 sm:px-8 md:px-20 md:flex-row items-center justify-between h-full rounded overflow-hidden" style={{ minHeight: '340px' }}>
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-6 sm:py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl text-center balsamiq-sans-bold text-black leading-tight">
              Best Essentials For  <br />
              <span>Your Pet Delivered In</span>
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold balsamiq-sans-bold text-[#FF5757] mb-6 sm:mb-8 md:mb-12 leading-tight">
              Just 59 mins!  <br />
            </h1>
            <button className="bg-[#1D3557] text-white px-4 sm:px-6 py-2 sm:py-3 md:py-4 rounded-lg font-semibold shadow transition w-fit text-sm sm:text-base" onClick={showDialog}>Order Now</button>
            {/* <a
                href={`https://wa.me/918295756962`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
              
            </a> */}
          </div>
        </div>
      </section>
      <Essentials />
      <Testimonials />
      <Footer />
    </>
  );
} 