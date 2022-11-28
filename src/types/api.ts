import { z } from 'zod'

import { MovieModel } from './models'

export const MovieSearchLayout = z.enum(['grid', 'list', 'single'])

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
  cursor: z.number().nonnegative().or(z.string().optional()).optional(),
  limit: z.number().int().gte(1).lte(100).optional(),

  userMovie: z
    .object({
      status: z.string().optional()
    })
    .optional(),

  layout: MovieSearchLayout.optional()
})

export const NextMovieOptionsSchema = z.object({
  searchOptions: MovieSearchOptionsSchema,

  seed: z.string().min(1).optional(),
  total: z.number().int().nonnegative().optional(),
  seq: z.number().int().nonnegative().optional()
})

export const UpsertUserMovieBody = z.object({
  status: z.string().optional(),
  rating: z.number().nonnegative().lte(100).optional(),
  notes: z.string().optional()
})

export type IMovieSearchOptions = z.infer<typeof MovieSearchOptionsSchema>
export type IMovieSearchLayout = z.infer<typeof MovieSearchLayout>
export type INextMovieOptions = z.infer<typeof NextMovieOptionsSchema>
export type IUpsertUserMovieBody = z.infer<typeof UpsertUserMovieBody>
export type IUserAuthSchema = z.infer<typeof UserAuthSchema>

export interface IMovieSearchResults {
  results: MovieModel[]
  total: number
  cursor?: number | string | null
}

export interface INextMovieResult {
  movie?: MovieModel
  total: number
  prevSeq: number
  seq: number
  nextSeq: number
}
