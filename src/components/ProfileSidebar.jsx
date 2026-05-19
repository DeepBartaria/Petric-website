import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { FiCalendar } from 'react-icons/fi';
import { get, put } from '../helper/api';

export default function ProfileSidebar({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dob: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchProfile = async () => {
        setIsLoading(true);
        try {
          const token = localStorage.getItem('petric_token');
          const userStr = localStorage.getItem('petric_user');
          if (token && userStr) {
            const user = JSON.parse(userStr);
            // First try to fetch fresh data if there's an endpoint
            try {
               const res = await get('user/' + user._id, { headers: { Authorization: token } });
               if (res && res.type === 'success' && res.user) {
                 setFormData({
                   name: res.user.name || '',
                   email: res.user.email || '',
                   gender: res.user.gender || '',
                   dob: res.user.dob ? new Date(res.user.dob).toISOString().split('T')[0] : ''
                 });
                 return;
               }
            } catch(e) {
               console.log("Could not fetch user, using local data", e);
            }
            
            // Fallback to local storage data
            setFormData(prev => ({
              ...prev,
              name: user.name || ''
            }));
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchProfile();
    }
  }, [isOpen]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('petric_token');
      const userStr = localStorage.getItem('petric_user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        // We assume PUT /user/:id or PUT /user/update
        let res;
        try {
            res = await put('user/update', {
                name: formData.name,
                email: formData.email,
                gender: formData.gender,
                dob: formData.dob
            }, { headers: { Authorization: token } });
        } catch(e) {
            // fallback
            res = await put('user/' + user._id, {
                name: formData.name,
                email: formData.email,
                gender: formData.gender,
                dob: formData.dob
            }, { headers: { Authorization: token } });
        }
        
        if (res && res.type === 'success') {
           // Update local storage
           const updatedUser = { ...user, name: formData.name };
           localStorage.setItem('petric_user', JSON.stringify(updatedUser));
           alert('Profile updated successfully!');
           onClose();
           window.location.reload(); // To refresh navbar name
        } else {
           alert(res?.message || 'Failed to update profile');
        }
      }
    } catch (e) {
      console.error(e);
      alert('An error occurred while updating profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 flex flex-col shadow-2xl transform transition-transform duration-300 translate-x-0 font-sans">
        
        <div className="flex items-center gap-3 p-4 bg-white sticky top-0 z-10">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <FiArrowLeft className="h-6 w-6 text-black" strokeWidth={2.5} />
          </button>
          <h2 className="text-xl font-bold text-black">Your Profile</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-28 h-28 bg-[#D9D9D9] rounded-full overflow-hidden flex items-center justify-center">
                 <svg viewBox="0 0 100 100" className="w-28 h-28 text-gray-400">
                    <circle cx="50" cy="35" r="15" fill="#A4A4A4" />
                    <path d="M 50 55 C 20 55, 10 90, 10 100 L 90 100 C 90 90, 80 55, 50 55 Z" fill="#A4A4A4" />
                 </svg>
              </div>
              <button className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:bg-gray-50 transition-colors">
                 <MdEdit className="text-black h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-black placeholder-gray-500 outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-shadow text-[15px]"
              />
            </div>
            
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-black placeholder-gray-500 outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-shadow text-[15px]"
              />
            </div>

            <div className="relative">
              <select 
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-black bg-white outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-shadow text-[15px] appearance-none"
              >
                <option value="" disabled hidden>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

            <div className="relative">
              <input 
                type="date" 
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-black placeholder-gray-500 outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-shadow text-[15px] appearance-none"
                style={{
                  color: formData.dob ? 'black' : 'gray'
                }}
              />
            </div>
          </div>
          
        </div>

        <div className="p-4 bg-white mt-auto">
          <button 
            onClick={handleUpdate}
            disabled={isUpdating}
            className="w-full bg-[#FFD000] text-black font-bold text-[17px] py-4 rounded-3xl hover:bg-[#E6BC00] transition-colors disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Update'}
          </button>
        </div>

      </div>
    </>
  );
}
