import { post } from './api';

const runInBackground = (task) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(task, { timeout: 1500 });
    return;
  }

  setTimeout(task, 0);
};

export const logActivity = (description, type) => {
  const token = localStorage.getItem('petric_token');

  if (!token || !description || !type) return;

  runInBackground(() => {
    post(
      'logs/add',
      { description, type },
      { headers: { Authorization: token } }
    ).catch((err) => {
      console.error('Activity log failed:', err);
    });
  });
};

export const logPageVisit = logActivity;