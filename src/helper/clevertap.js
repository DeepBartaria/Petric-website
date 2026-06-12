import clevertap from 'clevertap-web-sdk';

const CLEVERTAP_ENABLED = import.meta.env.VITE_CLEVERTAP_ENABLED === 'true';
const CLEVERTAP_ACCOUNT_ID = import.meta.env.VITE_CLEVERTAP_ACCOUNT_ID;
const CLEVERTAP_REGION = import.meta.env.VITE_CLEVERTAP_REGION || 'global';
const CLEVERTAP_ENV = import.meta.env.VITE_CLEVERTAP_ENV || import.meta.env.MODE;

let isInitialized = false;

const cleanObject = (value) => {
  if (!value || typeof value !== 'object') return {};

  return Object.entries(value).reduce((acc, [key, item]) => {
    if (item === undefined || item === null || item === '') return acc;
    acc[key] = item;
    return acc;
  }, {});
};

const canUseCleverTap = () => {
  return Boolean(
    typeof window !== 'undefined' &&
      CLEVERTAP_ENABLED &&
      CLEVERTAP_ACCOUNT_ID
  );
};

const withDefaultProperties = (properties = {}) => ({
  ...cleanObject(properties),
  Platform: 'Website',
  Environment: CLEVERTAP_ENV,
});

export const buildCleverTapUserProfile = (user = {}) => {
  const identity = user.Identity || user._id || user.id;
  const mobileNo = user.Phone || user.mobileNo || user.mobile || user.phone;

  return cleanObject({
    Identity: identity ? String(identity) : undefined,
    Name: user.Name || user.name,
    Email: user.Email || user.email,
    Phone: mobileNo && !String(mobileNo).startsWith('+') ? `+91${mobileNo}` : mobileNo,
    'Customer Code': user['Customer Code'] || user.udid,
    'Customer Type': user['Customer Type'] || 'User',
  });
};

export const buildProductProperties = (product = {}, extra = {}) => {
  const productId = product.productId || product._id || product.id;
  const variantId = product.variantId || product.selectedVariantId;
  const productName = product.name || product.productName;
  const brand = product.brand?.name || product.brandName || product.brand;
  const category =
    product.category?.name ||
    product.categoryName ||
    product.productCategory?.name ||
    (Array.isArray(product.productCategory) ? product.productCategory[0]?.name : undefined);
  const price = product.price || product.discountedPrice || product.variantPrice;
  const mrp = product.oldPrice || product.mrp || product.originalPrice;

  return cleanObject({
    'Product ID': productId ? String(productId) : undefined,
    'Product Name': productName,
    'Variant ID': variantId ? String(variantId) : undefined,
    'Variant Name': product.variantName || product.weight || product.size,
    Brand: typeof brand === 'string' ? brand : undefined,
    Category: typeof category === 'string' ? category : undefined,
    Price: price,
    MRP: mrp,
    ...extra,
  });
};

export const initCleverTap = () => {
  if (!canUseCleverTap() || isInitialized) return;

  clevertap.privacy.push({ optOut: false });

  if (CLEVERTAP_REGION === 'global') {
    clevertap.init(CLEVERTAP_ACCOUNT_ID);
  } else {
    clevertap.init(CLEVERTAP_ACCOUNT_ID, CLEVERTAP_REGION);
  }

  clevertap.setLogLevel(CLEVERTAP_ENV === 'production' ? 0 : 3);
  isInitialized = true;
};

export const trackCleverTapEvent = (eventName, properties = {}) => {
  if (!canUseCleverTap() || !isInitialized || !eventName) return;

  clevertap.event.push(eventName, withDefaultProperties(properties));
};

export const onUserLogin = (profileData) => {
  if (!canUseCleverTap() || !isInitialized || !profileData?.Identity) return;

  clevertap.onUserLogin.push({
    Site: {
      ...cleanObject(profileData),
      Platform: 'Website',
      Environment: CLEVERTAP_ENV,
    },
  });
};

export const updateProfile = (profileData) => {
  if (!canUseCleverTap() || !isInitialized || !profileData) return;

  clevertap.profile.push({
    Site: {
      ...cleanObject(profileData),
      Platform: 'Website',
      Environment: CLEVERTAP_ENV,
    },
  });
};
