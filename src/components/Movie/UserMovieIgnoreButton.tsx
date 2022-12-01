'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'

import { Tooltip } from '@/components/Tooltip/Tooltip'
import { IgnoreIcon } from '@/icons'
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

  return (
    <Tooltip content='Ignore Movie'>
      <div className={styles.userMovieButton} onClick={onChangeIgnore}>
        <IgnoreIcon className={styles.userMovieButtonIcon} />
      </div>
    </Tooltip>
  )
}
