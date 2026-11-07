import fs from 'fs';
import path from 'path';

function getAllFiles(dir, extFilter = ['.js', '.jsx', '.css', '.html']) {
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

const srcFiles = getAllFiles('src');
let totalReplacements = 0;

for (const file of srcFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Match /assets/...png even with spaces and unicode
  const regex = /(\/assets\/[^"'`)]+?\.png)/g;
  content = content.replace(regex, (match) => {
    // Check if webp version exists in public
    const publicWebpPath = path.join('public', match.replace(/\.png$/, '.webp'));
    if (fs.existsSync(publicWebpPath)) {
      modified = true;
      totalReplacements++;
      return match.replace(/\.png$/, '.webp');
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated references in: ${path.relative('.', file)}`);
  }
}

console.log(`\nDone! Total references switched to .webp: ${totalReplacements}`);
