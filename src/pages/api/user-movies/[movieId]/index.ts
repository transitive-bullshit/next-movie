import { z } from 'zod'

import * as types from '@/types'
import { prisma } from '@/server/prisma'
import { convertUserMovie } from '@/server/utils'
import { createAPIHandler } from '@/server/api'

export const Body = z.object({
  status: z.string().optional(),
  rating: z.number().nonnegative().lte(100).optional(),
  notes: z.string().optional()
})

export type IBody = z.infer<typeof Body>

export const Query = z.object({
  movieId: z.preprocess(
    (a) => parseInt(a as string, 10),
    z.number().nonnegative().lt(2147483647)
  )
})

export type IQuery = z.infer<typeof Query>

export default createAPIHandler<IQuery, IBody, types.UserMovieModel>(
  {
    auth: 'required',
    methods: ['POST'],
    query: Query,
    body: Body
  },
  async (req, res, { session, query, body }) => {
    const { movieId } = query
    const userId = session.user.id

    // TODO: test
    const result = await prisma.userMovie.upsert({
      where: {
        movieId_userId: {
          movieId,
          userId
        }
      },
      create: {
        ...body,
        movieId,
        userId
      },
      update: {
        ...body
      }
    })

    const movie = convertUserMovie(result)
    return res.status(200).json(movie)
  }
)
