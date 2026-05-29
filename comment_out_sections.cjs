const fs = require('fs');
const path = '/Users/deep/Documents/Petric-website-main/src/pages/ProductDetails.jsx';

let content = fs.readFileSync(path, 'utf8');

// The block to comment out spans from 
// {/* More by Brand */} 
// down to the end of {/* Similar Products */} section

const startString = '{/* More by Brand */}';
const endString = '          </section>\n        )}';

const startIndex = content.indexOf(startString);
const lastEndIndex = content.lastIndexOf(endString) + endString.length;

if (startIndex !== -1 && lastEndIndex > startIndex) {
    let before = content.slice(0, startIndex);
    let sectionToComment = content.slice(startIndex, lastEndIndex);
    let after = content.slice(lastEndIndex);

    // Replace nested JSX comments so it doesn't break the outer comment
    sectionToComment = sectionToComment.replace(/\{\/\*/g, '//').replace(/\*\/\}/g, '');

    content = before + '{/* \n' + sectionToComment + '\n*/}' + after;
    fs.writeFileSync(path, content);
    console.log("Success");
} else {
    console.log("Could not find sections");
}
