'use client'

import * as React from 'react'
import cs from 'clsx'
import { useSession } from 'next-auth/react'

import { Tooltip } from '@/components/Tooltip/Tooltip'
import { IgnoreIcon, IsIgnoredIcon } from '@/icons'
import { dequal } from '@/lib/dequal'
import type { MovieModel, MutateUserMovieFn, UserMovieModel } from '@/types'

import styles from './styles.module.css'

export const UserMovieIgnoreButton: React.FC<{
  movie: MovieModel
  mutateUserMovie: MutateUserMovieFn
}> = ({ movie, mutateUserMovie }) => {
  const { data: session } = useSession()
  const [userMovie, setUserMovie] =
    React.useState<Partial<UserMovieModel> | null>(movie.userMovie)

  const onChangeIgnore = React.useCallback(() => {
    const update = {
      ...movie.userMovie,
      movieId: movie.id,
      ignored: !movie.userMovie?.ignored
    }

    console.log('update', update, movie.userMovie?.ignored)
    setUserMovie(update)
    if (!dequal(update, movie.userMovie)) {
      mutateUserMovie(update as UserMovieModel)
    }
  }, [movie, mutateUserMovie])

  React.useEffect(() => {
    if (!dequal(userMovie, movie.userMovie)) {
      setUserMovie(movie.userMovie)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.userMovie, mutateUserMovie])

  if (!session) {
    return null
  }

  const isIgnored = !!userMovie?.ignored

  return (
    <Tooltip content={isIgnored ? 'Reset not interested' : 'Not Interested'}>
      <div
        className={cs(
          styles.userMovieButton,
          styles.ignore,
          isIgnored && styles.isIgnored
        )}
        onClick={onChangeIgnore}
      >
        {isIgnored ? (
          <IsIgnoredIcon className={styles.userMovieButtonIcon} />
        ) : (
          <IgnoreIcon className={styles.userMovieButtonIcon} />
        )}
      </div>
    </Tooltip>
  )
}
