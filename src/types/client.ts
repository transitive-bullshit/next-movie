import { UserMovieModel } from './models'

export type MutateUserMovieFn = (
  userMovie: Pick<UserMovieModel, 'movieId'> &
    Partial<Pick<UserMovieModel, 'status' | 'rating' | 'notes'>>
) => any
