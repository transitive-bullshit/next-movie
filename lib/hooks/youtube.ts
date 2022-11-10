'use client'

import * as React from 'react'
import { Movie } from '@prisma/client'
import { createContainer } from 'unstated-next'

function useYouTube() {
  const [movie, setMovie] = React.useState<Movie | null>(null)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const openYouTubeDialog = React.useCallback((movie: Movie) => {
    setMovie(movie)
    setIsOpen(true)
  }, [])

  const closeYouTubeDialog = React.useCallback(() => {
    setIsOpen(false)
    setMovie(null)
  }, [])

  return {
    movie,
    isOpen,

    openYouTubeDialog,
    closeYouTubeDialog
  }
}

export const YouTube = createContainer(useYouTube)
