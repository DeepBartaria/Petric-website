import { post } from './api';

export const logPageVisit = async (description, type = "Visit") => {
  const token = localStorage.getItem('petric_token');
  try {
    await post('logs/add', { description, type }, {
      headers: token ? { Authorization: token } : {}
    });
  } catch (err) {
    console.error("Failed to log page visit:", err);
  }
};
