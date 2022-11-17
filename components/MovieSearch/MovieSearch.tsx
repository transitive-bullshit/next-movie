'use client'

import * as React from 'react'
import useDelayedRender from 'use-delayed-render'
import cs from 'clsx'

import {
  MovieSearchOptions,
  IMovieSearchOptionsProps
} from '@/components/MovieSearchOptions/MovieSearchOptions'
import { MovieSearchResults } from '@/components/MovieSearchResults/MovieSearchResults'

import styles from './styles.module.css'

export const MovieSearch: React.FC<
  { className?: string } & IMovieSearchOptionsProps
> = ({ config, className }) => {
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const { rendered } = useDelayedRender(hasMounted, {
    enterDelay: 100
  })

  return (
    <div
      className={cs(styles.movieSearch, rendered && styles.visible, className)}
    >
      <MovieSearchOptions config={config} />

      <MovieSearchResults />
    </div>
  )
}
