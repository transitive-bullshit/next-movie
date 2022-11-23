'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'

import { MovieModel } from '@/types'

function useYouTube() {
  const [movie, setMovie] = React.useState<MovieModel | null>(null)
  const [isYouTubeDialogOpen, setIsYouTubeDialogOpen] =
    React.useState<boolean>(false)

  const openYouTubeDialog = React.useCallback((movie: MovieModel) => {
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
