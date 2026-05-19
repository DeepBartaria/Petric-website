import fs from 'fs';
import path from 'path';

const pages = [
  'src/pages/NewHome.jsx',
  'src/pages/Reorder.jsx',
  'src/pages/AllCategories.jsx',
  'src/pages/CategoryPage.jsx',
  'src/pages/ProductDetails.jsx',
  'src/pages/AllBrands.jsx'
];

for (const p of pages) {
  if (!fs.existsSync(p)) {
    console.log(`File not found: ${p}`);
    continue;
  }

  let content = fs.readFileSync(p, 'utf8');

  // Check if we already have the listener
  if (content.includes("window.addEventListener('openCart'")) {
    console.log(`Already added to ${p}`);
    continue;
  }

  // We want to insert the useEffect right after the state declarations
  // Most components have const [isCartOpen, setIsCartOpen] = useState(false);
  const searchRegex = /const \[isCartOpen, setIsCartOpen\] = useState\(false\);/;
  const match = content.match(searchRegex);
  
  if (match) {
    const listenerCode = `\n  useEffect(() => {\n    const handleOpenCart = () => setIsCartOpen(true);\n    window.addEventListener('openCart', handleOpenCart);\n    return () => window.removeEventListener('openCart', handleOpenCart);\n  }, []);\n`;
    
    content = content.replace(searchRegex, match[0] + listenerCode);
    
    // Also we need to make sure useEffect is imported if it isn't.
    // It's usually imported in these files, but let's check
    if (!content.includes('useEffect')) {
       // add useEffect to react import
       content = content.replace(/import React, {([^}]*)} from 'react';/, "import React, { useEffect, $1 } from 'react';");
    }
    
    fs.writeFileSync(p, content);
    console.log(`Added listener to ${p}`);
  } else {
    console.log(`Could not find isCartOpen in ${p}`);
  }
}
