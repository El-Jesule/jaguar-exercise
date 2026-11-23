// Fetches the curated photo set from Wikimedia Commons, optimizes it to WebP, and
// writes src/content/photos.ts with credit and license metadata.
// Run: node scripts/fetch-photos.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const OUT_DIR = 'public/photos'
const OUT_FILE = 'src/content/photos.ts'
const CACHE_FILE = 'scripts/data/photos-cache.json'
const USER_AGENT = 'JaguarAtlas/1.0 (educational project; contact: repository owner)'
const TARGET_WIDTH = 1400
const WEBP_QUALITY = 82
const REQUEST_DELAY_MS = 3000
const MAX_ATTEMPTS = 6

const PICKS = [
  {
    id: 'jaguar-macho-rio-negro',
    title: 'File:Jaguar (Panthera onca palustris) male Rio Negro.JPG',
    caption: 'Macho de jaguar del Pantanal en la orilla del río Negro.',
    alt: 'Jaguar macho de pelaje amarillo con rosetas caminando junto al río Negro en el Pantanal.',
  },
  {
    id: 'jaguar-hembra-piquiri',
    title: 'File:Jaguar (Panthera onca palustris) female Piquiri River 2.JPG',
    caption: 'Hembra de jaguar en el río Piquiri, Pantanal brasileño.',
    alt: 'Hembra de jaguar de pie sobre la arena, junto al río Piquiri, con la selva al fondo.',
  },
  {
    id: 'jaguar-macho-tres-hermanos',
    title: 'File:Jaguar (Panthera onca palustris) male Three Brothers River.JPG',
    caption: 'Jaguar macho en el río Tres Hermanos, corazón del Pantanal.',
    alt: 'Jaguar macho robusto caminando por la orilla del río Tres Hermanos entre vegetación ribereña.',
  },
  {
    id: 'jaguar-nadando',
    title:
      'File:Parque Estadual Encontro das Águas Thomas-Fuhrmann (2023- 01) Jaguar - Panthera onca swimming.jpg',
    caption: 'Un jaguar cruza a nado un río del Parque Estatal Encontro das Águas.',
    alt: 'Jaguar nadando con la cabeza fuera del agua en un río de aguas oscuras del Pantanal.',
  },
  {
    id: 'jaguar-pantanal',
    title: 'File:Jaguar in the Pantanal.jpg',
    caption: 'Jaguar observando desde la vegetación del Pantanal.',
    alt: 'Jaguar agazapado entre la vegetación del Pantanal, mirando de frente a la cámara.',
  },
  {
    id: 'onca-do-pantanal',
    title: 'File:Onça do Pantanal.jpg',
    caption: 'Onça-pintada, el nombre brasileño del jaguar.',
    alt: 'Jaguar de cuerpo completo caminando sobre suelo arenoso con el pelaje manchado bien visible.',
  },

]

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchWithRetry(url, label) {
  let lastStatus = 0

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
    lastStatus = response.status

    if (response.ok) {
      return response
    }

    const retriable = response.status === 429 || response.status >= 500

    if (!retriable) {
      throw new Error(label + ' failed: HTTP ' + String(response.status))
    }

    await wait(5000 * attempt)
  }

  throw new Error(label + ' failed after retries: HTTP ' + String(lastStatus))
}

function stripHtml(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeSingle(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function readCache() {
  if (!fs.existsSync(CACHE_FILE)) {
    return {}
  }

  return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
}

function writeCache(cache) {
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2) + '\n')
}

