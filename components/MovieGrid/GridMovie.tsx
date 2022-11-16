import * as React from 'react'
import Image from 'next/image'
import cs from 'clsx'

import type { MovieModel } from '@/lib/types'
import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { YouTubeButtonOverlay } from '@/components/YouTubeButton/YouTubeButtonOverlay'

import styles from './styles.module.css'

export const GridMovie: React.FC<{
  movie: MovieModel
}> = ({ movie }) => {
  return (
    <div className={styles.gridMovie}>
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

      <ActiveLink href={`/titles/${movie.id}`} prefetch={false}>
        <h6 className={styles.title}>
          {movie.title}

          {movie.releaseYear && (
            <span className={styles.releaseYear}> ({movie.releaseYear})</span>
          )}
        </h6>
      </ActiveLink>
    </div>
  )
}
