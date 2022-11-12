'use client'

import * as React from 'react'
import LoadingSpinner from 'react-spinners/BeatLoader'

import { MovieList } from '@/components/MovieList/MovieList'
import { Search } from '@/lib/hooks/search'
import { useTheme } from '@/lib/hooks/use-theme'

import styles from './styles.module.css'

export const MovieSearchResults: React.FC = () => {
  const { searchResult, error, isLoading, isValidating } = Search.useContainer()
  const { isDarkMode } = useTheme()

  if (error) {
    return <div>Error loading results</div>
  }

  // TODO: better error UI
  // TODO: use infinite scroll

  return (
    <div className={styles.movieSearchResults}>
      <div className={styles.detail}>
        <LoadingSpinner
          loading={isLoading || isValidating}
          color={isDarkMode ? '#fff' : '#24292f'}
          className={styles.loading}
        />

        <div className={styles.totalResults}>
          {isLoading
            ? 'Loading results'
            : searchResult
            ? `${searchResult.total.toLocaleString()} results`
            : ''}
        </div>
      </div>

      {searchResult && <MovieList movies={searchResult.results} />}
    </div>
  )
}
