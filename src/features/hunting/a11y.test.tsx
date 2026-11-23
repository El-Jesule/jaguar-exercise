import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import { atlasContent } from '../../content'
import { expectNoA11yViolations } from '../../test/axe'
import { HuntingSection } from './HuntingSection'

describe('hunting accessibility', () => {
  it('has no detectable violations', async () => {
    const { container } = render(
      <HuntingSection
        hunting={atlasContent.hunting}
        prey={atlasContent.prey}
        sources={atlasContent.sources}
      />,
    )

    await expectNoA11yViolations(container)
  })
})
