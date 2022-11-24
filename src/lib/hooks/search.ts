'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
import useSWRInfinite from 'swr/infinite'

import * as types from '@/types'
import { defaultSearchOptions } from '@/lib/config'
import { layoutToDefaultPageSize } from '@/lib/config'

import { SearchOptions } from './search-options'

const fetcher = ({
  url,
  body
}: {
  url: string
  body: types.IMovieSearchOptions
  key?: string
}): Promise<types.IMovieSearchResults> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())

function useSearch() {
  const { searchOptions, config } = SearchOptions.useContainer()

  // const { cache } = useSWRConfig()
  // console.log(
  //   'cache',
  //   Object.fromEntries(Array.from(cache.keys()).map((k) => [k, cache.get(k)]))
  // )

  const getKey = React.useCallback(
    (_: number, previousPageData: types.IMovieSearchResults) => {
      const body: types.IMovieSearchOptions = { ...searchOptions }
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
    isValidating,
    mutate
  } = useSWRInfinite<types.IMovieSearchResults, Error>(getKey, fetcher, {
    // treat movie results as immutable
    keepPreviousData: true,
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
    // dedupingInterval: 24 * 60 * 1000
  })

  const mutateUserMovie = React.useCallback<types.MutateUserMovieFn>(
    async (userMovie) => {
      const { movieId, ...patch } = userMovie

      const updateResults = (
        userMovie: Partial<types.UserMovie>,
        current = searchResults
      ) => {
        // console.log('updateResults 0', { userMovie, current })

        return current?.map((searchResult) => ({
          ...searchResult,
          results: searchResult.results.map((movie) => {
            if (movie.id === movieId) {
              // console.log('updateResults 1', movieId, {
              //   old: movie.userMovie,
              //   new: {
              //     ...movie.userMovie,
              //     ...(userMovie as any)
              //   }
              // })

              return {
                ...movie,
                userMovie: {
                  ...movie.userMovie,
                  ...(userMovie as any)
                }
              }
            } else {
              return movie
            }
          })
        }))
      }

      return mutate(
        async () => {
          const update = await fetch(`/api/titles/${movieId}/user-movie`, {
            method: 'POST',
            body: JSON.stringify(patch),
            headers: {
              'content-type': 'application/json'
            }
          }).then((res) => res.json())

          return updateResults(update, searchResults)
        },
        {
          // TODO: Optimistic updates are not supported with swr/infinite.
          // @see https://github.com/vercel/swr/issues/1899#issue-1188206595
          // optimisticData: updateResults(userMovie),
          // populateCache: updateResults,
          // rollbackOnError: true,
          // revalidate: false
          revalidate: true
        }
      )
    },
    [mutate, searchResults]
  )

  const searchResultMovies = React.useMemo(
    () => searchResults?.flatMap((searchResult) => searchResult.results),
    [searchResults]
  )

  // console.log('searchResultMovies', searchResultMovies)

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

    loadMoreSearchResults,
    mutateUserMovie
  }
}

export const Search = createContainer(useSearch)