async function fetchInfo(title) {
  const cache = readCache()

  if (cache[title]) {
    return cache[title]
  }

  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '1400',
  })

  const response = await fetchWithRetry(
    'https://commons.wikimedia.org/w/api.php?' + params.toString(),
    'Commons API for ' + title,
  )
  const json = await response.json()
  const pages = Object.values(json.query?.pages ?? {})
  const info = pages[0]?.imageinfo?.[0]

  if (!info) {
    throw new Error('No imageinfo for ' + title)
  }

  const entry = {
    thumburl: info.thumburl,
    descriptionurl: info.descriptionurl,
    thumbwidth: info.thumbwidth,
    thumbheight: info.thumbheight,
    license: info.extmetadata?.LicenseShortName?.value ?? '',
    licenseUrl: info.extmetadata?.LicenseUrl?.value ?? '',
    artist: info.extmetadata?.Artist?.value ?? 'Wikimedia Commons',
  }

  cache[title] = entry
  writeCache(cache)

  return entry
}

function readLicense(meta, title) {
  const license = meta.LicenseShortName?.value ?? ''
  const licenseUrl = meta.LicenseUrl?.value ?? ''

  if (!/^(CC0|CC BY|CC BY-SA|Public domain)/i.test(license)) {
    throw new Error('Unsupported license for ' + title + ': ' + license)
  }

  if (!licenseUrl.startsWith('https://')) {
    throw new Error('Missing https license URL for ' + title + ': ' + licenseUrl)
  }

  return { license, licenseUrl }
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const entries = []

  for (const pick of PICKS) {
    const info = await fetchInfo(pick.title)
    const { license, licenseUrl } = readLicense(
      { LicenseShortName: { value: info.license }, LicenseUrl: { value: info.licenseUrl } },
      pick.title,
    )
    const credit = stripHtml(info.artist || 'Wikimedia Commons')
    const fileName = pick.id + '.webp'
    const targetPath = path.join(OUT_DIR, fileName)
    let optimized
    let byteLength = 0

    if (fs.existsSync(targetPath)) {
      const metadata = await sharp(targetPath).metadata()
      optimized = { width: metadata.width ?? 0, height: metadata.height ?? 0 }
      byteLength = fs.statSync(targetPath).size
      console.log('reusing ' + fileName)
    } else {
      const imageResponse = await fetchWithRetry(info.thumburl, 'download ' + pick.title)
      const original = Buffer.from(await imageResponse.arrayBuffer())
      const result = await sharp(original)
        .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer({ resolveWithObject: true })

      fs.writeFileSync(targetPath, result.data)
      optimized = result.info
      byteLength = result.data.length
    }

    if (Math.max(optimized.width, optimized.height) < 1200) {
      throw new Error(
        pick.id + ' is below the 1200px minimum: ' + String(optimized.width) + 'x' + String(optimized.height),
      )
    }

    entries.push({
      id: pick.id,
      src: '/photos/' + fileName,
      width: optimized.width,
      height: optimized.height,
      alt: pick.alt,
      caption: pick.caption,
      credit,
      license,
      licenseUrl,
    })

    console.log(
      'saved ' +
        fileName +
        ' ' +
        String(optimized.width) +
        'x' +
        String(optimized.height) +
        ' ' +
        license +
        ' ' +
        (byteLength / 1024).toFixed(0) +
        'KB',
    )

    await wait(REQUEST_DELAY_MS)
  }

  const body = entries
    .map(
      (entry) => `  {
    id: '${escapeSingle(entry.id)}',
    src: '${escapeSingle(entry.src)}',
    width: ${String(entry.width)},
    height: ${String(entry.height)},
    alt: '${escapeSingle(entry.alt)}',
    caption: '${escapeSingle(entry.caption)}',
    credit: '${escapeSingle(entry.credit)}',
    license: '${escapeSingle(entry.license)}',
    licenseUrl: '${escapeSingle(entry.licenseUrl)}',
  },`,
    )
    .join('\n')

  const output = `// Generated by scripts/fetch-photos.mjs from Wikimedia Commons.
// Do not edit by hand: run \`node scripts/fetch-photos.mjs\` to regenerate.
import type { Photograph } from '../domain/types'

export const photos = [
${body}
] as const satisfies readonly Photograph[]
`

  fs.writeFileSync(OUT_FILE, output)
  console.log('Wrote ' + OUT_FILE + ' with ' + String(entries.length) + ' photos')
}

await main()
