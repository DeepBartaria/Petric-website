import Footer from '../components/Footer';
import WhyPartner from '../components/WhyPartner';
import ContactForm from '../components/ContactForm';
import useIsMobile from '../useIsMobile';

import headerbg from '../assets/register/registerherobg.png';
import headerbgMobile from '../assets/register/registerherobg-mobile.png';

import phoneIcon from '../assets/contact/callbox.png';
import emailIcon from '../assets/contact/mailbox.png';
import officeIcon from '../assets/contact/locationbox.png';

const contactDetails = [
  { icon: phoneIcon, title: 'Phone', detail: '+91 8103943923' },
  { icon: emailIcon, title: 'Email', detail: 'team@petric.in' },
];

const officeDetail = {
  icon: officeIcon,
  title: 'Office',
  detail: 'U-26A Ln, DLF Phase 3, Sector 24, Gurugram, Haryana 122002',
};

export default function RegisterAsPartner() {
  const mapSrc = "https://maps.google.com/maps?q=U-26A%20Ln,%20DLF%20Phase%203,%20Sector%2024,%20Gurugram,%20Haryana%20122010&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const isMobile = useIsMobile();
  return (
    <>
      <section className="w-full bg-white bg-cover bg-center bg-no-repeat min-h-[50vh] sm:h-[70vh] md:h-[80vh]" style={{ backgroundImage: `url(${isMobile ? headerbgMobile : headerbg})` }}>
        <div className="mx-auto flex flex-col px-4 sm:px-8 md:px-20 md:flex-row items-center justify-between h-full rounded  overflow-hidden" style={{ minHeight: '340px' }}>
          {/* Left: Text */}
          <div className="flex-1 flex flex-col md:justify-center items-center px-4 sm:px-8 py-6 sm:py-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl balsamiq-sans-bold primary-color text-center mb-3 sm:mb-4 leading-tight">
              REGISTER AS
              <br />
              <span className="text-[#FF5757]">OUR PARTNER</span>
            </h1>
          </div>
        </div>
      </section>
      <section className="pt-10 sm:pt-16 md:pt-20 bg-white md:px-20">
        <div className='flex flex-col gap-3 sm:gap-4 text-center bg-[#FFB8000D] border text-[#333333] font-normal p-6 sm:p-12 md:p-16 lg:p-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 rounded-xl text-base sm:text-lg md:text-xl mx-4 sm:mx-8 md:mx-16 lg:mx-auto'>
          <p>At Petric, we're bringing together the most trusted and experienced veterinarians, groomers, and pet product sellers under one roof – to make pet parenting easier and more reliable.</p>
          <p>If you're a clinic, grooming service, or pet store that values quality, compassion, and growth – we'd love to have you on board.</p>
        </div>
      </section>
      <WhyPartner />
      <ContactForm />
      <div className="my-10 p-4 md:my-20 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactDetails.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-6">
              <img src={item.icon} alt="" className="w-10 h-10 bg-[#1D3557] rounded-lg " />
              <div>
                <h3 className="text-lg text-[#242424] font-medium">{item.title}</h3>
                <p className="text-[#3D3D3D] font-normal">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-6 mt-8">
          <img src={officeDetail.icon} alt="" className="w-10 h-10 rounded-lg " />
          <div>
            <h3 className="text-lg text-[#242424] font-medium">{officeDetail.title}</h3>
            <p className="text-[#3D3D3D] font-normal">{officeDetail.detail}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px] rounded-lg shadow-md overflow-hidden">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer />
    </>
  );
} 