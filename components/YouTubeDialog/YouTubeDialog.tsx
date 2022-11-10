'use client'

import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import YouTubeEmbed from 'react-youtube'
import { useWindowSize } from 'react-use'

import { YouTube } from '@/lib/hooks/youtube'

import styles from './styles.module.css'

export function YouTubeDialog({ children }: { children: React.ReactNode }) {
  return (
    <YouTube.Provider>
      <YouTubeDialogInner>{children}</YouTubeDialogInner>
    </YouTube.Provider>
  )
}

function YouTubeDialogInner({ children }: { children: React.ReactNode }) {
  const { isYouTubeDialogOpen, movie, closeYouTubeDialog } =
    YouTube.useContainer()

  const onOpenChange = React.useCallback(
    (value: any) => {
      if (!value) {
        closeYouTubeDialog()
      }
    },
    [closeYouTubeDialog]
  )

  return (
    <Dialog.Root
      open={isYouTubeDialogOpen && !!movie}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />

        <Dialog.Content
          className={styles.content}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
          }}
        >
          {movie && (
            <>
              {/* <Dialog.Title className={styles.title}>
                {movie.title}
              </Dialog.Title> */}

              <YouTubeDialogContent />
              {/* <Dialog.Close asChild></Dialog.Close> */}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>

      {children}
    </Dialog.Root>
  )
}

function YouTubeDialogContent() {
  const { movie: maybeMovie } = YouTube.useContainer()
  const { width, height } = useWindowSize()
  const movie = maybeMovie!

  const youtubeOpts = React.useMemo(() => {
    const padding = width > 640 ? 48 : 0

    const aspectRatio = 1280 / 720
    const maxW = Math.min(1280, width - padding)
    const maxH = Math.min(720, height - padding)
    // const minW = Math.min(640, width)
    // const minH = Math.min(360, height)

    const h0 = (maxW / aspectRatio) | 0 // max height determined by max width
    const w0 = (maxH * aspectRatio) | 0 // max width determined by max height

    let w: number
    let h: number

    if (h0 <= maxH) {
      w = maxW
      h = h0
    } else if (w0 <= maxW) {
      w = w0
      h = maxH
    } else {
      w = Math.min(w0, maxW)
      h = Math.min(h0, maxH)
    }

    return {
      width: `${w}`,
      height: `${h}`,
      playerVars: {
        autoplay: 1
      }
    }
  }, [width, height])

  // console.log(
  //   'youtube',
  //   movie.trailerYouTubeId,
  //   youtubeOpts.width,
  //   youtubeOpts.height
  // )

  // TODO: There is currently a flash of the youtube iframe player presumably
  // being mounted or re-rendered twice before playing which is a bit jarring,
  // though I haven't been able to figure out the root cause. It is likely
  // within the `react-youtube` package that we're using.
  return (
    <YouTubeEmbed
      className={styles.embed}
      videoId={movie.trailerYouTubeId!}
      opts={youtubeOpts}
    />
  )
}
