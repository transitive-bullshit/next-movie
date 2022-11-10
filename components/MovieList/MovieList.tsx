import * as React from 'react'

import type { MovieModel } from '@/lib/models'
import { Movie } from '@/components/Movie/Movie'

import styles from './styles.module.css'

export const MovieList: React.FC<{
  movies: MovieModel[]
}> = ({ movies }) => {
  return (
    <div className={styles.movies}>
      {movies.map((movie) => (
        <Movie key={movie.tmdbId} movie={movie} />
      ))}
    </div>
  )
}
