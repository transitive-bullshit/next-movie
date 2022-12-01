// import pMemoize from 'p-memoize'
// import stringify from 'fast-json-stable-stringify'
// import QuickLRU from 'quick-lru'
import * as types from '@/types'

import { prisma } from './prisma'
import { convertMovies, parseMovieQuery } from './utils'

// TODO: is this even worth it within a serverless function?
// export const searchMovies = pMemoize(searchMoviesImpl, {
//   cacheKey: (args: Parameters<typeof searchMoviesImpl>) => stringify(args[0]),
//   cache: new QuickLRU({ maxSize: 200 })
// })

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
    cursor: results[results.length - 1]?.id || null
  }
}
