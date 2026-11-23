import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import { atlasContent } from '../../content'
import { expectNoA11yViolations } from '../../test/axe'
import { PhotoGallery } from './PhotoGallery'

describe('gallery accessibility', () => {
  it('has no detectable violations', async () => {
    const { container } = render(<PhotoGallery photos={atlasContent.photos} />)

    await expectNoA11yViolations(container)
  })
})
