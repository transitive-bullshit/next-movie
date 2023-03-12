import { z } from 'zod'

import * as types from '@/types'
import { createAPIHandler } from '@/server/api'
import { prisma } from '@/server/prisma'
import { convertMovie } from '@/server/utils'

const Query = z.object({
  movieId: z.preprocess(
    (a) => parseInt(a as string, 10),
    z.number().nonnegative().lt(2147483647)
  )
})

export type IQuery = z.infer<typeof Query>

export default createAPIHandler<IQuery, never, types.MovieModel>(
  {
    methods: ['GET'],
    query: Query
  },
  async function getTitleHandler(req, res, { query }) {
    const { movieId } = query

    const result = await prisma.movie.findUnique({
      where: {
        id: movieId
      }
    })

    if (!result) {
      return res.status(404).json({ error: `title "${movieId}" not found` })
    }

    const movie = convertMovie(result)
    return res.status(200).json(movie)
  }
)
