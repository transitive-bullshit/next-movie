import { z } from 'zod'

import * as types from '@/types'
import { createAPIHandler } from '@/server/api'
import { prisma } from '@/server/prisma'
import { convertUserMovie } from '@/server/utils'

export const Body = z.object({
  status: z.string().optional().nullable(),
  rating: z.number().nonnegative().lte(100).optional().nullable(),
  notes: z.string().optional().nullable()
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
  async function upsertUserMovieHandler(req, res, { session, query, body }) {
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
    // add an extra long delay to accentuate any client-side swr cache misses
    // (for debugging purposes)
    // await new Promise((resolve) => {
    //   setTimeout(resolve, 5000)
    // })

    const movie = convertUserMovie(result)
    return res.status(200).json(movie)
  }
)
