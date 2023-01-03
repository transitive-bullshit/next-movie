import * as types from '@/types'
import { layoutToDefaultPageSize } from '@/lib/config'
import { getMoviePathname } from '@/lib/utils'

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
    pathname: getMoviePathname(movie),
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

export function convertUserMovieToMovie(
  input: types.UserMovieWithMovie
): types.MovieModel {
  const { movie, ...userMovie } = input
  return convertMovie({
    ...movie,
    userMovies: [userMovie]
  })
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

  if (session) {
    where.userMovies = {
      every: {
        ignored:
          opts.userMovie?.ignored !== undefined
            ? opts.userMovie?.ignored
            : false
      }
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
