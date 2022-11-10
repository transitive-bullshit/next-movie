'use client'

import * as React from 'react'
import { Movie } from '@prisma/client'
import { createContainer } from 'unstated-next'

function useYouTube() {
  const [movie, setMovie] = React.useState<Movie | null>(null)
  const [isYouTubeDialogOpen, setIsYouTubeDialogOpen] =
    React.useState<boolean>(false)

  const openYouTubeDialog = React.useCallback((movie: Movie) => {
    setMovie(movie)
    setIsYouTubeDialogOpen(true)
  }, [])

  const closeYouTubeDialog = React.useCallback(() => {
    setIsYouTubeDialogOpen(false)
    setMovie(null)
  }, [])

  return {
    movie,
    isYouTubeDialogOpen,

    openYouTubeDialog,
    closeYouTubeDialog
  }
}

export const YouTube = createContainer(useYouTube)
