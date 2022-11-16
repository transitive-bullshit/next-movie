'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
import useSWRInfinite from 'swr/infinite'

import { IMovieSearchOptions, IMovieSearchResults } from '@/lib/types'
import { defaultSearchOptions } from '@/lib/config'
import { layoutToDefaultPageSize } from '@/lib/config'

import { SearchOptions, ISearchOptionsConfig } from './search-options'

const fetcher = ({
  url,
  body
}: {
  url: string
  body: IMovieSearchOptions
  key?: string
}): Promise<IMovieSearchResults> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())

function useSearch(
  config: ISearchOptionsConfig = {
    key: 'search',
    initialSearchOptions: defaultSearchOptions
  }
) {
  const { searchOptions } = SearchOptions.useContainer()

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

      return { url, body, key: config.key }
    },
    [searchOptions, config.key]
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

  const searchResultMovies = React.useMemo(
    () => searchResults?.flatMap((searchResult) => searchResult.results),
    [searchResults]
  )

  const loadMoreSearchResults = React.useCallback(() => {
    setSearchPageNum(searchPageNum + 1)
  }, [searchPageNum, setSearchPageNum])

  const layout = searchOptions.layout || 'list'
  const pageSize = defaultSearchOptions.limit ?? layoutToDefaultPageSize[layout]
  const isEmpty = searchResults?.[0]?.results?.length === 0
  const hasMoreSearchResults = !(
    isEmpty ||
    (searchResults &&
      searchResults[searchResults.length - 1]?.results?.length < pageSize)
  )
  // const isRefreshing = isValidating && searchResults?.length === searchPageNum

  return {
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
