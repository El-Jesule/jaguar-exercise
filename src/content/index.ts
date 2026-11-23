import type { AtlasContent } from '../domain/invariants'
import { countries } from './countries'
import { habitats } from './habitats'
import { sources } from './sources'

export const atlasContent: AtlasContent = {
  countries,
  habitats,
  sources,
  curiosities: [],
  prey: [],
  photos: [],
}
