import * as types from '@/types'

import { prisma } from './prisma'
import { convertUserMovies, parseMovieQuery } from './utils'

export async function searchUserMovies(
  opts: types.IMovieSearchOptions & { skip?: number },
  session: types.Session
): Promise<types.IMovieSearchResults> {
  if (!session?.user?.id) {
    throw new Error('Requires authentication')
  }

  const query = parseMovieQuery(opts, session)
  delete query.where.userMovies

  const where: types.Prisma.UserMovieWhereInput = {
    userId: session.user.id,
    movie: query.where,
    ignored: false
  }

  if (opts.userMovie?.status) {
    where.status = opts.userMovie.status
  }

  if (opts.userMovie?.ignored) {
    where.ignored = opts.userMovie.ignored
  }

  const orderBy: types.Prisma.Enumerable<types.Prisma.UserMovieOrderByWithAggregationInput> =
    [
      {
        // TODO: make 'rating' configurable by `opts.orderBy`
        rating: { sort: 'desc', nulls: 'last' }
      },
      {
        // always sort by desired field plus `id` to ensure sorting consistency
        id: 'desc'
      }
    ]

  const [count, results] = await Promise.all([
    prisma.userMovie.count({
      where,
      orderBy
    }),

    query.take <= 0
      ? Promise.resolve<types.UserMovieWithMovie[]>([])
      : prisma.userMovie.findMany({
          where,
          cursor: query.cursor as
            | types.Prisma.UserMovieWhereUniqueInput
            | undefined,
          orderBy,
          take: query.take,
          skip: query.skip,
          include: {
            movie: true
          }
        })
  ])

  const movies = convertUserMovies(results)
  // console.log('search', opts, JSON.stringify(where, null, 2), movies.length)

  return {
    results: movies,
    total: count,
    cursor: movies[movies.length - 1]?.id || null
  }
}
