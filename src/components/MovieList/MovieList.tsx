import * as React from 'react'
import { AnimatePresence } from 'framer-motion'

import { Movie } from '@/components/Movie/Movie'
import type { MovieModel, MutateUserMovieFn } from '@/types'

import styles from './styles.module.css'

export const MovieList: React.FC<{
  movies: MovieModel[]
  mutateUserMovie?: MutateUserMovieFn
}> = ({ movies, mutateUserMovie }) => {
  return (
    <div className={styles.movieList}>
      <AnimatePresence mode='popLayout' initial={false}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            mutateUserMovie={mutateUserMovie}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
