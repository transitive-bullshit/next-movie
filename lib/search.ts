import { prisma } from './prisma'
import * as types from './types'

export async function searchMovies(
  opts: types.IMovieSearchOptions
): Promise<types.IMovieSearchResults> {
  const where: types.Prisma.MovieWhereInput = {}

  if (opts.query) {
    const query = opts.query.toLowerCase().trim()

    // TODO: use a full-text index
    if (query) {
      where.searchL = { contains: query }
      // where.OR = [
      //   { title: { contains: query } },
      //   { originalTitle: { contains: query } },
      //   { cast: { has: query } },
      //   { keywords: { has: query } },
      //   { director: { contains: query } }
      // ]
    }
  }

  if (opts.releaseYearMin) {
    where.releaseYear = {
      gte: opts.releaseYearMin
    }
  }

  if (opts.releaseYearMax) {
    where.releaseYear = {
      ...(where.releaseYear as any),
      lte: opts.releaseYearMax
    }
  }

  if (opts.foreign !== undefined) {
    where.foreign = !!opts.foreign
  }

  if (opts.genres && opts.genres.length) {
    where.genres = {
      hasEvery: opts.genres
    }
  }

  if (opts.imdbRatingMin) {
    where.imdbRating = {
      gte: opts.imdbRatingMin
    }
  }

  if (opts.imdbRatingMax) {
    where.imdbRating = {
      ...(where.imdbRating as any),
      lte: opts.imdbRatingMax
    }
  }

  if (opts.imdbVotesMin) {
    where.imdbVotes = {
      gte: opts.imdbVotesMin
    }
  }

  if (opts.imdbVotesMax) {
    where.imdbVotes = {
      ...(where.imdbVotes as any),
      lte: opts.imdbVotesMax
    }
  }

  if (opts.relevancyScoreMin) {
    where.relevancyScore = {
      gte: opts.relevancyScoreMin
    }
  }

  if (opts.relevancyScoreMax) {
    where.relevancyScore = {
      ...(where.relevancyScore as any),
      lte: opts.relevancyScoreMax
    }
  }

  if (opts.rtCriticRatingMin) {
    where.rtCriticRating = {
      gte: opts.rtCriticRatingMin
    }
  }

  if (opts.rtCriticRatingMax) {
    where.rtCriticRating = {
      ...(where.rtCriticRating as any),
      lte: opts.rtCriticRatingMax
    }
  }

  if (opts.rtAudienceRatingMin) {
    where.rtAudienceRating = {
      gte: opts.rtAudienceRatingMin
    }
  }

  if (opts.rtAudienceRatingMax) {
    where.rtAudienceRating = {
      ...(where.rtAudienceRating as any),
      lte: opts.rtAudienceRatingMax
    }
  }

  const orderBy: types.Prisma.MovieOrderByWithAggregationInput = opts.orderBy
    ? { [opts.orderBy]: 'desc' }
    : { relevancyScore: 'desc' }
  const cursor = opts.cursor ? { id: opts.cursor } : undefined
  const take = Math.max(1, Math.min(100, opts.limit || 10))
  const skip = opts.cursor ? 1 : 0

  const [count, movies] = await Promise.all([
    prisma.movie.count({
      where,
      orderBy
    }),

    prisma.movie.findMany({
      where,
      cursor,
      orderBy,
      take,
      skip
    })
  ])

  // convert dates to strings
  const results: types.MovieModel[] = JSON.parse(JSON.stringify(movies))

  // console.log('search', opts, JSON.stringify(where, null, 2), results.length)

  return {
    results,
    total: count,
    cursor: movies[movies.length - 1]?.id
  }
}
