import React, { useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { BiCurrentLocation } from 'react-icons/bi';
import mapPin from '../assets/mappin.png';
import { useDialog } from '../context/DialogContext';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
  position: 'relative',
};

const center = { lat: 28.4371631, lng: 77.0430348 };

const locations = [
  { lat: 28.502858053940766, lng: 77.06129760148954 },
  { lat: 28.51066639068595, lng: 77.04933885301755},
  { lat: 28.424860975677763, lng: 77.09288127817358 },
  { lat: 28.434474623963936, lng: 77.06546202541301 },
  { lat: 28.461406791726848, lng: 77.08817157202206 },
  { lat: 28.435762044625292, lng: 77.11156659596524 },
  { lat: 28.460788202282917, lng: 77.07941881377668},
  { lat: 28.419963975680535, lng: 77.047462437069 },
];


export default function LocateClinic() {
  const { showDialog } = useDialog();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          if (mapRef.current) {
            mapRef.current.panTo(pos);
            mapRef.current.setZoom(15);
          }
        },
        () => {
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='p-4 py-10 sm:p-8 md:p-12 lg:p-20'>
      <div className="w-full flex flex-col md:flex-row rounded-2xl border border-[#1D3557]">
        {/* Left Side */}
        <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center bg-gradient-to-r rounded-2xl from-[#1D3557]/15 to[#FFFFFF]">
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-5xl outfit-bold primary-color mb-2">
            Locate A Petric
            <p className="text-[#FF5757] mt-1 sm:mt-2 md:mt-3">Pet Clinic Near You</p>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 mt-2 w-full md:w-[60%]">
            With 12+ Trusted Partner Healthcare Facilities Across Gurgaon, We Are Dedicated To Making Pet Healthcare Accessible And Convenient.
          </p>
          <button className="bg-[#1D3557] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold w-fit shadow transition text-sm sm:text-base" onClick={showDialog}>
            Book Now
          </button>
        </div>
        <div className="md:w-1/2 p-2 sm:p-4 flex items-center justify-center relative">
          {isLoaded ? (
            <div className="w-full h-[300px] md:h-full relative">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={map => (mapRef.current = map)}
              >
                {locations.map((loc, idx) => (
                  <Marker key={idx} position={loc} icon={{
                    url: mapPin,
                    scaledSize: { width: 40, height: 40 } // Smaller size for mobile
                  }} />
                ))}
                {userLocation && (
                  <Marker position={userLocation} icon={{
                    url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    scaledSize: { width: 25, height: 25 }
                  }} />
                )}
              </GoogleMap>
              <button
                onClick={handleCurrentLocation}
                className="absolute top-15 sm:top-16 right-3 sm:right-2 z-10 bg-white border border-gray-300 rounded-full shadow px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition"
              >
                <BiCurrentLocation className='h-5 w-5 text-red-500' />
              </button>
            </div>
          ) : (
            <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center bg-gray-100 rounded-xl text-sm sm:text-base">Loading map...</div>
          )}
        </div>
      </div>
    </div>
  );
} 