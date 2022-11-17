import { layoutToDefaultPageSize } from './config'
import { prisma } from './prisma'
import * as types from './types'
import { convertMovies } from './utils'

export async function searchMovies(
  opts: types.IMovieSearchOptions & { skip?: number }
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

  // always sort by desired field plus `id` to ensure sorting consistency
  const orderByField = opts.orderBy || 'relevancyScore'
  const orderBy: types.Prisma.Enumerable<types.Prisma.MovieOrderByWithAggregationInput> =
    [
      {
        [orderByField]: { sort: 'desc', nulls: 'last' }
      },
      {
        id: 'desc'
      }
    ]

  if (orderByField === 'rtCriticRating') {
    where.rtUrl = {
      not: null
    }

    where.rtCriticVotes = {
      gt: 5
    }
  } else if (orderByField === 'rtAudienceRating') {
    where.rtUrl = {
      not: null
    }

    where.rtAudienceVotes = {
      gt: 50
    }
  }

  const layout = opts.layout || 'list'
  const limit = opts.limit ?? layoutToDefaultPageSize[layout]

  // TODO
  if (layout === 'single') {
    // gte: 31000
    // gte: 100000
    where.relevancyScore = {
      gte: 50000
    }
  }

  const cursor = opts.cursor ? { id: opts.cursor } : undefined
  const take = Math.max(0, Math.min(100, limit))
  const skip = opts.cursor ? 1 : opts.skip !== undefined ? opts.skip : 0

  const [count, results] = await Promise.all([
    prisma.movie.count({
      where,
      orderBy
    }),

    take <= 0
      ? Promise.resolve([] as types.Movie[])
      : prisma.movie.findMany({
          where,
          cursor,
          orderBy,
          take,
          skip
        })
  ])

  const movies = await convertMovies(results)
  // console.log('search', opts, JSON.stringify(where, null, 2), movies.length)

  return {
    results: movies,
    total: count,
    cursor: movies[movies.length - 1]?.id
  }
}
