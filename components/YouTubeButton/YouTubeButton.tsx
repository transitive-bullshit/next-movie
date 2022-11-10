'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Movie } from '@prisma/client'

import { YouTube } from '@/lib/hooks/youtube'

import styles from './styles.module.css'

export const YouTubeButton: React.FC<{
  movie: Movie
}> = ({ movie }) => {
  const { openYouTubeDialog } = YouTube.useContainer()

  const onClick = React.useCallback(() => {
    return openYouTubeDialog(movie)
  }, [movie, openYouTubeDialog])

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Dialog.Trigger asChild>
          <Tooltip.Trigger asChild>
            <button className={styles.youtubeButton} onClick={onClick} />
          </Tooltip.Trigger>
        </Dialog.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
            Play YouTube Trailer
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
