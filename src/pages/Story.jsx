import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import OffersBanner from '../components/Banner';
import StatsBar from '../components/StatsBar';

// Use placeholder images that users can easily swap
import dogsRow from '../assets/Rectangle.png'; 
import missionImage from '../assets/about-us/about1.png';
import teamImage1 from '../assets/image-1.png'; 
import teamImage2 from '../assets/image-2.png';

export default function Story() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white font-sans flex flex-col min-h-screen">
      
      {/* 1. Header Section */}
      <section className="w-full bg-white pt-10 md:pt-20 pb-4 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-[5rem] text-black font-normal balsamiq-sans-bold tracking-tight leading-[1.1]">
          Our love for pets is<br />Emaculate ❤️
        </h1>
      </section>

      {/* 2. Yellow Pets Block */}
      <section className="w-full px-4 md:px-12 lg:px-20 mx-auto max-w-[1400px]">
        {/* We place the dogs image tightly over the yellow background */}
        <div className="w-full rounded-[2.5rem] overflow-hidden flex flex-col items-center relative pt-8 px-6 pb-2" style={{ backgroundColor: '#FFD000' }}>
          
          <div className="w-full max-w-5xl bg-white rounded-t-[2.5rem] overflow-hidden flex justify-center items-end" style={{ height: '30vh', minHeight: '200px' }}>
            <img src={dogsRow} alt="Pets" className="w-[90%] md:w-[70%] h-full object-contain object-bottom" />
          </div>

          <div className="py-8 text-center text-black font-medium text-lg md:text-xl w-full">
            At Petric, we don't just see pets. We see our own family.<br className="hidden md:block"/>
            And our family deserves nothing but the best.
          </div>
        </div>
      </section>

      {/* 3. Stats Bar */}
      <StatsBar />

      {/* 4. Origin Story */}
      <section className="w-full max-w-6xl mx-auto px-4 md:px-8 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-black text-base md:text-lg lg:text-xl font-medium tracking-tight">
          <p>
            Born in the heart of Gurgaon, Petric was founded by pet parents who live the same life as every other pet parent out there.
          </p>
          <p>
            Whether it's running out of kibble at night, searching for urgent medicine, or wondering which toy is actually safe - we've experienced it all.
          </p>
          <p>
            We noticed that while the world was getting faster, pet care was staying slow.
          </p>
          <p className="font-bold">
            We decided to change that.
          </p>
        </div>
        <div className="w-full md:w-1/2 border-2 border-yellow-200 rounded-3xl overflow-hidden p-2 shadow-sm bg-white">
          <img src={missionImage} alt="Team" className="w-full h-auto rounded-2xl object-cover aspect-[4/3] md:aspect-auto" />
        </div>
      </section>

      {/* 5. Meet the Team */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-black font-normal text-center mb-12 balsamiq-sans-bold tracking-tight">
          Meet the Team
        </h2>

        {/* Big Yellow Bordered Container */}
        <div className="w-full border-2 border-yellow-200 rounded-[3rem] p-6 md:p-12 shadow-sm bg-[#FFFDF7]">
          {/* Card 1 */}
          <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-16 lg:mb-24">
             <div className="w-full lg:w-1/2 flex flex-col justify-center">
               <h3 className="font-bold text-xl md:text-2xl text-black mb-4">Naveen Muthreja</h3>
               <p className="text-black leading-relaxed font-medium text-base md:text-lg">
                 "I've always had a soft corner for animals, but Tingu truly deepened that love with his playful energy and unconditional affection. He reminds me every day how special the human-pet bond is. <br/><br/>
                 I believe every pet parent deserves a support system. A community that actually understands the emotional weight of pet care. Petric is our way of providing that extra hand."
               </p>
             </div>
             <div className="w-full lg:w-1/2 flex items-center justify-center">
               <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-lg border-2 border-white">
                   <img src={teamImage1} alt="Naveen Muthreja" className="w-full h-full object-cover" />
               </div>
             </div>
          </div>

          {/* Card 2 */}
          <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
             <div className="w-full lg:w-1/2 flex flex-col justify-center">
               <h3 className="font-bold text-xl md:text-2xl text-black mb-4">Akshat Lohlya</h3>
               <p className="text-black leading-relaxed font-medium text-base md:text-lg">
                 "After graduating from IIT Delhi, I knew I wanted to build systems that solve real-world problems from the ground up. Then, I started noticing the problems my fellow pet parents were having. <br/><br/>
                 Hopping from store to store, dealing with scattered information and confusing choices just to find the right essentials. I realized that pet parenting in India lacked structure and simplicity. And that's when Petric was born."
               </p>
             </div>
             <div className="w-full lg:w-1/2 flex items-center justify-center">
               <div className="w-full aspect-square md:aspect-[4/3] bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-lg border-2 border-white">
                   <img src={teamImage2} alt="Akshat Lohlya" className="w-full h-full object-cover" />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 6. More Than just Delivery */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-black font-normal text-center mb-4 balsamiq-sans-bold tracking-tight">
          More Than just Delivery
        </h2>
        <p className="text-center text-black text-sm md:text-base lg:text-lg mb-10 max-w-4xl px-4 font-medium">
          We are a digital-first, human-led companion for every step of your pet's life. We combine the speed of quick commerce with the deep product range creating a practical pet store.
        </p>

        <div className="w-full border-2 border-gray-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex bg-[#FFD000] text-black font-bold text-lg md:text-xl lg:text-2xl">
            <div className="flex-1 py-4 md:py-6 px-4 md:px-10 border-r border-[#D9B000]/30 text-center">Why Petric?</div>
            <div className="flex-1 py-4 md:py-6 px-4 md:px-10 text-center">The Experience</div>
          </div>

          <div className="flex flex-col bg-white">
             {/* Row 1 */}
             <div className="flex border-b border-gray-200">
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 border-r border-gray-200 flex items-center text-black font-semibold text-base md:text-lg">Human to Human</div>
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 flex items-center text-gray-800 text-sm md:text-base font-medium">You can call, WhatsApp, or chat with us whenever you need to.</div>
             </div>
             {/* Row 2 */}
             <div className="flex border-b border-gray-200">
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 border-r border-gray-200 flex items-center text-black font-semibold text-base md:text-lg">Minutes, Not Days</div>
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 flex items-center text-gray-800 text-sm md:text-base font-medium">Whether it's food, treats, or medicine, we deliver to your doorstep in minutes.</div>
             </div>
             {/* Row 3 */}
             <div className="flex border-b border-gray-200">
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 border-r border-gray-200 flex items-center text-black font-semibold text-base md:text-lg">Round-the-clock assistance</div>
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 flex items-center text-gray-800 text-sm md:text-base font-medium">Early in the morning or late at night, you can rely on us any time.</div>
             </div>
             {/* Row 4 */}
             <div className="flex">
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 border-r border-gray-200 flex items-center text-black font-semibold text-base md:text-lg">Beyond the Catalog</div>
               <div className="flex-1 py-6 md:py-8 px-4 md:px-10 flex items-center text-gray-800 text-sm md:text-base font-medium">Can't find a specific item? We'll source hard-to-find supplies specially for you.</div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. Our Mission */}
      <section className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center">
         <h2 className="text-4xl md:text-5xl lg:text-5xl text-black font-normal balsamiq-sans-bold tracking-tight mb-8 leading-tight">
           Our Mission: Reliability You<br className="hidden md:block" /> Can Feel
         </h2>
         <p className="text-black text-base md:text-lg px-2 font-medium leading-relaxed max-w-3xl">
           Our mission is to be the most trusted, human pet care partner in India. We envision a world where no pet parent ever feels alone or unprepared. From smart refill reminders to celebrating your "Gotcha Day" milestones, we are here to ensure your pet's journey is filled with joy, health, and zero stress.
         </p>
      </section>

      {/* 8. Catalogue Section */}
      <section className="w-full py-16 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Explore Our Products</h2>
        <Link 
          to="/catalogue" 
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-full font-bold shadow-lg transition-transform hover:scale-105"
        >
          View Full Catalogue
        </Link>
      </section>

      <OffersBanner />
      <Footer />
    </div>
  );
}
