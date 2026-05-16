import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { FiX, FiMapPin } from 'react-icons/fi';

const libraries = ['places'];

const STORE_COORDINATES = { lat: 28.4416870, lng: 77.0759438 };
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090 }; // Delhi default

export default function DeliveryLocationModal({ isOpen, onClose }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoadingTime, setIsLoadingTime] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const autocompleteRef = useRef(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setSelectedLocation(location);
        if (map) {
          map.panTo(location);
          map.setZoom(15);
        }
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const calculateFallbackTime = (dest) => {
    const R = 6371; // Earth's radius in km
    const dLat = (dest.lat - STORE_COORDINATES.lat) * Math.PI / 180;
    const dLon = (dest.lng - STORE_COORDINATES.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(STORE_COORDINATES.lat * Math.PI / 180) * Math.cos(dest.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distanceKm = R * c;
    
    // Assume average city driving speed is 20 km/h
    const timeHours = distanceKm / 20;
    const timeMinutes = Math.ceil(timeHours * 60);
    return timeMinutes + 20; // 20 mins buffer
  };

  const onMapClick = (e) => {
    if (e.latLng) {
      const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setSelectedLocation(location);
    }
  };

  const onMarkerDragEnd = (e) => {
    if (e.latLng) {
      const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setSelectedLocation(location);
    }
  };

  const handleCalculateTime = () => {
    if (!selectedLocation || !window.google) return;
    
    setIsLoadingTime(true);
    
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [STORE_COORDINATES],
        destinations: [selectedLocation],
        travelMode: 'DRIVING',
        unitSystem: window.google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        setIsLoadingTime(false);
        if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
          const durationSeconds = response.rows[0].elements[0].duration.value;
          const durationMinutes = Math.ceil(durationSeconds / 60);
          const totalDeliveryTime = durationMinutes + 20; // Driving time + 20 mins buffer
          
          setDeliveryTime(totalDeliveryTime);
          
          // Save and dispatch event
          localStorage.setItem('petric_delivery_time', totalDeliveryTime.toString());
          window.dispatchEvent(new CustomEvent('deliveryTimeUpdated', { detail: totalDeliveryTime }));
          
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          console.warn(`Distance Matrix failed (${status}). Using mathematical fallback calculation.`);
          
          const fallbackTime = calculateFallbackTime(selectedLocation);
          setDeliveryTime(fallbackTime);
          
          // Save and dispatch event
          localStorage.setItem('petric_delivery_time', fallbackTime.toString());
          window.dispatchEvent(new CustomEvent('deliveryTimeUpdated', { detail: fallbackTime }));
          
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 font-sans backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <FiMapPin className="text-[#FFD000]" /> Check Delivery Time
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          {isLoaded ? (
            <>
              <div className="relative">
                <Autocomplete
                  onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Search for your area or address..."
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:border-black outline-none transition-colors shadow-sm text-sm"
                  />
                </Autocomplete>
              </div>

              <div className="w-full h-[300px] rounded-xl overflow-hidden border border-gray-200">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={selectedLocation || DEFAULT_CENTER}
                  zoom={selectedLocation ? 15 : 10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={onMapClick}
                  options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                  }}
                >
                  {selectedLocation && (
                    <Marker 
                      position={selectedLocation} 
                      draggable={true}
                      onDragEnd={onMarkerDragEnd}
                    />
                  )}
                </GoogleMap>
              </div>

              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  onClick={handleCalculateTime}
                  disabled={!selectedLocation || isLoadingTime}
                  className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-md
                    ${!selectedLocation ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#FFD000] hover:bg-[#ffdb33] text-black hover:-translate-y-0.5'}`}
                >
                  {isLoadingTime ? 'Calculating...' : 'Confirm Location'}
                </button>
                
                {deliveryTime && (
                  <div className="text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg border border-green-100 w-full text-center animate-pulse">
                    Estimated Delivery Time: {deliveryTime} minutes
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FFD000] border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
