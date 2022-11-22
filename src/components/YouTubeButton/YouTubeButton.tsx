'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'

import { Tooltip } from '@/components/Tooltip/Tooltip'
import { MovieModel } from '@/lib/types'
import { YouTube } from '@/lib/hooks/youtube'

import styles from './styles.module.css'

export function isMouseEventNewTab(event: any) {
  if (
    event.ctrlKey ||
    event.shiftKey ||
    event.metaKey || // apple
    (event.button && event.button == 1) // middle click, >IE9 + everyone else
  ) {
    return true
  } else {
    return false
  }
}

export const YouTubeButton: React.FC<{
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
      aria-label='YouTube Trailer'
    >
      <Dialog.Trigger asChild>
        <Tooltip content='Play YouTube Trailer'>
          <span
            className={styles.youtubeButton}
            aria-label='Play YouTube Trailer'
            role='button'
          />
        </Tooltip>
      </Dialog.Trigger>
    </Link>
  )
}
