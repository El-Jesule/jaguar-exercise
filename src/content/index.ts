import type { AtlasContent } from '../domain/invariants'
import { countries } from './countries'
import { curiosities } from './curiosities'
import { habitats } from './habitats'
import { hunting } from './hunting'
import { photos } from './photos'
import { prey } from './prey'
import { sources } from './sources'

export const atlasContent: AtlasContent = {
  countries,
  habitats,
  sources,
  curiosities,
  prey,
  photos,
  hunting,
}
