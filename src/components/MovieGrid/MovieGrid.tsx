import * as React from 'react'

import type { MovieModel } from '@/lib/types'

import { GridMovie } from './GridMovie'
import styles from './styles.module.css'

export const MovieGrid: React.FC<{
  movies: MovieModel[]
}> = ({ movies }) => {
  return (
    <div className={styles.movieGrid}>
      {movies.map((movie) => (
        <GridMovie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
