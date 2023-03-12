'use client'

import * as React from 'react'
import cs from 'clsx'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { Button } from '@/components/Button/Button'
import { HeroButton } from '@/components/HeroButton/HeroButton'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'
import { Movie } from '@/components/Movie/Movie'
import { MovieGrid } from '@/components/MovieGrid/MovieGrid'
import { MovieList } from '@/components/MovieList/MovieList'
import { NextMovie } from '@/lib/hooks/next-movie'
import { Search } from '@/lib/hooks/search'
import { SearchOptions } from '@/lib/hooks/search-options'

import styles from './styles.module.css'

// TODO: better error UI

export const MovieSearchResults: React.FC = () => {
  const { searchOptions } = SearchOptions.useContainer()

  if (searchOptions.layout === 'single') {
    return (
      <NextMovie.Provider>
        <MovieSearchResultsSingle />
      </NextMovie.Provider>
    )
  } else {
    // 'list' and 'grid' layouts
    return (
      <Search.Provider>
        <MovieSearchResultsInfinite />
      </Search.Provider>
    )
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
    loadMoreSearchResults,
    mutateUserMovie
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
        <LoadingSpinner loading={isLoading} />

        <div className={styles.totalResults}>
          {isLoading
            ? 'Loading results'
            : isEmpty
            ? 'No results'
            : searchResults?.length
            ? `${searchResults[0].total.toLocaleString('en-US')} result${
                searchResults[0].total !== 1 ? 's' : ''
              }`
            : ''}
        </div>
      </div>

      {isEmpty ? (
        <EmptyResults />
      ) : (
        searchResultMovies && (
          <>
            {searchOptions.layout === 'grid' && (
              <MovieGrid
                movies={searchResultMovies}
                mutateUserMovie={mutateUserMovie}
              />
            )}

            {(searchOptions.layout === 'list' || !searchOptions.layout) && (
              <MovieList
                movies={searchResultMovies}
                mutateUserMovie={mutateUserMovie}
              />
            )}
          </>
        )
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

export const MovieSearchResultsSingle: React.FC = () => {
  const {
    result,
    error,
    isEmpty,
    isLoading,
    isValidating,
    loadPrevMovie,
    loadNextMovie,
    mutateUserMovie
  } = NextMovie.useContainer()

  if (error) {
    return <div>Error loading results</div>
  }

  return (
    <div className={styles.nextMovieContainer}>
      <div className={styles.detail}>
        <LoadingSpinner loading={isLoading || isValidating} />

        <div className={styles.totalResults}>
          {result?.total
            ? `${result.total.toLocaleString('en-US')} result${
                result.total !== 1 ? 's' : ''
              }`
            : isLoading
            ? 'Loading results'
            : isEmpty
            ? 'No results'
            : ''}
        </div>
      </div>

      {result?.movie && (
        <div className={styles.singleMovieContainer}>
          <Movie
            movie={result.movie}
            variant='slim'
            mutateUserMovie={mutateUserMovie}
          />
        </div>
      )}

      {isEmpty ? (
        <EmptyResults />
      ) : (
        <div className={styles.nextMovieActions}>
          <Button onClick={loadPrevMovie} disabled={!result?.prevSeq}>
            Previous Movie
          </Button>

          <HeroButton onClick={loadNextMovie} disabled={!result?.nextSeq}>
            Next Movie
          </HeroButton>
        </div>
      )}
    </div>
  )
}

export const EmptyResults: React.FC = () => {
  return (
    <div className={styles.emptyResults}>
      <p>No results found. Try broadening your search.</p>
    </div>
  )
}
