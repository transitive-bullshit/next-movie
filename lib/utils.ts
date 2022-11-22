import * as types from './types'

export async function convertMovies(
  movies: types.Movie[]
): Promise<types.MovieModel[]> {
  // convert dates to strings
  const models: types.MovieModel[] = movies.map((movie) => ({
    ...movie,
    createdAt: movie.createdAt?.toISOString(),
    updatedAt: movie.updatedAt?.toISOString()
  }))

  return models
}

export async function convertMovie(
  movie: types.Movie
): Promise<types.MovieModel> {
  // convert dates to strings
  // const model: types.MovieModel = JSON.parse(JSON.stringify(movie))
  const model: types.MovieModel = {
    ...movie,
    createdAt: movie.createdAt?.toISOString(),
    updatedAt: movie.updatedAt?.toISOString()
  }

  return model
}

export async function convertUserMovies(
  userMovies: types.UserMovie[]
): Promise<types.UserMovieModel[]> {
  // convert dates to strings
  const models: types.UserMovieModel[] = userMovies.map((userMovie) => ({
    ...userMovie,
    createdAt: userMovie.createdAt?.toISOString(),
    updatedAt: userMovie.updatedAt?.toISOString()
  }))

  return models
}

export async function convertUserMovie(
  userMovie: types.UserMovie
): Promise<types.UserMovieModel> {
  // convert dates to strings
  const model: types.UserMovieModel = {
    ...userMovie,
    createdAt: userMovie.createdAt?.toISOString(),
    updatedAt: userMovie.updatedAt?.toISOString()
  }

  return model
}
