'use client'

import * as React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { MovieList } from '@/components/MovieList/MovieList'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

// TODO: better error UI

export const MovieSearchResults: React.FC = () => {
  const {
    searchResults,
    searchResultMovies,
    error,
    isEmpty,
    isLoading,
    isValidating,
    hasMoreSearchResults,
    loadMoreSearchResults
  } = Search.useContainer()

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading || isValidating,
    hasNextPage: hasMoreSearchResults,
    onLoadMore: loadMoreSearchResults,
    disabled: !!error,
    rootMargin: '0px 0px 50% 0px'
  })

  if (error) {
    return <div>Error loading results</div>
  }

  return (
    <div className={styles.movieSearchResults}>
      <div className={styles.detail}>
        <LoadingSpinner loading={isLoading || isValidating} />

        <div className={styles.totalResults}>
          {isLoading
            ? 'Loading results'
            : isEmpty
            ? 'No results'
            : searchResults?.length
            ? `${searchResults[0].total.toLocaleString()} results`
            : ''}
        </div>
      </div>

      {searchResultMovies && <MovieList movies={searchResultMovies} />}

      {hasMoreSearchResults && (
        <div ref={sentryRef} className={styles.loadMore}>
          <LoadingSpinner
            loading={
              !!searchResultMovies?.length && (isLoading || isValidating)
            }
          />
        </div>
      )}
    </div>
  )
}
