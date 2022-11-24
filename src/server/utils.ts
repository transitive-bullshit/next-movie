import * as types from '@/types'

export function convertMovies(
  movies: types.MovieWithUserMovies[]
): types.MovieModel[] {
  // convert dates to strings
  const models: types.MovieModel[] = movies.map(convertMovie)

  return models
}

export function convertMovie(
  movie: types.MovieWithUserMovies
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
  userMovies: types.UserMovieWithMovie[]
): types.MovieModel[] {
  const models: types.MovieModel[] = userMovies.map(({ movie, ...userMovie }) =>
    convertMovie({
      ...movie,
      userMovies: [userMovie]
    })
  )

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
