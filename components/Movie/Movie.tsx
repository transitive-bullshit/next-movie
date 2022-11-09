import * as React from 'react'
import Image from 'next/image'

import type { MovieModel } from '@/lib/models'

import styles from './styles.module.css'

export const Movie: React.FC<{
  movie: MovieModel
}> = ({ movie }) => {
  return (
    <div className={styles.movie}>
      <div className={styles.lhs}>
        {movie.posterUrl && (
          <div className={styles.frame}>
            <Image
              className={styles.poster}
              src={movie.posterUrl}
              alt={movie.title}
              sizes='100vw'
              fill
            />
          </div>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h3 className={styles.title}>{movie.title}</h3>

          <div className={styles.subHeader}>
            <div className={styles.releaseYear}>{movie.releaseYear}</div>

            {movie.director && (
              <div className={styles.director}>
                Directed by {movie.director}
              </div>
            )}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.lh}>
            <div className={styles.plot}>{movie.plot}</div>
          </div>

          <div className={styles.rh}>
            <div className={styles.imdbRating}>{movie.imdbRating}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
