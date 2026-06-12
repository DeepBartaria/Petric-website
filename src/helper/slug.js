export const createSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export const findCategoryBySlug = (categories, slug) =>
  categories.find(
    cat => createSlug(cat.name) === slug
  );

export const findSubCategoryBySlug = (subCategories, slug) =>
  subCategories.find(
    sub => createSlug(sub.name) === slug
  );
export const findBrandBySlug = (brands, slug) =>
  brands.find(
    brand => createSlug(brand.name) === slug
  );
