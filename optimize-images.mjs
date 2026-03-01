import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const imagesDir = join(__dirname, 'public', 'images');

const images = readdirSync(imagesDir).filter(f => f.endsWith('.png'));

for (const img of images) {
    const inputPath = join(imagesDir, img);
    const outputPath = join(imagesDir, img.replace('.png', '.webp'));

    await sharp(inputPath)
        .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

    console.log(`Converted: ${img} -> ${img.replace('.png', '.webp')}`);
}

console.log('Done!');
