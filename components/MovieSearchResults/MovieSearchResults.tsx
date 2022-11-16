'use client'

import * as React from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import cs from 'clsx'

import { MovieList } from '@/components/MovieList/MovieList'
import { MovieGrid } from '@/components/MovieGrid/MovieGrid'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { Search } from '@/lib/hooks/search'
import { SearchOptions } from '@/lib/hooks/search-options'

import styles from './styles.module.css'

// TODO: better error UI

export const MovieSearchResults: React.FC = () => {
  const { searchOptions } = SearchOptions.useContainer()

  if (searchOptions.layout === 'single') {
    return null
  } else {
    // 'list' and 'grid' layouts

    return <MovieSearchResultsInfinite />
  }
}

export const MovieSearchResultsInfinite: React.FC = () => {
  const { searchOptions } = SearchOptions.useContainer()

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
    rootMargin: '0px 0px 250% 0px'
  })

  if (error) {
    return <div>Error loading results</div>
  }

  return (
    <div
      className={cs(
        styles.movieSearchResults,
        styles[`layout-${searchOptions.layout || 'list'}`]
      )}
    >
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

      {searchResultMovies && (
        <>
          {searchOptions.layout === 'grid' && (
            <MovieGrid movies={searchResultMovies} />
          )}

          {(searchOptions.layout === 'list' || !searchOptions.layout) && (
            <MovieList movies={searchResultMovies} />
          )}
        </>
      )}

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
