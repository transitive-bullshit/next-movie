import { enrichMoviesWithPreviewImages } from './preview-images'
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

  // add preview images
  await enrichMoviesWithPreviewImages(models)

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

  // add preview images
  await enrichMoviesWithPreviewImages([model])

  return model
}
