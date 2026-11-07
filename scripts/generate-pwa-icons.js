import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function generateIcons() {
  const logoPath = 'public/assets/logos/quiz-logo.png';
  if (!fs.existsSync(logoPath)) {
    console.error('Logo not found:', logoPath);
    return;
  }

  // 1. icon-192.png (192x192 on #111812 background with padding)
  const logo192 = await sharp(logoPath)
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 17, g: 24, b: 18, alpha: 1 } // #111812
    }
  })
    .composite([{ input: logo192, gravity: 'center' }])
    .png()
    .toFile('public/icon-192.png');

  // 2. icon-512.png (512x512 on #111812 background with padding)
  const logo512 = await sharp(logoPath)
    .resize(440, 440, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 17, g: 24, b: 18, alpha: 1 }
    }
  })
    .composite([{ input: logo512, gravity: 'center' }])
    .png()
    .toFile('public/icon-512.png');

  // 3. icon-maskable-512.png (512x512 with safe zone ~75% centered for Android adaptive icons)
  const logoMaskable = await sharp(logoPath)
    .resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 17, g: 24, b: 18, alpha: 1 }
    }
  })
    .composite([{ input: logoMaskable, gravity: 'center' }])
    .png()
    .toFile('public/icon-maskable-512.png');

  // 4. copy / create favicon.svg in public/assets
  if (!fs.existsSync('public/assets/favicon.svg')) {
    const hondaSvg = fs.readFileSync('public/assets/logos/honda.svg', 'utf8');
    fs.writeFileSync('public/assets/favicon.svg', hondaSvg, 'utf8');
  }

  console.log('PWA icons created successfully:');
  console.log(' - public/icon-192.png');
  console.log(' - public/icon-512.png');
  console.log(' - public/icon-maskable-512.png');
  console.log(' - public/assets/favicon.svg');
}

generateIcons();

