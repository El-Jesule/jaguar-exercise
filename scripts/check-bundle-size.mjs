import fs from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const BUDGET_KB = 200
const ASSETS_DIR = 'dist/assets'

if (!fs.existsSync(ASSETS_DIR)) {
  console.error('No dist/assets directory. Run `vite build` first.')
  process.exit(1)
}

const scripts = fs.readdirSync(ASSETS_DIR).filter((file) => file.endsWith('.js'))

if (scripts.length === 0) {
  console.error('No JavaScript bundles found in dist/assets.')
  process.exit(1)
}

const totalBytes = scripts.reduce(
  (sum, file) => sum + gzipSync(fs.readFileSync(path.join(ASSETS_DIR, file))).length,
  0,
)
const totalKb = totalBytes / 1024

console.log(
  'Initial JS: ' + totalKb.toFixed(2) + ' KB gzip across ' + String(scripts.length) + ' file(s)',
)
console.log('Budget: ' + String(BUDGET_KB) + ' KB gzip')

if (totalKb > BUDGET_KB) {
  console.error('Bundle size budget exceeded by ' + (totalKb - BUDGET_KB).toFixed(2) + ' KB.')
  process.exit(1)
}
