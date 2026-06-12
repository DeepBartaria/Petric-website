const fs = require('fs');
const path = '/Users/deep/Documents/Petric-website-main/src/pages/ProductDetails.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldBrandCard = `              {brandProducts.map((p, i) => (
                <ProductCard 
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
                      discountedPrice: prod.discountedPrice || 0,
                      quantity: 1,
                    };
                    addProductToCart(cartProduct);
                  }}
                />
              ))}`;

const newBrandCard = `              {brandProducts.map((p, i) => (
                <ProductCard 
                  key={i} 
                  product={p} 
                  mobileMode="carousel" 
                  desktopMode="carousel" 
                  onOpenProduct={(prod) => navigate(\`/product/\${prod.id || prod._id}\`)} 
                  onOpenVariants={handleOpenVariants}
                  onAddToCart={handleAddToCartForCard}
                  onAnimateToCart={triggerFlyToCart}
                />
              ))}`;

const oldSimilarCard = `              {similarProducts.map((p, i) => (
                <ProductCard 
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
                      discountedPrice: prod.discountedPrice || 0,
                      quantity: 1,
                    };
                    addProductToCart(cartProduct);
                  }}
                />
              ))}`;

const newSimilarCard = `              {similarProducts.map((p, i) => (
                <ProductCard 
                  key={i} 
                  product={p} 
                  mobileMode="carousel" 
                  desktopMode="carousel" 
                  onOpenProduct={(prod) => navigate(\`/product/\${prod.id || prod._id}\`)} 
                  onOpenVariants={handleOpenVariants}
                  onAddToCart={handleAddToCartForCard}
                  onAnimateToCart={triggerFlyToCart}
                />
              ))}`;

content = content.replace(oldBrandCard, newBrandCard);
content = content.replace(oldSimilarCard, newSimilarCard);

fs.writeFileSync(path, content, 'utf8');
console.log('Fixed ProductCards in ProductDetails.jsx');
