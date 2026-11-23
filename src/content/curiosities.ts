import type { Curiosity } from '../domain/types'

export const curiosities = [
  {
    id: 'unico-gran-felino-america',
    title: 'El único gran felino de América',
    body: 'El jaguar es el único miembro del género Panthera que vive en el continente americano. Tigres, leones y leopardos son exclusivos del Viejo Mundo.',
    sourceIds: ['wwf-jaguar'],
  },
  {
    id: 'mordida-mas-poderosa',
    title: 'La mordida más poderosa',
    body: 'Entre los grandes felinos, el jaguar tiene la mordida más potente en relación con su tamaño. Le sirve para perforar caparazones y cráneos de presas duras.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'nada-como-pocos-felinos',
    title: 'Nada como pocos felinos',
    body: 'A diferencia de muchos felinos, el jaguar nada con soltura y cruza ríos anchos sin dudar. En el Pantanal es habitual verlo cazar dentro del agua.',
    sourceIds: ['wcs-jaguar', 'panthera-jaguar'],
  },
  {
    id: 'rosetas-como-huella',
    title: 'Manchas que son una huella digital',
    body: 'Cada jaguar tiene un patrón de rosetas único. Los investigadores usan cámaras trampa para identificar individuos por sus manchas, sin necesidad de capturarlos.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'tercer-felino-mas-grande',
    title: 'El tercer felino más grande',
    body: 'Solo el tigre y el león superan al jaguar en tamaño. Es el felino más robusto de América y el más fuerte en proporción a su cuerpo.',
    sourceIds: ['wwf-jaguar'],
  },
  {
    id: 'nombre-guaraní',
    title: 'Un nombre que viene del guaraní',
    body: 'La palabra «yaguar» proviene del guaraní y se asocia con «el que mata de un salto», una descripción de su técnica de emboscada.',
    sourceIds: ['wwf-jaguar'],
  },
  {
    id: 'caza-tierra-agua-arbol',
    title: 'Caza en el suelo, en el agua y descansa en los árboles',
    body: 'Acecha en el suelo, persigue presas acuáticas y usa los árboles para descansar y vigilar. Ocupa bosques, humedales y sabanas con la misma soltura.',
    sourceIds: ['wcs-jaguar'],
  },
  {
    id: 'caparazones-y-caimanes',
    title: 'Come tortugas y caimanes',
    body: 'Su mandíbula le permite alimentarse de presas con caparazón, como tortugas, y de reptiles grandes, como caimanes y yacarés.',
    sourceIds: ['panthera-jaguar'],
  },
  {
    id: 'especie-paraguas',
    title: 'Una especie paraguas',
    body: 'Proteger al jaguar protege bosques, ríos y humedales enteros. Su presencia indica que el ecosistema conserva presas suficientes y conectividad.',
    sourceIds: ['wwf-jaguar'],
  },
  {
    id: 'jaguares-negros',
    title: 'Los jaguares negros existen',
    body: 'El melanismo produce jaguares de pelaje oscuro en los que las rosetas siguen visibles. No son una especie distinta y pueden nacer en la misma camada.',
    sourceIds: ['panthera-jaguar'],
  },
] as const satisfies readonly Curiosity[]
