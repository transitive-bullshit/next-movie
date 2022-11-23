import * as types from '@/types'

export function convertMovies(
  movies: Array<types.Movie & { userMovies?: any }>
): types.MovieModel[] {
  // convert dates to strings
  const models: types.MovieModel[] = movies.map(convertMovie)

  return models
}

export function convertMovie(
  movie: types.Movie & { userMovies?: any }
): types.MovieModel {
  const { userMovies, ...rest } = movie

  // convert dates to strings
  // const model: types.MovieModel = JSON.parse(JSON.stringify(movie))
  const model: types.MovieModel = {
    ...rest,
    createdAt: movie.createdAt?.toISOString(),
    updatedAt: movie.updatedAt?.toISOString(),
    userMovie: convertUserMovie(userMovies?.[0])
  }

  return model
}

export function convertUserMovies(
  userMovies: types.UserMovie[]
): types.UserMovieModel[] {
  // convert dates to strings
  const models: types.UserMovieModel[] = userMovies.map((userMovie) => ({
    ...userMovie,
    createdAt: userMovie.createdAt?.toISOString(),
    updatedAt: userMovie.updatedAt?.toISOString()
  }))

  return models
}

export function convertUserMovie(
  userMovie?: types.UserMovie
): types.UserMovieModel | null {
  if (!userMovie) {
    return null
  }

  // convert dates to strings
  const model: types.UserMovieModel = {
    ...userMovie,
    createdAt: userMovie.createdAt?.toISOString(),
    updatedAt: userMovie.updatedAt?.toISOString()
  }

  return model
}
