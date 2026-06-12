import { get, post, put } from '../helper/api';

const authConfig = () => ({
  headers: {
    Authorization: localStorage.getItem('petric_token') || '',
    'Content-Type': 'application/json',
  },
});

export const getSavedAddresses = async () => {
  return await get('address', authConfig());
};

export const addSavedAddress = async (payload) => {
  return await post('address/add', payload, authConfig());
};

export const updateSavedAddress = async (id, payload) => {
  return await put(`address/update/${id}`, payload, authConfig());
};

export const setDefaultAddress = async (id) => {
  return await put(`address/default/${id}`, {}, authConfig());
};