export const getFullProductForVariantPopup = async (product, get) => {
  try {
    const id = product.id || product._id;
    if (!id) return product;

    const res = await get(`product/details/single/${id}`);
    
    if (res && res.type === 'success' && res.product) {
      // Return the full product object from the API response
      return res.product;
    }
  } catch (error) {
    console.error('Failed to fetch full product details for variant popup:', error);
  }
  
  // Fallback to the provided partial product object if fetch fails
  return product;
};
