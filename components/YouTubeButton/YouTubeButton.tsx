'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'

import { MovieModel } from '@/lib/types'
import { YouTube } from '@/lib/hooks/youtube'

import styles from './styles.module.css'

function isMouseEventNewTab(event: MouseEvent) {
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
    (event: MouseEvent) => {
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
    <Tooltip.Provider>
      <Tooltip.Root>
        <Link
          href={movie.trailerUrl!}
          onClick={onClick}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='YouTube Trailer'
        >
          <Dialog.Trigger asChild>
            <Tooltip.Trigger asChild>
              <button
                className={styles.youtubeButton}
                aria-label='Play YouTube Trailer'
              />
            </Tooltip.Trigger>
          </Dialog.Trigger>
        </Link>

        <Tooltip.Portal className={styles.tooltipPortal}>
          <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
            Play YouTube Trailer
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
