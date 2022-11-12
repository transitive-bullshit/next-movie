'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
// import { useLocalStorage, useDebounce } from 'react-use'
import useSWRInfinite from 'swr/infinite'

import { IMovieSearchOptions, IMovieSearchResults } from '@/lib/types'
import { defaultSearchOptions } from '@/lib/config'

// TODO: persist search options to local storage

const fetcher = ({
  url,
  body
}: {
  url: string
  body: IMovieSearchOptions
}): Promise<IMovieSearchResults> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())

// const localStorageSearchOptionsKey = 'search-options-v0.0.1'

function useSearch() {
  // const [cachedSearchOptions, setCachedSearchOptions] = useLocalStorage(
  //   localStorageSearchOptionsKey,
  //   defaultSearchOptions
  // )
  const [searchOptions, setSearchOptions] = React.useState<IMovieSearchOptions>(
    // cachedSearchOptions ?? defaultSearchOptions
    defaultSearchOptions
  )

  const getKey = React.useCallback(
    (_: number, previousPageData: IMovieSearchResults) => {
      const body: IMovieSearchOptions = { ...searchOptions }
      const url = '/api/search'

      if (previousPageData) {
        const cursor =
          previousPageData.results[previousPageData.results.length - 1]?.id
        if (cursor) {
          body.cursor = cursor
        }
      }

      return { url, body }
    },
    [searchOptions]
  )

  const {
    data: searchResults,
    error,
    size: searchPageNum,
    setSize: setSearchPageNum,
    isLoading,
    isValidating
  } = useSWRInfinite<IMovieSearchResults, Error>(getKey, fetcher, {
    // treat movie results as immutable
    keepPreviousData: true,
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 24 * 60 * 1000
  })

  const onChangeQuery = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((options) => ({ ...options, query: event.target.value }))
    },
    []
  )

  const onChangeGenres = React.useCallback((opts: { value: string } | null) => {
    setSearchOptions((options) => ({
      ...options,
      genres: opts?.value ? [opts.value] : []
    }))
  }, [])

  const onChangeReleaseYearMin = React.useCallback(
    (opts: { value: number } | null) => {
      setSearchOptions((options) => ({
        ...options,
        releaseYearMin: opts?.value
      }))
    },
    []
  )

  const onChangeImdbRatingMin = React.useCallback(
    (opts: { value: number } | null) => {
      setSearchOptions((options) => ({
        ...options,
        imdbRatingMin: opts?.value
      }))
    },
    []
  )

  const onChangeForeign = React.useCallback((e: any) => {
    setSearchOptions((options) => ({ ...options, foreign: !options.foreign }))
  }, [])

  const searchResultMovies = React.useMemo(
    () => searchResults?.flatMap((searchResult) => searchResult.results),
    [searchResults]
  )

  const loadMoreSearchResults = React.useCallback(() => {
    console.log('loadMoreSearchResults', searchPageNum + 1)
    setSearchPageNum(searchPageNum + 1)
  }, [searchPageNum, setSearchPageNum])

  const pageSize = defaultSearchOptions.limit ?? 10
  const isEmpty = searchResults?.[0]?.results?.length === 0
  const hasMoreSearchResults = !(
    isEmpty ||
    (searchResults &&
      searchResults[searchResults.length - 1]?.results?.length < pageSize)
  )
  // const isRefreshing = isValidating && searchResults?.length === searchPageNum

  // useDebounce(
  //   () => {
  //     setCachedSearchOptions(searchOptions)
  //   },
  //   2000,
  //   [searchOptions]
  // )

  return {
    searchOptions,

    onChangeQuery,
    onChangeForeign,
    onChangeReleaseYearMin,
    onChangeImdbRatingMin,
    onChangeGenres,

    searchResults,
    searchResultMovies,
    error,
    isEmpty,
    isLoading,
    isValidating,
    hasMoreSearchResults,
    searchPageNum,

    loadMoreSearchResults
  }
}

export const Search = createContainer(useSearch)
