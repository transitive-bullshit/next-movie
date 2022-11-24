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

    return res.status(200).json(result)
  }
)
