import * as React from 'react'
import { useSession } from 'next-auth/react'
import Select from 'react-select'

import { dequal } from '@/lib/dequal'

import type { MovieModel, UserMovieModel, MutateUserMovieFn } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/Popover/Popover'
import { DotsVerticalIcon } from '@/icons'

import styles from './styles.module.css'

const statusOptions = [
  {
    value: 'watching',
    label: 'Watching'
  },
  {
    value: 'planning',
    label: 'Plan to watch'
  },
  {
    value: 'completed',
    label: 'Completed'
  },
  {
    value: 'rewatching',
    label: 'Rewatching'
  },
  {
    value: 'paused',
    label: 'Paused'
  },
  {
    value: 'dropped',
    label: 'Dropped'
  }
]

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

      <PopoverContent>
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
      </PopoverContent>
    </Popover>
  )
}
