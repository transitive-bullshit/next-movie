import { z } from 'zod'
import { type Movie as MovieModel, type Prisma } from '@prisma/client'

export { type MovieModel, type Prisma }

export const MovieSearchOptionsSchema = z.object({
  query: z.string().optional(),

  foreign: z.boolean().optional(),
  genres: z.string().array().optional(),

  releaseYearMin: z.number().int().nonnegative().optional(),
  releaseYearMax: z.number().int().nonnegative().optional(),

  imdbRatingMin: z.number().nonnegative().lte(10).optional(),
  imdbRatingMax: z.number().nonnegative().lte(10).optional(),

  imdbVotesMin: z.number().nonnegative().optional(),
  imdbVotesMax: z.number().nonnegative().optional(),

  relevancyScoreMin: z.number().nonnegative().optional(),
  relevancyScoreMax: z.number().nonnegative().optional(),

  rtCriticRatingMin: z.number().nonnegative().lte(100).optional(),
  rtCriticRatingMax: z.number().nonnegative().lte(100).optional(),

  rtAudienceRatingMin: z.number().nonnegative().lte(100).optional(),
  rtAudienceRatingMax: z.number().nonnegative().lte(100).optional(),

  orderBy: z.string().optional(),
  cursor: z.number().nonnegative().optional(),
  limit: z.number().int().gte(1).lte(100).optional()
})

export type IMovieSearchOptions = z.infer<typeof MovieSearchOptionsSchema>

export const NextMovieOptionsSchema = z.object({
  searchOptions: MovieSearchOptionsSchema,

  seed: z.string().min(1).optional(),
  total: z.number().int().nonnegative().optional(),
  seq: z.number().int().nonnegative().optional()
})

export type INextMovieOptions = z.infer<typeof NextMovieOptionsSchema>

export interface IMovieSearchResults {
  results: MovieModel[]
  total: number
  cursor?: number
}

export interface INextMovieResult {
  movie: MovieModel
  total: number
  prevSeq: number
  seq: number
  nextSeq: number
}
