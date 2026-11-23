import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { PreyList } from './PreyList'

describe('PreyList', () => {
  it('renders every prey item with its category label', () => {
    render(<PreyList prey={atlasContent.prey} sources={atlasContent.sources} />)

    expect(screen.getAllByRole('listitem')).toHaveLength(atlasContent.prey.length)
    expect(screen.getByText('Capibara')).toBeVisible()
    expect(screen.getByText('Caimán y yacaré')).toBeVisible()
    expect(screen.getAllByText('Mamífero').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Reptil').length).toBeGreaterThan(0)
  })

  it('includes at least five prey items, each with a source link', () => {
    render(<PreyList prey={atlasContent.prey} sources={atlasContent.sources} />)

    expect(atlasContent.prey.length).toBeGreaterThanOrEqual(5)

    for (const item of atlasContent.prey) {
      const name = screen.getAllByText(item.name)[0]
      const entry = name.closest('li')

      expect(entry).not.toBeNull()
      expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
    }
  })

  it('describes why livestock becomes prey when habitat shrinks', () => {
    render(<PreyList prey={atlasContent.prey} sources={atlasContent.sources} />)

    expect(screen.getByText(/conflicto con la ganadería/)).toBeVisible()
  })
})
