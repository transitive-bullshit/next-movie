import {
  NextMovieOptionsSchema,
  INextMovieOptions,
  INextMovieResult
} from '@/types'
import { getNextMovie } from '@/server/next-movie'

import { createAPIHandler } from '@/server/api'

export default createAPIHandler<never, INextMovieOptions, INextMovieResult>(
  {
    auth: 'optional',
    methods: ['POST'],
    body: NextMovieOptionsSchema
  },
  async (req, res, { session, body }) => {
    const result = await getNextMovie(body, session)

    return res.status(200).json(result)
  }
)
