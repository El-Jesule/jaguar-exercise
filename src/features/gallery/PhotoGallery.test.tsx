import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { atlasContent } from '../../content'
import { PhotoGallery } from './PhotoGallery'

describe('PhotoGallery', () => {
  it('shows at least six photographs', () => {
    render(<PhotoGallery photos={atlasContent.photos} />)

    expect(screen.getAllByRole('img').length).toBeGreaterThanOrEqual(6)
  })

  it('describes every photograph and credits its author and license', () => {
    render(<PhotoGallery photos={atlasContent.photos} />)

    for (const photo of atlasContent.photos) {
      const image = screen.getByRole('img', { name: photo.alt })

      expect(image).toBeInTheDocument()
      expect(screen.getAllByText(photo.credit, { exact: false }).length).toBeGreaterThan(0)
    }

    const licenseLinks = screen.getAllByRole('link', { name: /CC BY-SA/ })

    expect(licenseLinks.length).toBe(atlasContent.photos.length)

    for (const link of licenseLinks) {
      expect(link.getAttribute('href')).toMatch(/^https:\/\//)
    }
  })

  it('keeps every image at or above the 1200 pixel minimum', () => {
    for (const photo of atlasContent.photos) {
      expect(Math.max(photo.width, photo.height)).toBeGreaterThanOrEqual(1200)
    }
  })

  it('renders each photo inside a figure with a caption', () => {
    render(<PhotoGallery photos={atlasContent.photos} />)

    expect(screen.getAllByRole('figure')).toHaveLength(atlasContent.photos.length)

    const first = screen.getAllByRole('figure')[0]

    expect(within(first).getByText(atlasContent.photos[0].caption)).toBeVisible()
  })
})
