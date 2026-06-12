const fs = require('fs');
const path = '/Users/deep/Documents/Petric-website-main/src/pages/ProductDetails.jsx';

let content = fs.readFileSync(path, 'utf8');

// 1. Remove the local ProductCard component (lines 23 to 108 approx)
const localProductCardRegex = /function ProductCard\(\{ product \}\) \{[\s\S]*?return \([\s\S]*?<\/article>\s*\);\s*\}/;
content = content.replace(localProductCardRegex, '');

// 2. Import the actual ProductCard
const importRegex = /import NewHomeNavbar from '\.\.\/components\/NewHomeNavbar';/;
content = content.replace(importRegex, "import NewHomeNavbar from '../components/NewHomeNavbar';\nimport ProductCard from '../components/ProductCard';");

// 3. Add the helper function formatProductForCard
const helperRegex = /function getPetParentCount/;
content = content.replace(helperRegex, `function formatProductForCard(p) {
  const variants = p.variants?.map(v => ({
    id: v._id,
    weight: v.name,
    unit: v.unit || '',
    originalPrice: v.originalPrice,
    discountedPrice: v.discountedPrice,
    price: \`₹\${v.discountedPrice}\`,
    oldPrice: \`₹\${v.originalPrice}\`,
    discount: Math.round(((v.originalPrice - v.discountedPrice) / v.originalPrice) * 100) + '%'
  })) || [];

  const defaultVariant = variants[0] || {};

  return {
    id: p._id,
    productId: p._id,
    variantId: defaultVariant.id || null,
    variantName: defaultVariant.weight || '',
    unit: defaultVariant.unit || '',
    img: p.productImage,
    name: p.name,
    description: p.description || '',
    weight: defaultVariant.weight || '',
    price: defaultVariant.price || '',
    oldPrice: defaultVariant.oldPrice || '',
    originalPrice: defaultVariant.originalPrice,
    discountedPrice: defaultVariant.discountedPrice,
    discount: defaultVariant.discount || '',
    variants: variants,
    isBestSeller: p.isBestSeller,
    isBestAvailable: p.isBestAvailable,
    createdAt: p.createdAt,
    brand: p.brand?.name || 'Petric'
  };
}

function getPetParentCount`);

// 4. Update the mapping for similarProducts
const similarProductsRegex = /\.map\(sp => \{[\s\S]*?return \{[\s\S]*?oldPrice: v\.originalPrice,[\s\S]*?discount:.*?\} \: '',[\s\S]*?\};[\s\S]*?\}\)/;
content = content.replace(similarProductsRegex, `.map(sp => formatProductForCard(sp))`);

// 5. Update the mapping for brandProducts
const brandProductsRegex = /\.map\(bp => \{[\s\S]*?return \{[\s\S]*?oldPrice: v\.originalPrice,[\s\S]*?discount:.*?\} \: '',[\s\S]*?\};[\s\S]*?\}\)/;
content = content.replace(brandProductsRegex, `.map(bp => formatProductForCard(bp))`);

// 6. Update ProductCard usage
const productCardUsageRegex = /<ProductCard key=\{i\} product=\{p\} \/>/g;
content = content.replace(productCardUsageRegex, `<ProductCard 
                  key={i} 
                  product={p} 
                  mobileMode="carousel" 
                  desktopMode="carousel" 
                  onOpenProduct={(prod) => navigate(\`/product/\${prod.id}\`)} 
                  onOpenVariants={(prod) => navigate(\`/product/\${prod.id}\`)}
                  onAddToCart={(prod) => {
                    const cartProduct = {
                      id: prod.id,
                      productId: prod.id,
                      img: prod.img,
                      brand: prod.brand || 'Petric',
                      name: prod.name,
                      price: (prod.discountedPrice || prod.originalPrice || 0).toString(),
                      oldPrice: (prod.originalPrice || 0).toString(),
                      originalPrice: prod.originalPrice || 0,
                      discountedPrice: prod.discountedPrice || prod.originalPrice || 0,
                      quantity: 1,
                    };
                    addProductToCart(cartProduct);
                  }}
                  className="md:w-[260px] lg:w-[280px] md:max-w-[280px]"
                />`);

fs.writeFileSync(path, content);
console.log('Update complete.');
