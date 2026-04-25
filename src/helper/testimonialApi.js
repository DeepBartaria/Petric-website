import { get } from './api';

export const getAllTestimonials = async () => {
    try {
      const response = await get(`testimonial/`);
      return response;
    } catch (error) {
      console.error("Error fetching testimonial data:", error);
      return { testimonials: [] };
    }
  };