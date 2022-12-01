import * as React from 'react'
import cs from 'clsx'
import { motion } from 'framer-motion'
import Image from 'next/image'

import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { YouTubeButtonOverlay } from '@/components/YouTubeButton/YouTubeButtonOverlay'
import type { MovieModel, MutateUserMovieFn } from '@/types'

import styles from './styles.module.css'

export const GridMovie: React.FC<{
  movie: MovieModel
  mutateUserMovie?: MutateUserMovieFn
}> = React.forwardRef(function GridMovie({ movie }, ref) {
  return (
    <motion.div
      className={styles.gridMovie}
      initial={{ scale: 0, translateY: -200 }}
      animate={{ scale: 1, translateY: 0 }}
      exit={{ scale: 0, translateY: 200 }}
      ref={ref as any}
    >
      <div className={styles.frame}>
        {movie.posterUrl ? (
          <Image
            className={styles.poster}
            src={movie.posterUrl}
            alt={movie.title}
            width={movie.posterWidth!}
            height={movie.posterHeight!}
            sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
            placeholder={movie.posterPlaceholderUrl ? 'blur' : 'empty'}
            blurDataURL={movie.posterPlaceholderUrl || undefined}
          />
        ) : (
          <div className={cs(styles.poster, styles.emptyPoster)} />
        )}

        {movie.trailerYouTubeId && <YouTubeButtonOverlay movie={movie} />}
      </div>

      <ActiveLink href={movie.pathname} prefetch={false}>
        <h6 className={styles.title}>
          {movie.title}

          {movie.releaseYear && (
            <span className={styles.releaseYear}> ({movie.releaseYear})</span>
          )}
        </h6>
      </ActiveLink>
    </motion.div>
  )
})
