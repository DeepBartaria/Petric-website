import { get, post, put, del } from '../helper/api';

const toNumber = (value) => {
  return Number(String(value ?? 0).replace(/[^\d.]/g, '')) || 0;
};

const toPriceText = (value) => {
  const amount = toNumber(value);
  return `₹${amount}`;
};

export const mapBackendCartToCartItems = (cart) => {
  if (!cart?.products || !Array.isArray(cart.products)) return [];

  // Aggregate duplicates: same productId+variantId merged into one row with summed quantity.
  // This compensates for the backend currently storing duplicates instead of merging.
  const aggregated = new Map();

  for (const item of cart.products) {
    const product = item.productId || {};
    const productId = (product._id || item.productId)?.toString();
    const variantId = item.variantId?.toString() || '';
    const key = `${productId}-${variantId}`;

    const existing = aggregated.get(key);
    if (existing) {
      existing.quantity += (item.quantity || 1);
    } else {
      aggregated.set(key, {
        id: key,
        productId,
        variantId: item.variantId || null,
        variantName: item.variantName || '',
        unit: item.unit || '',
        img: product.productImage || '',
        name: item.productName || product.name || '',
        description: item.description || '',
        weight: item.variantName || item.unit || '',
        price: toPriceText(item.discountAmount),
        oldPrice: toPriceText(item.originalAmount),
        originalPrice: item.originalAmount || 0,
        discountedPrice: item.discountAmount || 0,
        quantity: item.quantity || 1,
      });
    }
  }

  return Array.from(aggregated.values());
};

export const getStoredDeliveryLocation = () => {
  try {
    const raw = localStorage.getItem('petric_delivery_location');
    if (!raw) return null;

    const location = JSON.parse(raw);
    const lat = Number(location.lat);
    const lng = Number(location.lng);

    if (!lat || !lng) return null;
    return { lat, lng };
  } catch {
    return null;
  }
};

export const checkProductAvailableForLocation = async ({ productId, variantId, lat, lng }) => {
  const token = localStorage.getItem('petric_token');
  if (!token) return { type: 'error', message: 'Login required' };

  const response = await post('product/details', {
    productId,
    lat,
    lng,
  }, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  if (response?.type !== 'success') return response;

  const variants = response.product?.variants || [];
  const hasVariant = !variantId || variants.some(v => String(v._id) === String(variantId));

  if (!hasVariant) {
    return {
      type: 'error',
      message: 'Selected variant is not available at this delivery location',
    };
  }

  return { type: 'success' };
};

export const getBackendProductCart = async () => {
  const token = localStorage.getItem('petric_token');

  if (!token) {
    return { type: 'error', message: 'Login required', cartItems: [] };
  }

  try {
    const response = await get('cart?type=2', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (response?.type !== 'success') {
      return { ...response, cartItems: [] };
    }

    return {
      ...response,
      cartItems: mapBackendCartToCartItems(response.cart),
    };
  } catch (err) {
    // 404/4xx when no cart exists yet on the backend (e.g., right after the
    // last item was removed). Treat as an empty cart instead of crashing.
    return { type: 'success', cart: null, cartItems: [] };
  }
};

export const addProductToBackendCart = async (item) => {
  const token = localStorage.getItem('petric_token');

  if (!token) {
    return { type: 'error', message: 'Login required' };
  }

  const originalAmount = toNumber(item.oldPrice || item.originalPrice || item.price);
  const sellingAmount = toNumber(item.price || item.discountedPrice || item.oldPrice);

  const payload = {
    type: '2',
    products: [
      {
        productId: item.productId || item.id,
        variantId: item.variantId || null,
        variantName: item.variantName || item.weight || '',
        unit: item.unit || '',
        productName: item.name,
        description: item.description || '',
        quantity: item.quantity || 1,
        originalAmount,
        discountAmount: sellingAmount,
      },
    ],
  };

  return await post('cart/add', payload, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export const updateBackendCartQuantity = async ({ productId, variantId, quantity }) => {
  const token = localStorage.getItem('petric_token');
  if (!token) return { type: 'error', message: 'Login required' };

  return await put('cart/update/quantity', {
    type: '2',
    productId,
    variantId,
    quantity,
  }, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};

export const removeBackendCartProduct = async ({ productId, variantId }) => {
  const token = localStorage.getItem('petric_token');
  if (!token) return { type: 'error', message: 'Login required' };

  const qs = `productId=${encodeURIComponent(productId)}&variantId=${encodeURIComponent(variantId || '')}`;
  return await del(`cart/delete/product?${qs}`, {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
};