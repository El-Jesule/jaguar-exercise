import type { HuntingContent } from '../domain/types'

export const hunting = {
  intro:
    'El jaguar es un depredador de emboscada. Rastrea en silencio, se acerca con paciencia usando la cobertura y ataca a muy corta distancia con un salto potente. No persigue a sus presas en carreras largas: confía en la sorpresa y en una mordida decisiva.',
  sourceIds: ['panthera-jaguar', 'wcs-jaguar'],
  behaviors: [
    {
      id: 'emboscada',
      title: 'Emboscada y acecho',
      body: 'Sigue rastros, sonidos y olores, se aproxima agazapado y elige el momento en que la presa baja la guardia. Suele atacar cerca del agua, donde las presas se concentran.',
      sourceIds: ['panthera-jaguar'],
    },
    {
      id: 'mordida-craneo',
      title: 'La mordida en el cráneo',
      body: 'Dirige la mordida a la cabeza o al cuello con una fuerza que le permite atravesar caparazones y huesos. Es su principal ventaja frente a otros felinos americanos.',
      sourceIds: ['panthera-jaguar'],
    },
    {
      id: 'caza-acuatica',
      title: 'Caza en el agua',
      body: 'Nada con soltura y captura caimanes, yacarés, tortugas y peces en ríos y lagunas. Pocos felinos explotan el medio acuático de esta forma.',
      sourceIds: ['wcs-jaguar'],
    },
    {
      id: 'horarios',
      title: 'Crepúsculo y noche',
      body: 'Es más activo al amanecer, al atardecer y durante la noche, cuando las presas se desplazan. Durante el día descansa en zonas con buena cobertura.',
      sourceIds: ['wwf-jaguar'],
    },
    {
      id: 'territorio-paciencia',
      title: 'Territorios amplios y paciencia',
      body: 'Recorre territorios extensos y puede pasar varios días junto a una presa grande. Las hembras crían solas y enseñan a cazar a los cachorros durante más de un año.',
      sourceIds: ['wcs-jaguar', 'wwf-jaguar'],
    },
  ],
} as const satisfies HuntingContent
