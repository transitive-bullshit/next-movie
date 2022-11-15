'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
import { useLocalStorage, useDebounce, useRendersCount } from 'react-use'

import { IMovieSearchOptions } from '@/lib/types'
import { defaultSearchOptions } from '@/lib/config'

// TODO: persist search options to local storage

const localStorageSearchOptionsKey = 'search-options-v0.0.1'

export interface ISearchOptionsConfig {
  key: string
  initialSearchOptions: IMovieSearchOptions
}

function useSearchOptions(
  config: ISearchOptionsConfig = {
    key: 'search',
    initialSearchOptions: defaultSearchOptions
  }
) {
  const rendersCount = useRendersCount()
  const [cachedSearchOptions, setCachedSearchOptions] = useLocalStorage(
    `${localStorageSearchOptionsKey}-${config.key}`,
    config.initialSearchOptions
  )
  const [searchOptions, setSearchOptions] = React.useState<IMovieSearchOptions>(
    config.initialSearchOptions
  )

  React.useEffect(() => {
    if (cachedSearchOptions && rendersCount === 2) {
      setSearchOptions(cachedSearchOptions)
    }
  }, [cachedSearchOptions, rendersCount])

  const onChangeQuery = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((options) => ({ ...options, query: event.target.value }))
    },
    []
  )

  const onClearQuery = React.useCallback(() => {
    setSearchOptions((options) => ({ ...options, query: '' }))
  }, [])

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

  useDebounce(
    () => {
      setCachedSearchOptions(searchOptions)
    },
    1000,
    [searchOptions]
  )

  return {
    searchOptions,
    setSearchOptions,

    onChangeQuery,
    onClearQuery,
    onChangeForeign,
    onChangeReleaseYearMin,
    onChangeImdbRatingMin,
    onChangeGenres
  }
}

export const SearchOptions = createContainer(useSearchOptions)
