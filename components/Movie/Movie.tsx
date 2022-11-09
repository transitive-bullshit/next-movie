import * as React from 'react'
import Image from 'next/image'
import ms from 'pretty-ms'

import type { MovieModel } from '@/lib/models'

import styles from './styles.module.css'
import { Star } from '@/icons/Star'

export const Movie: React.FC<{
  movie: MovieModel
}> = ({ movie }) => {
  return (
    <div className={styles.movie}>
      {movie.backdropUrl && (
        <div className={styles.backdropWrapper}>
          <Image
            className={styles.backdrop}
            src={movie.backdropUrl}
            alt={movie.title}
            sizes='100vw'
            fill
          />
          <div className={styles.overlay} />
        </div>
      )}

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
            {movie.releaseYear && (
              <div className={styles.releaseYear}>{movie.releaseYear}</div>
            )}

            {movie.mpaaRating && (
              <div className={styles.mpaaRating}>{movie.mpaaRating}</div>
            )}

            {movie.runtime && (
              <div className={styles.runtime}>
                {ms(movie.runtime * 60 * 1000)}
              </div>
            )}

            {/* {movie.director && (
              <div className={styles.director}>
                Directed by {movie.director}
              </div>
            )} */}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.lh}>
            <div className={styles.plot}>{movie.plot}</div>
          </div>

          <div className={styles.rh}>
            {movie.imdbRating !== null && (
              <div className={styles.imdbRating}>
                <Star className={styles.imdbStar} />

                <div className={styles.imdbRatingValue0}>
                  <span className={styles.imdbRatingValue1}>
                    {movie.imdbRating}
                  </span>{' '}
                  / 10
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
