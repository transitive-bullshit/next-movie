'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'

import type { IMovieSearchOptions } from '@/lib/types'

const defaultSearchOptions: IMovieSearchOptions = {
  releaseYearMin: 1972,
  foreign: false,
  imdbRatingMin: 7,
  orderBy: 'relevancyScore'
}

function useSearch() {
  const [searchOptions, setSearchOptions] =
    React.useState<IMovieSearchOptions>(defaultSearchOptions)

  return {
    searchOptions,
    setSearchOptions
  }
}

export const Search = createContainer(useSearch)
