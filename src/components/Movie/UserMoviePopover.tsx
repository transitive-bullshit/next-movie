'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import Select from 'react-select'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/Popover/Popover'
import { DotsVerticalIcon } from '@/icons'
import { dequal } from '@/lib/dequal'
import type { MovieModel, MutateUserMovieFn, UserMovieModel } from '@/types'

import styles from './styles.module.css'

// TODO: some of these status options make more sense for TV series
const statusOptions = [
  // {
  //   value: 'watching',
  //   label: 'Watching'
  // },
  {
    value: 'planning',
    label: 'Plan to watch'
  },
  {
    value: 'completed',
    label: 'Completed'
  },
  // {
  //   value: 'rewatching',
  //   label: 'Rewatching'
  // },
  {
    value: 'paused',
    label: 'Paused'
  },
  {
    value: 'dropped',
    label: 'Dropped'
  }
]

const minScore = 0
const maxScore = 100

const scoreOptions = [...new Array(maxScore - minScore + 1)]
  .map((_, index) => ({
    value: minScore + index,
    label: `${minScore + index}`
  }))
  .reverse()

const selectStyles: any = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#24292f'
  }),
  control: (provided: any) => ({
    ...provided,
    height: '100%'
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer'
  })
}

export const UserMoviePopover: React.FC<{
  movie: MovieModel
  mutateUserMovie: MutateUserMovieFn
}> = ({ movie, mutateUserMovie }) => {
  const { data: session } = useSession()
  const [userMovie, setUserMovie] =
    React.useState<Partial<UserMovieModel> | null>(movie.userMovie)

  const selectedStatusValue = React.useMemo(
    () => statusOptions.find((option) => option.value === userMovie?.status),
    [userMovie]
  )

  const selectedScoreValue = React.useMemo(
    () =>
      userMovie?.rating !== null && userMovie?.rating !== undefined
        ? {
            value: userMovie.rating,
            label: `${userMovie.rating}`
          }
        : null,
    [userMovie]
  )

  const onChangeStatus = React.useCallback(
    (opts: { value: string } | null) => {
      const update = {
        ...movie.userMovie,
        movieId: movie.id,
        status: opts?.value || null
      }

      setUserMovie(update)
      if (!dequal(update, movie.userMovie)) {
        mutateUserMovie(update as UserMovieModel)
      }
    },
    [movie, mutateUserMovie]
  )

  const onChangeScore = React.useCallback(
    (opts: { value: number } | null) => {
      const update = {
        ...movie.userMovie,
        movieId: movie.id,
        // TODO
        status: movie.userMovie?.status || 'completed',
        rating: opts?.value || null
      }

      setUserMovie(update)
      if (!dequal(update, movie.userMovie)) {
        mutateUserMovie(update as UserMovieModel)
      }
    },
    [movie, mutateUserMovie]
  )

  React.useEffect(() => {
    if (!dequal(userMovie, movie.userMovie)) {
      setUserMovie(movie.userMovie)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.userMovie, mutateUserMovie])

  if (!session) {
    return null
  }

  // console.log('Popover', movie.id, movie.userMovie?.status, userMovie?.status)

  return (
    <Popover>
      <PopoverTrigger className={styles.userMoviePopoverTrigger}>
        <DotsVerticalIcon className={styles.dotsIcon} />
      </PopoverTrigger>

      <PopoverContent className={styles.userMoviePopoverContent}>
        <div className={styles.field}>
          <label htmlFor='status'>Status</label>

          <Select
            name='status'
            id='status'
            instanceId='status'
            aria-label='Status'
            placeholder='Status'
            className={styles.select}
            options={statusOptions}
            styles={selectStyles}
            value={selectedStatusValue}
            onChange={onChangeStatus}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor='score'>Score</label>

          <Select
            name='score'
            id='score'
            instanceId='score'
            aria-label='Score'
            placeholder='Score'
            className={styles.select}
            options={scoreOptions}
            styles={selectStyles}
            value={selectedScoreValue}
            onChange={onChangeScore}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
