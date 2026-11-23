import type { HabitatType } from '../domain/types'

export const habitats = [
  {
    id: 'rainforest',
    name: 'Selva tropical húmeda',
    description:
      'Bosque cerrado, cálido y húmedo con dosel alto, ríos y riachuelos. Es el hábitat principal del jaguar en la Amazonía, la Selva Maya y el Chocó.',
    sourceIds: ['panthera-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'dry-forest',
    name: 'Bosque seco tropical',
    description:
      'Bosque estacional con una marcada temporada seca. El jaguar lo usa en el Chaco, el Cerrado y los bosques secos de México y Centroamérica.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'wetlands',
    name: 'Humedales y riveras',
    description:
      'Pantanos, ciénagas, manglares y orillas de ríos. El Pantanal y los grandes ríos amazónicos concentran densidades altas de jaguares.',
    sourceIds: ['wcs-jaguar', 'panthera-jaguar'],
  },
  {
    id: 'grasslands',
    name: 'Sabanas y pastizales inundables',
    description:
      'Llanuras abiertas con pastos y palmares que se inundan en la temporada de lluvias, como los Llanos y partes del Pantanal.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'montane',
    name: 'Bosques de montaña',
    description:
      'Laderas andinas y yungas nubladas, entre bosque húmedo y pendientes pronunciadas; presencia más dispersa que en las tierras bajas.',
    sourceIds: ['wcs-jaguar'],
  },
  {
    id: 'scrubland',
    name: 'Matorrales y zonas áridas',
    description:
      'Matorral espinoso y áreas semiáridas del norte de México, donde el jaguar ocupa cañadas y sierras con cobertura.',
    sourceIds: ['conanp-cenjaguar-2018'],
  },
] as const satisfies readonly HabitatType[]
