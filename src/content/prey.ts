import type { PreyItem } from '../domain/types'

export const prey = [
  {
    id: 'capybara',
    name: 'Capibara',
    category: 'mammal',
    description:
      'El roedor más grande del mundo y una de las presas favoritas del jaguar en el Pantanal y los Llanos, sobre todo cerca de ríos y lagunas.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'caiman',
    name: 'Caimán y yacaré',
    category: 'reptile',
    description:
      'Reptiles acuáticos que el jaguar captura en el agua o en la orilla. Su mordida potente le permite atravesar la piel dura del cuello y el cráneo.',
    sourceIds: ['panthera-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'peccaries',
    name: 'Pecaríes',
    category: 'mammal',
    description:
      'Cerdos salvajes que viven en grupos y son presa habitual en la Amazonía y la Selva Maya. El jaguar suele separar a un individuo del grupo antes de atacar.',
    sourceIds: ['wwf-jaguar'],
  },
  {
    id: 'tapir',
    name: 'Tapir',
    category: 'mammal',
    description:
      'Mamífero grande y de hábitos acuáticos presente en la Amazonía. Es una presa valiosa que puede alimentar al jaguar durante varios días.',
    sourceIds: ['wwf-jaguar'],
  },
  {
    id: 'deer',
    name: 'Venados',
    category: 'mammal',
    description:
      'En bosques secos, sabanas y matorrales, los venados son presas frecuentes, especialmente en el Pantanal, el Cerrado y el norte de México.',
    sourceIds: ['wcs-jaguar'],
  },
  {
    id: 'armadillo',
    name: 'Armadillos',
    category: 'mammal',
    description:
      'Su caparazón no detiene la mordida del jaguar. Es una presa común y relativamente fácil de encontrar en bosques y sabanas.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'turtles',
    name: 'Tortugas y galápagos',
    category: 'reptile',
    description:
      'El jaguar muerde a través del caparazón y consume tortugas de río y de tierra, algo que casi ningún otro felino consigue con facilidad.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'fish',
    name: 'Peces',
    category: 'fish',
    description:
      'En ríos y lagunas el jaguar captura peces con zarpazos rápidos desde la orilla o dentro del agua, un comportamiento poco habitual entre felinos.',
    sourceIds: ['wcs-jaguar'],
  },
  {
    id: 'livestock',
    name: 'Ganado',
    category: 'livestock',
    description:
      'Cuando el hábitat natural se reduce, el jaguar puede atacar ganado. Este conflicto con la ganadería es una de las principales causas de persecución.',
    sourceIds: ['wwf-jaguar'],
  },
] as const satisfies readonly PreyItem[]
