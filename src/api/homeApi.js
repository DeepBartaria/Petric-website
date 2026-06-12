import { get, post } from "../helper/api";

// HOMEPAGE PRODUCTS
export const getHomePageProductsApi = async () => {
  return await get("home-page/products");
};

// PRODUCT CATEGORIES
export const getCategoriesApi = async () => {
  return await get("product/category");
};

// HOMEPAGE CATEGORIES
export const getHomePageCategoriesApi = async () => {
  return await get("home-page/categories");
};

// BRANDS
export const getBrandsApi = async () => {
  return await get("product/brand");
};

// ALL PRODUCTS
export const getAllProductsApi = async () => {
  return await post(
    "product/list/all/forUser",
    {
      page: 1,
      limit: 200
    }
  );
};

// SUBCATEGORIES
export const getSubCategoriesApi = async (
  categoryId
) => {
  return await get(
    `product/subCategory?categoryId=${categoryId}`
  );
};