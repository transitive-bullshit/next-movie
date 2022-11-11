import { type Movie as MovieModel, type Prisma } from '@prisma/client'

export { type MovieModel, type Prisma }

export interface IMovieSearchOptions {
  query?: string

  releaseYearMin?: number
  releaseYearMax?: number

  foreign?: boolean
  genres?: string[]

  imdbRatingMin?: number
  imdbRatingMax?: number
  imdbVotesMin?: number
  imdbVotesMax?: number

  relevancyScoreMin?: number
  relevancyScoreMax?: number

  rtCriticRatingMin?: number
  rtCriticRatingMax?: number

  rtAudienceRatingMin?: number
  rtAudienceRatingMax?: number

  orderBy?: keyof MovieModel
  cursor?: number
  limit?: number
}

export interface IMovieSearchResults {
  results: MovieModel[]
  total: number
  cursor?: number
}
