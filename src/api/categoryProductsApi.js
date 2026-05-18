import { post } from '../helper/api';

/**
 * TEMPORARY helper — fetches ALL products for a category/subcategory in one call,
 * so the frontend can sort them by bestSeller > bestAvailable > oldest→newest.
 *
 * Why this exists:
 * The backend's getAllProductForUser endpoint doesn't currently support a "velocity"
 * sortBy option. Until that's added on the backend and deployed, we fetch everything
 * matching the filter in one shot and sort it in JavaScript.
 *
 * When to remove this:
 * Once the backend supports `sortBy: "velocity"` (or equivalent), CategoryPage.jsx
 * can switch back to its original paginated fetchProducts logic, and this file can
 * be deleted.
 */
export const getAllCategoryProductsTemp = async ({ categoryId, subCategoryId }) => {
  const body = {
    page: 1,
    limit: 1000, // largest category is ~395 products — comfortable headroom
  };

  if (subCategoryId) {
    body.productSubCategory = [subCategoryId];
  } else if (categoryId) {
    body.productCategory = [categoryId];
  }

  try {
    const response = await post('product/list/all/forUser', body);
    return response;
  } catch (error) {
    console.error("Error fetching all category products:", error);
    return { products: [], totalProducts: 0 };
  }
};