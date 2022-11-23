'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'

import { MovieModel } from '@/types'
import { YouTube } from '@/lib/hooks/youtube'

import { isMouseEventNewTab } from './YouTubeButton'
import styles from './styles.module.css'

export const YouTubeButtonOverlay: React.FC<{
  movie: MovieModel
}> = ({ movie }) => {
  const { openYouTubeDialog } = YouTube.useContainer()

  const onClick = React.useCallback(
    (event: any) => {
      if (isMouseEventNewTab(event)) {
        // open link in new tab
      } else {
        event.preventDefault()
        openYouTubeDialog(movie)
      }
    },
    [movie, openYouTubeDialog]
  )

  return (
    <Link
      href={movie.trailerUrl!}
      onClick={onClick}
      target='_blank'
      rel='noopener noreferrer'
      className={styles.overlay}
      aria-label='YouTube Trailer'
    >
      <Dialog.Trigger asChild>
        <span
          className={styles.youtubeButton}
          aria-label='Play YouTube Trailer'
        />
      </Dialog.Trigger>
    </Link>
  )
}
