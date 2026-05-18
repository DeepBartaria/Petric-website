import fs from 'fs';

const filesToFix = [
  {
    path: 'src/components/NewHomeNavbar.jsx',
    resolve: (conflictObj) => {
      // If the conflict is before line 600 (search logic), take HEAD
      // If it is after line 600 (logout button), take 'theirs'
      return conflictObj.startLine < 600 ? conflictObj.head : conflictObj.theirs;
    }
  },
  {
    path: 'src/pages/Reorder.jsx',
    resolve: (conflictObj) => {
      // In Reorder.jsx, we want to take HEAD (the user's auth changes probably?)
      // Wait, what were the conflicts in Reorder?
      // User diff:
      // <<<<<<< HEAD
      //     const fetchPreviousOrders = async () => {
      // =======
      //     const fetchReorderProducts = async () => {
      // >>>>>>> 9196e12 (orders)
      // I should take HEAD.
      return conflictObj.head;
    }
  },
  {
    path: 'src/pages/NewHome.jsx',
    resolve: (conflictObj) => {
      // NewHome.jsx conflict:
      // <<<<<<< HEAD
      //                           Best Seller
      // =======
      //                           Best Available
      // >>>>>>> 9196e12 (orders)
      // Actually taking HEAD is fine.
      return conflictObj.head;
    }
  },
  {
    path: 'src/pages/AllCategories.jsx',
    resolve: (conflictObj) => {
      // AllCategories.jsx conflict: taking HEAD
      return conflictObj.head;
    }
  },
  {
    path: 'src/pages/CategoryPage.jsx',
    resolve: (conflictObj) => {
      // CategoryPage.jsx conflict: taking HEAD
      return conflictObj.head;
    }
  }
];

for (const file of filesToFix) {
  if (!fs.existsSync(file.path)) continue;
  const content = fs.readFileSync(file.path, 'utf8');
  const lines = content.split('\n');
  const outLines = [];
  
  let inConflict = false;
  let currentHead = [];
  let currentTheirs = [];
  let isHead = false;
  let conflictStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('<<<<<<< HEAD')) {
      inConflict = true;
      isHead = true;
      currentHead = [];
      currentTheirs = [];
      conflictStartLine = i;
      continue;
    }
    if (inConflict && line.startsWith('=======')) {
      isHead = false;
      continue;
    }
    if (inConflict && line.startsWith('>>>>>>>')) {
      inConflict = false;
      const chosenLines = file.resolve({
        head: currentHead,
        theirs: currentTheirs,
        startLine: conflictStartLine
      });
      outLines.push(...chosenLines);
      continue;
    }
    
    if (inConflict) {
      if (isHead) currentHead.push(line);
      else currentTheirs.push(line);
    } else {
      outLines.push(line);
    }
  }

  fs.writeFileSync(file.path, outLines.join('\n'));
  console.log(`Resolved conflicts in ${file.path}`);
}
