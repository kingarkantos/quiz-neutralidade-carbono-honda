import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const srcFiles = getFiles('src');
const refs = new Set();
const regex = /["'`]((\/assets\/[^"'`]+))["'`]/g;

srcFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const clean = match[1].split('?')[0];
    refs.add(clean);
  }
});

console.log('Total referenced assets in src:', refs.size);
let totalBytes = 0;
for (const r of Array.from(refs).sort()) {
  const localPath = path.join('public', r);
  const exists = fs.existsSync(localPath);
  if (exists) {
    const size = fs.statSync(localPath).size;
    totalBytes += size;
    console.log(`${r} -> [${(size / 1024).toFixed(1)} KB]`);
  } else {
    console.log(`${r} -> [MISSING]`);
  }
}
console.log(`Total size of referenced assets: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
