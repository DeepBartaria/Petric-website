import React, { useEffect, useState } from 'react';
import { getAllVeterinarians } from '../helper/veterinarians';

export default function Partners() {
  const [doctors, setDoctors] = useState([]);

  const fetchVeterinarians = async () => {
    try {
      const response = await getAllVeterinarians();
      if (response.type === 'success') {
        setDoctors(response.data);
      }
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  useEffect(() => {
    fetchVeterinarians();
  }, []);

  return (
    <div className="w-full flex flex-col items-center pb-5 mb-20 bg-gray-50 min-h-screen">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 max-w-7xl mt-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl balsamiq-sans-bold mb-10 text-center text-[#1D3557]">Our Trusted Partners</h2>
        
        {/* Grid layout instead of Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors?.map((doc, idx) => (
            <div key={idx} className="flex justify-center h-full">
              <div
                className="w-full relative bg-white rounded-3xl border border-gray-100 shadow-lg flex flex-col items-center p-6 transition-all duration-300 group overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                style={{ minHeight: '320px' }}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-32 h-32 object-cover rounded-full mb-5 border-4 border-gray-50 shadow-sm mx-auto"
                />
                <div className="text-center z-10 flex flex-col items-center justify-start flex-1 w-full">
                  <div className="font-bold text-lg text-black mb-1">{doc.name}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">{doc.degree}</div>
                  <div className="text-sm text-gray-500 mb-2">{doc.exp + " " + "years of experience"}</div>
                  <div className="text-sm font-medium text-[#1D3557] px-3 py-1 bg-blue-50 rounded-full mt-auto mb-2">{doc.hospital}</div>
                </div>
                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-cover bg-center p-6 text-center"
                  style={{
                    backgroundImage: `linear-gradient(rgba(29, 53, 87, 0.85), rgba(29, 53, 87, 0.95)), url(${doc.image})`,
                  }}
                >
                  <div className="font-bold text-xl mb-2">{doc.name}</div>
                  <div className="text-sm mb-2">{doc.degree}</div>
                  <div className="text-sm mb-4 opacity-90">{doc.exp + " " + "years of experience"}</div>
                  <div className="text-sm font-semibold text-yellow-400">{doc.hospital}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join the Petric Crew Section */}
      <div className="w-full max-w-5xl mt-24 bg-yellow-400 rounded-[2.5rem] p-10 sm:p-14 shadow-xl flex flex-col items-center text-center mx-4 relative overflow-hidden">
        {/* Decorative elements for the yellow section */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply opacity-50 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply opacity-50 blur-3xl translate-y-1/3 -translate-x-1/2"></div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl outfit-bold text-black mb-6 relative z-10">Join the Petric Crew</h2>
        <p className="text-black/80 font-medium text-lg sm:text-xl mb-10 max-w-2xl relative z-10">
          Become a part of our growing community of pet lovers and trusted partners. Take your pet parenting to the next level!
        </p>
        <div className="flex flex-col sm:flex-row gap-5 relative z-10">
          <a href="https://play.google.com/store/apps/details?id=com.petric.app" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:scale-105 hover:bg-gray-800 transition-all text-lg flex items-center justify-center">
            Download App
          </a>
          <button className="bg-white text-black px-8 py-3.5 rounded-full font-bold shadow-lg hover:scale-105 transition-all text-lg border-2 border-transparent hover:border-black flex items-center justify-center">
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
}
