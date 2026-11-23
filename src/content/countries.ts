import type { RangeCountry } from '../domain/types'

export const countries = [
  {
    id: 'mx',
    name: 'México',
    subregion: 'north-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'number',
      value: 4800,
      referenceYear: 2018,
      sourceIds: ['conanp-cenjaguar-2018'],
      scopeNote:
        'Censo nacional coordinado por la CONANP con universidades y organizaciones aliadas; cubre las regiones con presencia confirmada.',
    },
    trend: 'stable',
    habitatIds: ['rainforest', 'dry-forest', 'wetlands', 'scrubland'],
    conservationNote:
      'México es el límite norte del jaguar. La especie habita la Selva Maya, la Lacandona, la sierra de Tamaulipas y zonas del Pacífico, y cuenta con un programa nacional de conservación y áreas protegidas dedicadas.',
    sourceIds: ['conanp-cenjaguar-2018', 'wwf-jaguar'],
  },
  {
    id: 'gt',
    name: 'Guatemala',
    subregion: 'central-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'No hay un censo nacional único publicado; la población se monitorea en la Reserva de la Biosfera Maya y áreas vecinas.',
      sourceIds: ['wwf-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'wetlands'],
    conservationNote:
      'La Selva Maya guatemalteca forma un corredor con México y Belice. La pérdida de cobertura y los conflictos por ganado son sus principales amenazas.',
    sourceIds: ['wwf-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'bz',
    name: 'Belice',
    subregion: 'central-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Los datos provienen de estudios de densidad en áreas protegidas y del monitoreo con cámaras trampa, no de un censo nacional.',
      sourceIds: ['panthera-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'wetlands'],
    conservationNote:
      'Belice conserva una proporción alta de bosque y tiene una de las densidades de jaguar mejor documentadas de Centroamérica. El corredor del Cockscomb es clave.',
    sourceIds: ['panthera-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'hn',
    name: 'Honduras',
    subregion: 'central-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; la información disponible proviene de la Mosquitia y de áreas protegidas del Caribe.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'dry-forest'],
    conservationNote:
      'La Mosquitia hondureña conserva bosque continuo y conecta con Nicaragua. La ganadería extensiva y la tala presionan los corredores del centro del país.',
    sourceIds: ['wcs-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'ni',
    name: 'Nicaragua',
    subregion: 'central-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'No existe un censo nacional publicado; las estimaciones se limitan a reservas como Bosawás e Indio Maíz.',
      sourceIds: ['wwf-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest'],
    conservationNote:
      'Las reservas de Bosawás e Indio Maíz albergan bosque húmedo extenso y son parte del corredor mesoamericano, aunque enfrentan presión por colonización y tala.',
    sourceIds: ['wwf-jaguar', 'panthera-jaguar'],
  },
  {
    id: 'cr',
    name: 'Costa Rica',
    subregion: 'central-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; el país monitorea poblaciones en parques nacionales y corredores biológicos.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'wetlands', 'montane'],
    conservationNote:
      'Costa Rica mantiene poblaciones en Corcovado, Tortuguero y la cordillera de Talamanca. Su red de parques y corredores biológicos es un referente regional.',
    sourceIds: ['wcs-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'pa',
    name: 'Panamá',
    subregion: 'central-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'No hay censo nacional; el Darién concentra los registros y conecta la distribución con Colombia.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'montane'],
    conservationNote:
      'El Darién es la puerta de entrada del jaguar a Sudamérica y uno de los bloques de bosque más intactos del istmo. La conectividad con Colombia es decisiva.',
    sourceIds: ['wcs-jaguar', 'panthera-jaguar'],
  },
  {
    id: 'co',
    name: 'Colombia',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional unificado; la especie se monitorea por regiones en la Amazonía, la Orinoquía, el Caribe y el Pacífico.',
      sourceIds: ['wwf-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'wetlands', 'grasslands', 'montane'],
    conservationNote:
      'Colombia conserva poblaciones en la Amazonía, la Orinoquía, el Chocó y el Caribe. La deforestación y los conflictos de uso del suelo son sus mayores riesgos.',
    sourceIds: ['wwf-jaguar', 'panthera-jaguar'],
  },
  {
    id: 've',
    name: 'Venezuela',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; los Llanos y la Amazonía venezolana concentran las poblaciones conocidas.',
      sourceIds: ['panthera-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['grasslands', 'rainforest', 'wetlands'],
    conservationNote:
      'Los Llanos inundables sostienen una de las poblaciones más estudiadas del continente, con investigación de largo plazo sobre ecología y ganadería.',
    sourceIds: ['panthera-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'gy',
    name: 'Guyana',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional; los bosques del interior y la sabana de Rupununi son las áreas con más registros.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'grasslands'],
    conservationNote:
      'Guyana conserva bosque húmedo continuo y la sabana de Rupununi. El país mantiene una de las coberturas forestales más altas del planeta.',
    sourceIds: ['wcs-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'sr',
    name: 'Surinam',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; la Reserva Natural de Surinam Central es el área mejor documentada.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest'],
    conservationNote:
      'La Reserva Natural de Surinam Central protege bosque tropical primario con poblaciones estables de presas y depredadores, incluido el jaguar.',
    sourceIds: ['wcs-jaguar'],
  },
  {
    id: 'gf',
    name: 'Guayana Francesa',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo propio publicado; el Parque Amazónico de Guayana cubre la mayor parte del territorio y se monitorea con cámaras trampa.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest'],
    conservationNote:
      'El Parque Amazónico de Guayana protege un bloque continuo de selva y mantiene una de las densidades de jaguar más altas conocidas en el escudo guayanés.',
    sourceIds: ['wcs-jaguar', 'panthera-jaguar'],
  },
  {
    id: 'ec',
    name: 'Ecuador',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional; la Amazonía y las estribaciones andinas concentran los registros, con datos de áreas protegidas.',
      sourceIds: ['wwf-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'montane'],
    conservationNote:
      'Ecuador conserva poblaciones en la Amazonía, como Yasuní y Cuyabeno, y en las estribaciones orientales de los Andes. La fragmentación es la amenaza principal.',
    sourceIds: ['wwf-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'pe',
    name: 'Perú',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional único; los datos provienen de monitoreos en Madre de Dios, Manú y otras áreas amazónicas.',
      sourceIds: ['wcs-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'montane'],
    conservationNote:
      'Perú alberga una porción grande de la Amazonía occidental, con poblaciones en Madre de Dios, Manú y Tambopata. La minería informal y las carreteras amenazan la conectividad.',
    sourceIds: ['wcs-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'bo',
    name: 'Bolivia',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; el Pantanal boliviano, el Chaco y la Amazonía concentran los registros.',
      sourceIds: ['panthera-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'dry-forest', 'wetlands'],
    conservationNote:
      'Bolivia conecta el Pantanal con la Amazonía y el Chaco. Los incendios y la expansión agrícola reducen la cobertura que sostiene a la especie.',
    sourceIds: ['panthera-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'br',
    name: 'Brasil',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Brasil concentra la mayor población mundial, pero no existe un censo nacional único; las cifras se organizan por bioma (Amazonía, Pantanal, Cerrado y Mata Atlántica).',
      sourceIds: ['panthera-jaguar', 'wwf-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'wetlands', 'grasslands', 'dry-forest'],
    conservationNote:
      'Brasil reúne la mayor superficie de hábitat del jaguar. El Pantanal mantiene una de las densidades más altas del mundo y la Amazonía sostiene la población más numerosa.',
    sourceIds: ['panthera-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'py',
    name: 'Paraguay',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; el Pantanal paraguayo y el Chaco seco concentran las poblaciones conocidas.',
      sourceIds: ['panthera-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['dry-forest', 'wetlands'],
    conservationNote:
      'Paraguay conserva jaguares en el Pantanal y el Chaco. La deforestación del Chaco para ganadería es la amenaza más severa para la especie en el país.',
    sourceIds: ['panthera-jaguar', 'wwf-jaguar'],
  },
  {
    id: 'ar',
    name: 'Argentina',
    subregion: 'south-america',
    rangeStatus: 'resident',
    estimate: {
      kind: 'none',
      note: 'Sin censo nacional publicado; la población se concentra en Misiones y en las yungas del noroeste, con seguimiento por áreas protegidas.',
      sourceIds: ['wwf-jaguar'],
    },
    trend: 'decreasing',
    habitatIds: ['rainforest', 'grasslands'],
    conservationNote:
      'Argentina está en el límite sur del jaguar. La población de Misiones es la más importante del país y depende de la continuidad del Bosque Atlántico con Brasil.',
    sourceIds: ['wwf-jaguar', 'wcs-jaguar'],
  },
  {
    id: 'us',
    name: 'Estados Unidos',
    subregion: 'north-america',
    rangeStatus: 'historical',
    estimate: {
      kind: 'none',
      note: 'No hay población residente confirmada: solo avistamientos aislados de individuos dispersantes en Arizona y Nuevo México.',
      sourceIds: ['wwf-jaguar'],
    },
    trend: 'unknown',
    habitatIds: ['scrubland', 'montane'],
    conservationNote:
      'Presencia histórica y esporádica en el suroeste. Los jaguares que cruzan desde México no forman poblaciones reproductivas establecidas en el país.',
    sourceIds: ['wwf-jaguar'],
  },
] as const satisfies readonly RangeCountry[]
