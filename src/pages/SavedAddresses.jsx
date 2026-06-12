import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiBriefcase,
  FiCheckCircle,
  FiEdit2,
  FiHome,
  FiLoader,
  FiMapPin,
  FiNavigation,
  FiPlus,
  FiX,
} from 'react-icons/fi';

import NewHomeNavbar from '../components/NewHomeNavbar';
import Footer from '../components/Footer';
import {
  addSavedAddress,
  getSavedAddresses,
  setDefaultAddress,
  updateSavedAddress,
} from '../api/addressApi';

const ADDRESS_TYPES = {
  1: { label: 'Home', icon: FiHome },
  2: { label: 'Work', icon: FiBriefcase },
  3: { label: 'Others', icon: FiMapPin },
};

const emptyForm = {
  username: '',
  mobileNo: '',
  fullAddress: '',
  landmark: '',
  pincode: '',
  area: '',
  city: '',
  state: '',
  country: 'India',
  type: '1',
  lat: '',
  lng: '',
  address: '',
};

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('petric_user')) || {};
  } catch {
    return {};
  }
};

const getAddressPart = (components, type) => {
  return components.find((item) => item.types.includes(type))?.long_name || '';
};

export default function SavedAddresses() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('petric_token');

  const loadAddresses = async () => {
    setLoading(true);
    const response = await getSavedAddresses();

    if (response?.type === 'success') {
      setAddresses(response.address || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      loadAddresses();
    } else {
      setLoading(false);
    }
  }, [token]);

  const openAddForm = () => {
    const user = getStoredUser();

    setEditingAddress(null);
    setMessage('');
    setForm({
      ...emptyForm,
      username: user?.name || user?.username || '',
      mobileNo: user?.mobileNo || user?.mobile || '',
    });
    setIsFormOpen(true);
  };

  const openEditForm = (address) => {
    setEditingAddress(address);
    setMessage('');
    setForm({
      username: address.username || '',
      mobileNo: address.mobileNo || '',
      fullAddress: address.fullAddress || '',
      landmark: address.landmark || '',
      pincode: address.pincode || '',
      area: address.area || '',
      city: address.city || '',
      state: address.state || '',
      country: address.country || 'India',
      type: address.type || '1',
      lat: address.lat || '',
      lng: address.lng || '',
      address: address.address || '',
    });
    setIsFormOpen(true);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setMessage('Location is not supported in this browser.');
      return;
    }

    setDetectingLocation(true);
    setMessage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        try {
          const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
          let detected = { lat, lng, address: '' };

          if (apiKey) {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const result = data.results?.[0];

            if (result) {
              const components = result.address_components || [];

              detected = {
                lat,
                lng,
                address: result.formatted_address || '',
                pincode: getAddressPart(components, 'postal_code'),
                city:
                  getAddressPart(components, 'locality') ||
                  getAddressPart(components, 'administrative_area_level_3'),
                state: getAddressPart(components, 'administrative_area_level_1'),
                area:
                  getAddressPart(components, 'sublocality_level_1') ||
                  getAddressPart(components, 'sublocality_level_2'),
                landmark:
                  getAddressPart(components, 'premise') ||
                  getAddressPart(components, 'neighborhood'),
              };
            }
          }

          setForm((prev) => ({
            ...prev,
            ...detected,
          }));
        } catch {
          setMessage('Location detected, but address details could not be filled.');
          setForm((prev) => ({
            ...prev,
            lat,
            lng,
          }));
        }

        setDetectingLocation(false);
      },
      () => {
        setMessage('Please allow location permission to detect your address.');
        setDetectingLocation(false);
      }
    );
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.username || !form.mobileNo || !form.fullAddress || !form.pincode) {
      setMessage('Please fill full name, mobile number, full address and pincode.');
      return;
    }

    setSaving(true);
    setMessage('');

    const payload = {
      ...form,
      type: String(form.type),
      country: form.country || 'India',
    };

    const response = editingAddress
      ? await updateSavedAddress(editingAddress._id, payload)
      : await addSavedAddress(payload);

    if (response?.type === 'success') {
      setIsFormOpen(false);
      setEditingAddress(null);
      await loadAddresses();
    } else {
      setMessage(response?.message || 'Something went wrong while saving address.');
    }

    setSaving(false);
  };

  const handleDefault = async (id) => {
    const response = await setDefaultAddress(id);

    if (response?.type === 'success') {
      await loadAddresses();
    } else {
      setMessage(response?.message || 'Could not set default address.');
    }
  };

  if (!token) {
    return (
      <>
        <NewHomeNavbar />
        <main className="min-h-[60vh] bg-white px-4 py-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-black">Saved Addresses</h1>
            <p className="mt-3 text-gray-600">Please login to view your saved addresses.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-6 rounded-full bg-[#FFD000] px-6 py-3 font-semibold text-black"
            >
              Go to Home
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NewHomeNavbar />

      <main className="bg-white px-4 py-8">
        <section className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600"
              >
                <FiArrowLeft />
                Back
              </button>
              <h1 className="text-2xl font-bold text-black md:text-3xl">
                Saved Addresses
              </h1>
            </div>

            <button
              onClick={openAddForm}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD000] px-5 py-3 font-semibold text-black"
            >
              <FiPlus />
              Add Address
            </button>
          </div>

          {message && (
            <div className="mb-5 rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-gray-800">
              {message}
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center text-gray-500">
              <FiLoader className="mr-2 animate-spin" />
              Loading addresses...
            </div>
          ) : addresses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
              <FiMapPin className="mx-auto mb-4 text-4xl text-gray-400" />
              <h2 className="text-xl font-semibold text-black">No saved address yet</h2>
              <p className="mt-2 text-gray-600">Add your first delivery address.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map((address) => {
                const meta = ADDRESS_TYPES[address.type] || ADDRESS_TYPES[3];
                const Icon = meta.icon;

                return (
                  <article
                    key={address._id}
                    className="rounded-2xl border border-gray-200 p-5 shadow-sm"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-xl text-black">
                          <Icon />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="font-bold text-black">{meta.label}</h2>
                            {address.isDefault && (
                              <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {address.username} | {address.mobileNo}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => openEditForm(address)}
                        className="rounded-full border border-gray-200 p-2 text-gray-700"
                        aria-label="Edit address"
                      >
                        <FiEdit2 />
                      </button>
                    </div>

                    <p className="text-sm leading-6 text-gray-800">{address.fullAddress}</p>

                    <p className="mt-2 text-sm text-gray-600">
                      {[address.landmark, address.area, address.city, address.state, address.pincode]
                        .filter(Boolean)
                        .join(', ')}
                    </p>

                    {!address.isDefault && (
                      <button
                        onClick={() => handleDefault(address._id)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-semibold text-black"
                      >
                        <FiCheckCircle />
                        Set as default
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {isFormOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/40 px-4 py-6">
          <div className="ml-auto flex h-full max-w-xl flex-col rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 className="text-xl font-bold text-black">
                {editingAddress ? 'Edit Address' : 'Add Address'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="rounded-full p-2 text-gray-600 hover:bg-gray-100"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-5">
              <button
                type="button"
                onClick={handleDetectLocation}
                className="mb-5 flex w-full items-center justify-center gap-2 rounded-full border border-black px-4 py-3 font-semibold text-black"
              >
                {detectingLocation ? <FiLoader className="animate-spin" /> : <FiNavigation />}
                Use current location
              </button>

              <div className="grid gap-4">
                <input
                  value={form.username}
                  onChange={(event) => handleChange('username', event.target.value)}
                  placeholder="Full name"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <input
                  value={form.mobileNo}
                  onChange={(event) => handleChange('mobileNo', event.target.value)}
                  placeholder="Mobile number"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <textarea
                  value={form.fullAddress}
                  onChange={(event) => handleChange('fullAddress', event.target.value)}
                  placeholder="Full address"
                  rows="4"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <input
                  value={form.landmark}
                  onChange={(event) => handleChange('landmark', event.target.value)}
                  placeholder="Landmark"
                  className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={form.area}
                    onChange={(event) => handleChange('area', event.target.value)}
                    placeholder="Area"
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    value={form.pincode}
                    onChange={(event) => handleChange('pincode', event.target.value)}
                    placeholder="Pincode"
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    value={form.city}
                    onChange={(event) => handleChange('city', event.target.value)}
                    placeholder="City"
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />

                  <input
                    value={form.state}
                    onChange={(event) => handleChange('state', event.target.value)}
                    placeholder="State"
                    className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold text-gray-700">Save address as</p>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(ADDRESS_TYPES).map(([type, meta]) => {
                      const Icon = meta.icon;
                      const isActive = form.type === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleChange('type', type)}
                          className={`flex items-center justify-center gap-2 rounded-full border px-3 py-3 font-semibold ${
                            isActive
                              ? 'border-black bg-[#FFD000] text-black'
                              : 'border-gray-300 text-gray-700'
                          }`}
                        >
                          <Icon />
                          {meta.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {saving && <FiLoader className="animate-spin" />}
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}