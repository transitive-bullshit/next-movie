'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
import useSWR from 'swr'

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

function useSearch() {
  const [searchOptions, setSearchOptions] = React.useState(defaultSearchOptions)
  const {
    data: searchResult,
    error,
    isLoading,
    isValidating
  } = useSWR<IMovieSearchResults, Error>(
    { url: '/api/search', body: searchOptions },
    fetcher,
    {
      // treat movie results as immutable
      keepPreviousData: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

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

  const onChangeForeign = React.useCallback(() => {
    setSearchOptions((options) => ({ ...options, foreign: !options.foreign }))
  }, [])

  return {
    searchOptions,

    onChangeQuery,
    onChangeForeign,
    onChangeReleaseYearMin,
    onChangeImdbRatingMin,
    onChangeGenres,

    searchResult,
    error,
    isLoading,
    isValidating
  }
}

export const Search = createContainer(useSearch)
