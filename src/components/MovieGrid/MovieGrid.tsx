import * as React from 'react'

import type { MovieModel, MutateUserMovieFn } from '@/types'

import { GridMovie } from './GridMovie'
import styles from './styles.module.css'

export const MovieGrid: React.FC<{
  movies: MovieModel[]
  mutateUserMovie?: MutateUserMovieFn
}> = ({ movies, mutateUserMovie }) => {
  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <GridMovie
          key={movie.id}
          movie={movie}
          mutateUserMovie={mutateUserMovie}
        />
      ))}
    </div>
  )
}
