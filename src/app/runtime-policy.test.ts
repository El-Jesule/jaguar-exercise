import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const SOURCE_ROOT = 'src'
const FORBIDDEN_PATTERNS: readonly { readonly label: string; readonly pattern: RegExp }[] = [
  { label: 'localStorage', pattern: /\blocalStorage\b/ },
  { label: 'sessionStorage', pattern: /\bsessionStorage\b/ },
  { label: 'document.cookie', pattern: /document\.cookie/ },
  { label: 'fetch()', pattern: /\bfetch\s*\(/ },
  { label: 'XMLHttpRequest', pattern: /\bXMLHttpRequest\b/ },
  { label: 'sendBeacon', pattern: /\bsendBeacon\b/ },
]

function collectFiles(directory: string): readonly string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath))
      continue
    }

    if (!/\.(ts|tsx)$/.test(entry.name) || /\.test\.(ts|tsx)$/.test(entry.name)) {
      continue
    }

    if (fullPath.split(path.sep).includes('test')) {
      continue
    }

    files.push(fullPath)
  }

  return files
}

describe('runtime storage and network policy', () => {
  it('never persists data or calls the network from application code', () => {
    const offenders: string[] = []

    for (const file of collectFiles(SOURCE_ROOT)) {
      const text = fs.readFileSync(file, 'utf8')

      for (const { label, pattern } of FORBIDDEN_PATTERNS) {
        if (pattern.test(text)) {
          offenders.push(file + ' -> ' + label)
        }
      }
    }

    expect(offenders).toEqual([])
  })
})
