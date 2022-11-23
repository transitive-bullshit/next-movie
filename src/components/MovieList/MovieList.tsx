import * as React from 'react'

import type { MovieModel } from '@/types'
import { Movie } from '@/components/Movie/Movie'

import styles from './styles.module.css'

export const MovieList: React.FC<{
  movies: MovieModel[]
}> = ({ movies }) => {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
