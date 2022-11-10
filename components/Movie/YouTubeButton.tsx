'use client'

import * as Dialog from '@radix-ui/react-dialog'

import styles from './styles.module.css'

export const YouTubeButton: React.FC<{
  videoId: string
}> = ({ videoId }) => {
  return (
    <Dialog.Trigger asChild>
      <div className={styles.youtubeButton} />
    </Dialog.Trigger>
  )
}
