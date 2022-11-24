import { createAPIHandler } from '@/server/api'
import { getNextMovie } from '@/server/next-movie'
import {
  INextMovieOptions,
  INextMovieResult,
  NextMovieOptionsSchema
} from '@/types'

export default createAPIHandler<never, INextMovieOptions, INextMovieResult>(
  {
    auth: 'optional',
    methods: ['POST'],
    body: NextMovieOptionsSchema
  },
  async function getNextTitleHandler(req, res, { session, body }) {
    const result = await getNextMovie(body, session)

    return res.status(200).json(result)
  }
)
