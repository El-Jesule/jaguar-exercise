import type { Source } from '../domain/types'

export const sources = [
  {
    id: 'panthera-jaguar',
    title: 'Jaguar: species profile and conservation programs',
    publisher: 'Panthera',
    year: 2024,
    url: 'https://www.panthera.org/cat/jaguar',
    accessedOn: '2026-11-23',
  },
  {
    id: 'wcs-jaguar',
    title: 'Jaguar conservation program',
    publisher: 'Wildlife Conservation Society (WCS)',
    year: 2024,
    url: 'https://www.wcs.org/our-work/species/jaguars',
    accessedOn: '2026-11-23',
  },
  {
    id: 'wwf-jaguar',
    title: 'Jaguar: species overview',
    publisher: 'WWF',
    year: 2024,
    url: 'https://www.worldwildlife.org/species/jaguar',
    accessedOn: '2026-11-23',
  },
  {
    id: 'conanp-cenjaguar-2018',
    title: 'Censo Nacional del Jaguar 2018 (CENJAGUAR)',
    publisher: 'Comisión Nacional de Áreas Naturales Protegidas (CONANP), México',
    year: 2018,
    url: 'https://www.gob.mx/conanp',
    accessedOn: '2026-11-23',
  },
] as const satisfies readonly Source[]
