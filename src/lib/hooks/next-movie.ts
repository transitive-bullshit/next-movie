'use client'

import * as React from 'react'
import { createContainer } from 'unstated-next'
import useSWR, { preload } from 'swr'

import { INextMovieOptions, INextMovieResult } from '@/types'

import { SearchOptions } from './search-options'

const sessionStorageSeedKey = 'next-movie-seed-v0.0.1'

const fetcher = ({
  url,
  body
}: {
  url: string
  body: INextMovieOptions
  key?: string
}): Promise<INextMovieResult> =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json'
    }
  }).then((res) => res.json())

const globalSeed = `${Math.random()}`

function useNextMovie() {
  const { searchOptions, config } = SearchOptions.useContainer()
  const [seq, setSeq] = React.useState<number>()
  // const [cachedSeed] = useSessionStorage(
  //   `${sessionStorageSeedKey}-${config.key}`,
  //   `${Math.random()}`
  // )

  const [seed, _setSeed] = React.useState<string>(globalSeed)

  const body = React.useMemo<INextMovieOptions>(
    () => ({
      searchOptions,
      seed,
      seq
    }),
    [searchOptions, seed, seq]
  )

  const {
    data: result,
    error,
    isLoading,
    isValidating
  } = useSWR<INextMovieResult, Error>(
    {
      url: '/api/next-movie',
      key: config.key,
      body
    },
    fetcher,
    {
      // treat movie results as immutable
      keepPreviousData: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 24 * 60 * 1000
    }
  )

  const loadPrevMovie = React.useCallback(() => {
    if (result?.prevSeq !== undefined) {
      setSeq(result.prevSeq)
    }
  }, [result])

  const loadNextMovie = React.useCallback(() => {
    if (result?.nextSeq !== undefined) {
      setSeq(result.nextSeq)
    }
  }, [result])

  // use the cached seed from session storage client-side
  // React.useEffect(() => {
  //   if (cachedSeed && rendersCount === 2) {
  //     setSeed(cachedSeed)
  //   }
  // }, [cachedSeed, rendersCount])

  // preload the next and previous movies any time `seq` changes
  React.useEffect(() => {
    if (result) {
      if (result?.prevSeq) {
        preload(
          {
            url: '/api/next-movie',
            key: config.key,
            body: {
              ...body,
              seq: result.prevSeq
            }
          },
          fetcher
        )
      }

      if (result?.nextSeq) {
        preload(
          {
            url: '/api/next-movie',
            key: config.key,
            body: {
              ...body,
              seq: result.nextSeq
            }
          },
          fetcher
        )
      }
    }
  }, [result, body, config])

  const isEmpty = result && !result.total

  return {
    result,

    error,
    isEmpty,
    isLoading,
    isValidating,

    loadPrevMovie,
    loadNextMovie
  }
}

export const NextMovie = createContainer(useNextMovie)
