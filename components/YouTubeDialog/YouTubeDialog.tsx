'use client'

import * as Dialog from '@radix-ui/react-dialog'

import styles from './styles.module.css'

export function YouTubeDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />

        <Dialog.Content className={styles.content}>
          <Dialog.Title className={styles.title}>Edit profile</Dialog.Title>

          <Dialog.Description className={styles.desc}>
            Make changes to your profile here. Testy test test...
          </Dialog.Description>

          {/* <Dialog.Close asChild>
          </Dialog.Close> */}
        </Dialog.Content>
      </Dialog.Portal>

      {children}
    </Dialog.Root>
  )
}
