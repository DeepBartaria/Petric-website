import { get } from './api';

export const getAllVeterinarians = async () => {
    try {
      const response = await get(`web/doctor/list`);
      return response;
    } catch (error) {
      console.error("Error fetching veterinarians data:", error);
      return { data: [] };
    }
  };