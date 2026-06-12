const fs = require('fs');
const path = '/Users/deep/Documents/Petric-website-main/src/pages/ProductDetails.jsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Add missing imports
const importRegex = /import ProductCard from '\.\.\/components\/ProductCard';/;
content = content.replace(importRegex, "import ProductCard from '../components/ProductCard';\nimport VariantPopup from '../components/VariantPopup';\nimport useCartAnimation from '../hooks/useCartAnimation';\nimport CartAnimationLayer from '../components/CartAnimationLayer';");

// 2. Add hooks for VariantPopup and CartAnimationLayer inside ProductDetails
const hooksRegex = /const \[mainImage, setMainImage\] = useState\(null\);/;
content = content.replace(hooksRegex, `const [mainImage, setMainImage] = useState(null);
  const [isVariantPopupOpen, setIsVariantPopupOpen] = useState(false);
  const [variantPopupProduct, setVariantPopupProduct] = useState(null);
  
  const { cartRef, flyItems, toasts, cartShake, triggerFlyToCart, onFlyComplete, dismissToast } = useCartAnimation();

  const handleOpenVariants = (prod) => {
    setVariantPopupProduct(prod);
    setIsVariantPopupOpen(true);
  };

  const handleAddToCartForCard = (p) => {
    // P could be from VariantPopup or direct ProductCard add.
    // Ensure it has all required cart fields.
    const cartProduct = {
      id: p.id || p._id,
      productId: p.productId || p._id,
      img: p.img || p.productImage,
      brand: p.brand?.name || p.brand || 'Petric',
      name: p.name,
      variantName: p.variantName || p.weight || '',
      unit: p.unit || '',
      price: (p.discountedPrice || p.originalPrice || p.price || 0).toString(),
      oldPrice: (p.originalPrice || p.oldPrice || 0).toString(),
      originalPrice: p.originalPrice || 0,
      discountedPrice: p.discountedPrice || p.price || 0,
      variantId: p.variantId || null,
      quantity: p.quantity || 1,
    };
    addProductToCart(cartProduct);
  };
`);

// 3. Update CartFloatingButton and insert CartAnimationLayer & VariantPopup
const renderRegex = /<CartFloatingButton[\s\S]*?\/>/;
content = content.replace(renderRegex, `<CartFloatingButton
        ref={cartRef}
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        shake={cartShake}
        onClick={() => setIsCartOpen(true)}
      />

      <CartAnimationLayer
        flyItems={flyItems}
        toasts={toasts}
        onFlyComplete={onFlyComplete}
        onDismissToast={dismissToast}
      />

      <VariantPopup
        isOpen={isVariantPopupOpen}
        onClose={() => setIsVariantPopupOpen(false)}
        product={variantPopupProduct}
        onAddToCart={handleAddToCartForCard}
        onAnimateToCart={triggerFlyToCart}
      />`);

// 4. Update the ProductCard usages to use the new handlers
const productCardUsageRegex = /<ProductCard\s*key=\{i\}\s*product=\{p\}\s*mobileMode="carousel"\s*desktopMode="carousel"\s*onOpenProduct=\{[^\}]+\}\s*onOpenVariants=\{[^\}]+\}\s*onAddToCart=\{[\s\S]*?className="md:w-\[260px\] lg:w-\[280px\] md:max-w-\[280px\]"\s*\/>/g;

content = content.replace(productCardUsageRegex, `<ProductCard 
                  key={i} 
                  product={p} 
                  mobileMode="carousel" 
                  desktopMode="carousel" 
                  onOpenProduct={(prod) => navigate(\`/product/\${prod.id}\`)} 
                  onOpenVariants={handleOpenVariants}
                  onAddToCart={handleAddToCartForCard}
                  onAnimateToCart={triggerFlyToCart}
                  className="md:w-[260px] lg:w-[280px] md:max-w-[280px]"
                />`);

fs.writeFileSync(path, content);
console.log('Update complete.');
