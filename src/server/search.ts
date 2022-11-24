// import pMemoize from 'p-memoize'
// import stringify from 'fast-json-stable-stringify'
// import QuickLRU from 'quick-lru'

import * as types from '@/types'
import { layoutToDefaultPageSize } from '@/lib/config'
import { prisma } from './prisma'
import { convertMovies } from './utils'

// TODO: is this even worth it within a serverless function?
// export const searchMovies = pMemoize(searchMoviesImpl, {
//   cacheKey: (args: Parameters<typeof searchMoviesImpl>) => stringify(args[0]),
//   cache: new QuickLRU({ maxSize: 200 })
// })

export function parseMovieQuery(
  opts: types.IMovieSearchOptions & { skip?: number },
  session?: types.Session | null
) {
  const where: types.Prisma.MovieWhereInput = {}

  if (opts.query) {
    const query = opts.query.toLowerCase().trim()

    // TODO: use a full-text index
    if (query) {
      where.searchL = { contains: query }
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

  const orderByField = opts.orderBy || 'relevancyScore'
  const orderBy: types.Prisma.Enumerable<types.Prisma.MovieOrderByWithAggregationInput> =
    [
      // TODO: this type of sorting by a relation field doesn't seem to work..
      // orderByField === 'score' ? {
      //   userMovies: {
      //     score: { sort: 'desc', nulls: 'last' }
      //   }
      // } :
      {
        [orderByField]: { sort: 'desc', nulls: 'last' }
      },
      {
        // always sort by desired field plus `id` to ensure sorting consistency
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

  // TODO: instead of this, we should weight search results by their respective
  // relevancy scores, or at least their order in the results list
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

  return {
    where,
    orderBy,
    cursor,
    take,
    skip
  }
}

export async function searchMovies(
  opts: types.IMovieSearchOptions & { skip?: number },
  session?: types.Session | null
): Promise<types.IMovieSearchResults> {
  const { where, orderBy, cursor, take, skip } = parseMovieQuery(opts, session)

  const include: types.Prisma.MovieInclude | undefined = session?.user?.id
    ? {
        userMovies: {
          where: {
            userId: session.user.id
          }
        }
      }
    : undefined

  const [count, results] = await Promise.all([
    prisma.movie.count({
      where,
      orderBy
    }),

    take <= 0
      ? Promise.resolve<types.MovieWithUserMovies[]>([])
      : prisma.movie.findMany({
          where,
          cursor: cursor as types.Prisma.MovieWhereUniqueInput | undefined,
          orderBy,
          take,
          skip,
          include
        })
  ])

  const movies = convertMovies(results)
  // console.log('search', opts, JSON.stringify(where, null, 2), movies.length)

  return {
    results: movies,
    total: count,
    cursor: results[results.length - 1]?.id
  }
}
