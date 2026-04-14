// Convert all .png files in public/assets/ to .webp (REPLACE, not alongside)
import { execSync } from 'child_process';
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs';
import { join, extname, dirname, basename } from 'path';

const CWEBP = join(process.cwd(), 'node_modules', '.bin', 'cwebp');
const ASSET_DIR = join(process.cwd(), 'public', 'assets');
const QUALITY = 80;
let count = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) { walk(full); continue; }
    if (extname(full).toLowerCase() !== '.png') continue;

    const out = full.replace(/\.png$/i, '.webp');
    if (existsSync(out)) {
      console.log(`  ⏭️  Skip: ${basename(out)}`);
      continue;
    }
    try {
      execSync(`"${CWEBP}" -q ${QUALITY} "${full}" -o "${out}" -quiet`, { stdio: 'pipe' });
      const origSize = (statSync(full).size / 1024).toFixed(0);
      const newSize = (statSync(out).size / 1024).toFixed(0);
      console.log(`  ✅ ${basename(full)} (${origSize}KB) → ${basename(out)} (${newSize}KB)`);
      unlinkSync(full); // Remove original PNG
      count++;
    } catch (e) {
      console.error(`  ❌ Failed: ${basename(full)}`);
    }
  }
}

console.log('🔄 Converting PNG → WebP...\n');
walk(ASSET_DIR);
console.log(`\n✅ Done! Converted ${count} files.`);
