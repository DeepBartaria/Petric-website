import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Autocomplete } from '@react-google-maps/api';
import { FiX, FiMapPin, FiNavigation, FiMap } from 'react-icons/fi';

const libraries = ['places'];
const STORE_COORDINATES = { lat: 28.4416870, lng: 77.0759438 };
const DEFAULT_CENTER = { lat: 28.6139, lng: 77.2090 };

export default function DeliveryLocationModal({ isOpen, onClose }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoadingTime, setIsLoadingTime] = useState(false);
  const [isFetchingGPS, setIsFetchingGPS] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [gpsError, setGpsError] = useState(null);
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  const onLoad = useCallback((map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const panToLocation = (location) => {
    setSelectedLocation(location);
    if (map) {
      map.panTo(location);
      map.setZoom(15);
    }
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry?.location) {
        panToLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const handleUseMyLocation = () => {
    setGpsError(null);
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }
    setIsFetchingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        panToLocation(location);
        setIsFetchingGPS(false);

        // Reverse geocode to fill the input box
        if (window.google) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK' && results[0] && inputRef.current) {
              inputRef.current.value = results[0].formatted_address;
            }
          });
        }
      },
      (error) => {
        setIsFetchingGPS(false);
        setGpsError('Could not fetch your location. Please allow location access or type your address.');
      },
      { timeout: 10000 }
    );
  };

  const calculateFallbackTime = (dest) => {
    const R = 6371;
    const dLat = (dest.lat - STORE_COORDINATES.lat) * Math.PI / 180;
    const dLon = (dest.lng - STORE_COORDINATES.lng) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(STORE_COORDINATES.lat * Math.PI / 180) * Math.cos(dest.lat * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.ceil((R * c / 20) * 60) + 20;
  };

  const onMapClick = (e) => {
    if (e.latLng) panToLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const onMarkerDragEnd = (e) => {
    if (e.latLng) panToLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
        const time =
          status === 'OK' && response.rows[0].elements[0].status === 'OK'
            ? Math.ceil(response.rows[0].elements[0].duration.value / 60) + 20
            : calculateFallbackTime(selectedLocation);

        const deliveryLocation = {
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          time,
        };

        setDeliveryTime(time);
        localStorage.setItem('petric_delivery_time', time.toString());
        localStorage.setItem('petric_delivery_location', JSON.stringify(deliveryLocation));

        window.dispatchEvent(new CustomEvent('deliveryTimeUpdated', { detail: time }));
        window.dispatchEvent(new CustomEvent('deliveryLocationUpdated', { detail: deliveryLocation }));

        setTimeout(onClose, 1500);
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 font-sans backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-2xl overflow-hidden shadow-2xl flex flex-col transform transition-all">
        
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-black flex items-center gap-2">
            <FiMap
              size={20}
              className="shrink-0 text-black"
            />

            <span className="border-b border-black leading-none pb-[1px]">
              Check Delivery Time
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-black"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4">
          {isLoaded ? (
            <>
              {/* Search input + GPS button row */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Autocomplete
                    onLoad={(ac) => (autocompleteRef.current = ac)}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search for your area or address..."
                      className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:border-black outline-none transition-colors shadow-sm text-sm pr-4"
                    />
                  </Autocomplete>
                </div>

                {/* Use my location button */}
                <button
                  onClick={handleUseMyLocation}
                  disabled={isFetchingGPS}
                  title="Use my current location"
                  className="shrink-0 flex items-center gap-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm whitespace-nowrap"
                >
                  {isFetchingGPS ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  ) : (
                    <FiNavigation className="h-4 w-4" />
                  )}
                  <span className="hidden sm:inline">{isFetchingGPS ? 'Locating...' : 'Use my location'}</span>
                </button>
              </div>

              {/* GPS error */}
              {gpsError && (
                <p className="text-xs text-red-500 -mt-2 px-1">{gpsError}</p>
              )}

              {/* Map */}
              <div className="w-full h-[260px] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={selectedLocation || DEFAULT_CENTER}
                  zoom={selectedLocation ? 15 : 10}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  onClick={onMapClick}
                  options={{ disableDefaultUI: true, zoomControl: true }}
                >
                  {selectedLocation && (
                    <Marker
                      position={selectedLocation}
                      draggable
                      onDragEnd={onMarkerDragEnd}
                    />
                  )}
                </GoogleMap>
              </div>

              {/* Helper text */}
              <p className="text-xs text-gray-400 text-center -mt-1">
                Pin your exact location by clicking on the map or dragging the marker
              </p>

              {/* Confirm button */}
              <button
                onClick={handleCalculateTime}
                disabled={!selectedLocation || isLoadingTime}
                className={`w-full py-3.5 rounded-xl font-bold text-base transition-all shadow-sm
                  ${!selectedLocation
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FFD000] hover:bg-[#ffdb33] text-black hover:-translate-y-0.5 hover:shadow-md'
                  }`}
              >
                {isLoadingTime ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent" />
                    Calculating...
                  </span>
                ) : (
                  'Confirm Location'
                )}
              </button>

              {/* Success message */}
              {deliveryTime && (
                <div className="flex items-center justify-center gap-2 text-green-700 font-bold bg-green-50 px-4 py-3 rounded-xl border border-green-200 text-sm">
                  <FiMapPin className="h-4 w-4 shrink-0" />
                  Estimated delivery: {deliveryTime} minutes 🎉
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center items-center h-[300px]">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#FFD000] border-t-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}