import {
  MovieSearchOptionsSchema,
  IMovieSearchResults,
  IMovieSearchOptions
} from '@/types'
import { searchMovies } from '@/server/search'
import { createAPIHandler } from '@/server/api'

export default createAPIHandler<
  never,
  IMovieSearchOptions,
  IMovieSearchResults
>(
  {
    auth: 'optional',
    methods: ['POST'],
    body: MovieSearchOptionsSchema
  },
  async (req, res, { session, body }) => {
    const result = await searchMovies(body, session)

    // add an extra long delay to accentuate any client-side swr cache misses
    // (for debugging purposes)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000)
    // })

    // TODO: search results can't be cached because the params are a POST body
    // res.setHeader(
    //   'Cache-Control',
    //   'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
    // )

    return res.status(200).json(result)
  }
)
