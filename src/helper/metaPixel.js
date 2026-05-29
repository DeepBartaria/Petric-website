const hasPixel = () =>
  typeof window !== 'undefined' && typeof window.fbq === 'function';

const cleanNumber = (value) => {
  const number = Number(String(value ?? 0).replace(/[^\d.]/g, ''));
  return Number.isFinite(number) ? number : 0;
};

const getEventId = (eventName) => {
  const random =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  return `${eventName}-${random}`;
};

export const trackMetaEvent = (eventName, params = {}, options = {}) => {
  if (!hasPixel() || !eventName) return null;

  const eventId = options.eventId || getEventId(eventName);

  window.fbq('track', eventName, params, { eventID: eventId });

  return eventId;
};

export const trackMetaPageView = () => {
  if (!hasPixel()) return null;

  window.fbq('track', 'PageView');

  return true;
};

export const trackViewContent = (product) => {
  if (!product) return null;

  const productId = product._id || product.id || product.productId;
  const price = cleanNumber(
    product.discountedPrice ||
      product.price ||
      product.originalPrice ||
      product.oldPrice
  );

  return trackMetaEvent('ViewContent', {
    content_ids: productId ? [String(productId)] : [],
    content_type: 'product',
    content_name: product.name || '',
    value: price,
    currency: 'INR',
  });
};

export const trackAddToCart = (product) => {
  if (!product) return null;

  const productId = product.productId || product.id || product._id;
  const quantity = Number(product.quantity || 1);
  const price = cleanNumber(
    product.discountedPrice ||
      product.price ||
      product.originalPrice ||
      product.oldPrice
  );

  return trackMetaEvent('AddToCart', {
    content_ids: productId ? [String(productId)] : [],
    content_type: 'product',
    content_name: product.name || '',
    value: price * quantity,
    currency: 'INR',
    num_items: quantity,
  });
};

export const trackInitiateCheckout = (cartItems = [], totalPayable = 0) => {
  return trackMetaEvent('InitiateCheckout', {
    content_ids: cartItems
      .map((item) => item.productId || item.id || item._id)
      .filter(Boolean)
      .map(String),
    content_type: 'product',
    value: cleanNumber(totalPayable),
    currency: 'INR',
    num_items: cartItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    ),
  });
};

export const trackPurchase = ({
  cartItems = [],
  totalPayable = 0,
  orderId,
} = {}) => {
  return trackMetaEvent('Purchase', {
    content_ids: cartItems
      .map((item) => item.productId || item.id || item._id)
      .filter(Boolean)
      .map(String),
    content_type: 'product',
    value: cleanNumber(totalPayable),
    currency: 'INR',
    num_items: cartItems.reduce(
      (sum, item) => sum + Number(item.quantity || 0),
      0
    ),
    order_id: orderId ? String(orderId) : undefined,
  });
};