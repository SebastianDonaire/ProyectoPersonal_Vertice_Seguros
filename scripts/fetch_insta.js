// ==========================================
// MANUAL INSTAGRAM UPDATE SCRIPT
// ==========================================
// Automatic scraping is currently blocked by Instagram and public viewers.
// To update your feed manually:
// 
// 1. Visit your profile (https://www.instagram.com/verticeseguros_ve/) or a viewer like Imginn/Picuki.
// 2. Download the latest 6 images you want to show.
// 3. Name them: insta-1.jpg, insta-2.jpg, ... insta-6.jpg
// 4. Place them in: public/images/instagram/
// 5. Run this script to verify they exist and are linked correctly.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/images/instagram');
const MAX_IMAGES = 6;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Checking for images in: ${OUTPUT_DIR}`);

let foundCount = 0;
for (let i = 1; i <= MAX_IMAGES; i++) {
    const filename = `insta-${i}.jpg`;
    const filepath = path.join(OUTPUT_DIR, filename);

    if (fs.existsSync(filepath)) {
        console.log(`✅ Found: ${filename}`);
        foundCount++;
    } else {
        console.log(`❌ Missing: ${filename}`);
    }
}

console.log('------------------------------------------------');
if (foundCount === MAX_IMAGES) {
    console.log('All images are present! Your website should show the updated feed.');
} else {
    console.log(`You have ${foundCount} / ${MAX_IMAGES} images.`);
    console.log('Please download the missing images manually and place them in the folder.');
}

