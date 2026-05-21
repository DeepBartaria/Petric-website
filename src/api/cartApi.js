import { get, post } from '../helper/api';

const toNumber = (value) => {
  return Number(String(value ?? 0).replace(/[^\d.]/g, '')) || 0;
};

const toPriceText = (value) => {
  const amount = toNumber(value);
  return `₹${amount}`;
};

export const mapBackendCartToCartItems = (cart) => {
  if (!cart?.products || !Array.isArray(cart.products)) {
    return [];
  }

  return cart.products.map((item) => {
    const product = item.productId || {};
    const productId = product._id || item.productId;

    return {
      id: `${productId}-${item.variantId || item.variantName || ''}`,
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
    };
  });
};

export const getBackendProductCart = async () => {
  const token = localStorage.getItem('petric_token');

  if (!token) {
    return { type: 'error', message: 'Login required', cartItems: [] };
  }

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