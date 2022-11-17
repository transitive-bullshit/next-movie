'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
import {
  useLocalStorage,
  useDebounce,
  useRendersCount,
  useUnmount
} from 'react-use'
import { unstable_serialize } from 'swr'

import { IMovieSearchLayout, IMovieSearchOptions } from '@/lib/types'
import { defaultSearchOptions } from '@/lib/config'

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

  const onChangeForeign = React.useCallback(() => {
    setSearchOptions((options) => ({ ...options, foreign: !options.foreign }))
  }, [])

  const onChangeOrderBy = React.useCallback(
    (opts: { value: string } | null) => {
      setSearchOptions((options) => ({
        ...options,
        orderBy: opts?.value || config.initialSearchOptions.orderBy
      }))
    },
    [config]
  )

  const onChangeLayout = React.useCallback((value: IMovieSearchLayout) => {
    setSearchOptions((options) => ({
      ...options,
      layout: value
    }))
  }, [])

  const onResetDefaults = React.useCallback(() => {
    setSearchOptions(config.initialSearchOptions)
  }, [config])

  const isDirty = React.useMemo<boolean>(
    () =>
      unstable_serialize(searchOptions) !==
      unstable_serialize(config.initialSearchOptions),
    [searchOptions, config]
  )

  const updateCache = React.useCallback(() => {
    setCachedSearchOptions(searchOptions)
  }, [setCachedSearchOptions, searchOptions])

  useDebounce(updateCache, 1000, [searchOptions])

  React.useEffect(() => {
    window.addEventListener('pagehide', updateCache)
    return () => {
      window.removeEventListener('pagehide', updateCache)
    }
  }, [updateCache])

  return {
    searchOptions,
    setSearchOptions,

    config,
    isDirty,

    onChangeQuery,
    onClearQuery,
    onChangeForeign,
    onChangeReleaseYearMin,
    onChangeImdbRatingMin,
    onChangeGenres,
    onChangeOrderBy,
    onChangeLayout,
    onResetDefaults
  }
}

export const SearchOptions = createContainer(useSearchOptions)
