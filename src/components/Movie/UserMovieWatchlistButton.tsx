'use client'

import * as React from 'react'
import cs from 'clsx'
import { useSession } from 'next-auth/react'

import { Tooltip } from '@/components/Tooltip/Tooltip'
import { InWatchlistIcon, WatchlistIcon } from '@/icons'
import { dequal } from '@/lib/dequal'
import type { MovieModel, MutateUserMovieFn, UserMovieModel } from '@/types'

import styles from './styles.module.css'

export const UserMovieWatchlistButton: React.FC<{
  movie: MovieModel
  mutateUserMovie: MutateUserMovieFn
}> = ({ movie, mutateUserMovie }) => {
  const { data: session } = useSession()
  const [userMovie, setUserMovie] =
    React.useState<Partial<UserMovieModel> | null>(movie.userMovie)

  const onChangeWatchlist = React.useCallback(() => {
    const update = {
      ...movie.userMovie,
      movieId: movie.id,
      status: movie.userMovie?.status === 'planning' ? null : 'planning'
    }

    console.log('update', update)
    setUserMovie(update)
    if (!dequal(update, movie.userMovie)) {
      mutateUserMovie(update as UserMovieModel)
    }
  }, [movie, mutateUserMovie])

  React.useEffect(() => {
    // update local cache from prop changes
    if (!dequal(userMovie, movie.userMovie)) {
      setUserMovie(movie.userMovie)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.userMovie, mutateUserMovie])

  if (!session) {
    return null
  }

  const isPlanning = userMovie?.status === 'planning'

  return (
    <Tooltip
      content={isPlanning ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      <div
        className={cs(
          styles.userMovieButton,
          styles.watchlist,
          isPlanning && styles.isPlanning
        )}
        onClick={onChangeWatchlist}
      >
        {isPlanning ? (
          <InWatchlistIcon className={styles.userMovieButtonIcon} />
        ) : (
          <WatchlistIcon className={styles.userMovieButtonIcon} />
        )}
      </div>
    </Tooltip>
  )
}
