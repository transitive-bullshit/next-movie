'use client'

import * as React from 'react'

import { MovieList } from '@/components/MovieList/MovieList'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export const MovieSearchResults: React.FC = () => {
  const { searchResult, error } = Search.useContainer()

  if (error) {
    return <div>Error loading results</div>
  }

  if (!searchResult) {
    return <div>Loading...</div>
  }

  // TODO: handle isLoadingn and isValidating

  return (
    <div className={styles.movieSearchResults}>
      <p className={styles.totalResults}>
        {searchResult.total.toLocaleString()} results
      </p>

      <MovieList movies={searchResult.results} />
    </div>
  )
}
