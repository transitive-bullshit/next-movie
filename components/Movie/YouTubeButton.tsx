'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Movie } from '@prisma/client'

import { YouTube } from '@/lib/hooks/youtube'

import styles from './styles.module.css'

export const YouTubeButton: React.FC<{
  movie: Movie
}> = ({ movie }) => {
  const { openYouTubeDialog } = YouTube.useContainer()

  return (
    <Dialog.Trigger asChild onClick={() => openYouTubeDialog(movie)}>
      <div
        className={styles.youtubeButton}
        onClick={() => openYouTubeDialog(movie)}
      />
    </Dialog.Trigger>
  )
}
