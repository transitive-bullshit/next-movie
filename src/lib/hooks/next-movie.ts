'use client'

import * as React from 'react'
import useSWR, { preload } from 'swr'
import { createContainer } from 'unstated-next'

import * as types from '@/types'

import { SearchOptions } from './search-options'

// const sessionStorageSeedKey = 'next-movie-seed-v0.0.1'

const fetcher = ({
  url,
  body
}: {
  url: string
  body: types.INextMovieOptions
  key?: string
}): Promise<types.INextMovieResult> =>
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

  const body = React.useMemo<types.INextMovieOptions>(
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
    isValidating,
    mutate
  } = useSWR<types.INextMovieResult, Error>(
    {
      url: '/api/titles/next',
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

  const mutateUserMovie = React.useCallback<types.MutateUserMovieFn>(
    async (userMovie) => {
      const { movieId, ...patch } = userMovie

      const updateResult = (
        userMovie: Partial<types.UserMovie>,
        current: types.INextMovieResult = result!
      ) =>
        current?.movie?.id === movieId
          ? {
              ...current!,
              movie: {
                ...current!.movie!,
                userMovie: userMovie as any
              }
            }
          : current

      return mutate(
        async () => {
          const update = await fetch(`/api/titles/${movieId}/user-movie`, {
            method: 'POST',
            body: JSON.stringify(patch),
            headers: {
              'content-type': 'application/json'
            }
          }).then((res) => res.json())

          return update
        },
        {
          optimisticData: updateResult(userMovie),
          populateCache: updateResult,
          rollbackOnError: true,
          revalidate: false
        }
      )
    },
    [mutate, result]
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
            url: '/api/titles/next',
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
            url: '/api/titles/next',
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
    loadNextMovie,
    mutateUserMovie
  }
}

export const NextMovie = createContainer(useNextMovie)
