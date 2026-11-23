import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Figure } from './Figure'
import type { Photograph } from '../domain/types'

const photo: Photograph = {
  id: 'jaguar-rio',
  src: '/photos/jaguar-rio.webp',
  width: 1600,
  height: 1067,
  alt: 'Jaguar manchado caminando junto a un río de la selva amazónica.',
  caption: 'Jaguar junto al río',
  credit: 'Ana Pérez',
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
}

describe('Figure', () => {
  it('reserves intrinsic dimensions to avoid layout shift', () => {
    render(<Figure photo={photo} />)

    const image = screen.getByRole('img', { name: photo.alt })

    expect(image).toHaveAttribute('width', '1600')
    expect(image).toHaveAttribute('height', '1067')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('renders the caption, credit, and license link', () => {
    render(<Figure photo={photo} />)

    expect(screen.getByText('Jaguar junto al río')).toBeInTheDocument()
    expect(screen.getByText(/Ana Pérez/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'CC BY-SA 4.0' })).toHaveAttribute(
      'href',
      photo.licenseUrl,
    )
  })

  it('uses eager loading when requested', () => {
    render(<Figure photo={photo} eager />)

    expect(screen.getByRole('img', { name: photo.alt })).toHaveAttribute('loading', 'eager')
  })

  it('keeps the caption, credit, and description when the image fails to load', () => {
    render(<Figure photo={photo} />)

    fireEvent.error(screen.getByRole('img', { name: photo.alt }))

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('Imagen no disponible')).toBeInTheDocument()
    expect(screen.getByText(photo.alt)).toBeInTheDocument()
    expect(screen.getByText('Jaguar junto al río')).toBeInTheDocument()
    expect(screen.getByText(/Ana Pérez/)).toBeInTheDocument()
  })
})
