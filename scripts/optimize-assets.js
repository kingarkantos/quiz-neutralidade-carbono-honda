import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = path.resolve('public/assets');

function getAllFiles(dir, extFilter = ['.png', '.jpg', '.jpeg']) {
  let files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, extFilter));
    } else if (extFilter.includes(path.extname(item).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimize() {
  console.log('--- Starting Image Optimization (WebP + Compressed PNG) ---');
  const allImages = getAllFiles(assetsDir);
  console.log(`Found ${allImages.length} images in ${assetsDir}`);

  let totalOriginalBytes = 0;
  let totalWebpBytes = 0;
  let totalOptimizedPngBytes = 0;

  for (const file of allImages) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.webp') continue;

    const relPath = path.relative(assetsDir, file);
    const originalSize = fs.statSync(file).size;
    totalOriginalBytes += originalSize;

    const webpPath = file.substring(0, file.length - ext.length) + '.webp';

    try {
      const meta = await sharp(file).metadata();
      const isBackground = relPath.includes('bg') || relPath.includes('FUNDOS');
      const maxDim = isBackground ? 1920 : 1200;

      const needsResize = (meta.width && meta.width > maxDim) || (meta.height && meta.height > maxDim);

      // 1. Generate WebP
      let sharpWebp = sharp(file);
      if (needsResize) {
        sharpWebp = sharpWebp.resize({
          width: meta.width >= meta.height ? maxDim : undefined,
          height: meta.height > meta.width ? maxDim : undefined,
          withoutEnlargement: true,
          fit: 'inside'
        });
      }
      const webpBuffer = await sharpWebp
        .webp({ quality: 85, effort: 6 })
        .toBuffer();
      
      fs.writeFileSync(webpPath, webpBuffer);
      const webpSize = webpBuffer.length;
      totalWebpBytes += webpSize;

      // 2. Optimize original PNG in-place
      if (ext === '.png') {
        let sharpPng = sharp(file);
        if (needsResize) {
          sharpPng = sharpPng.resize({
            width: meta.width >= meta.height ? maxDim : undefined,
            height: meta.height > meta.width ? maxDim : undefined,
            withoutEnlargement: true,
            fit: 'inside'
          });
        }
        const pngBuffer = await sharpPng
          .png({ compressionLevel: 9, effort: 9, quality: 85 })
          .toBuffer();

        fs.writeFileSync(file, pngBuffer);
        totalOptimizedPngBytes += pngBuffer.length;
      } else {
        totalOptimizedPngBytes += originalSize;
      }

      console.log(`✓ ${relPath} | Orig: ${(originalSize / 1024).toFixed(0)}KB -> WebP: ${(webpSize / 1024).toFixed(0)}KB (-${Math.round((1 - webpSize / originalSize) * 100)}%)`);
    } catch (err) {
      console.error(`Error processing ${relPath}:`, err.message);
    }
  }

  console.log('\n================ SUMMARY ================');
  console.log(`Original total: ${(totalOriginalBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP total:     ${(totalWebpBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Optimized PNG:  ${(totalOptimizedPngBytes / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total saved with WebP: ${(100 - (totalWebpBytes / totalOriginalBytes) * 100).toFixed(1)}%`);
  console.log('=========================================');
}

optimize();

