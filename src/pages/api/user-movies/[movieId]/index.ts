import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import * as types from '@/lib/types'
import { prisma } from '@/server/prisma'
import { convertUserMovie } from '@/server/utils'
import { getServerSession } from '@/server/auth'

export default async function upsertUserMovieHandler(
  req: NextApiRequest,
  res: NextApiResponse<types.UserMovieModel | { error: string }>
) {
  const session = await getServerSession(req, res)
  if (!session) {
    return res.status(401).json({ error: `Unauthorized` })
  }

  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  const id = req.query.movieId as string
  const movieId = parseInt(id)
  if (isNaN(movieId)) {
    return res.status(400).json({ error: `invalid movie id "${id}"` })
  }

  let userMovieBody: types.IUpsertUserMovieBody

  try {
    userMovieBody = types.UpsertUserMovieBody.parse(req.body)
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('error parsing input', err.issues)
    }

    return res.status(400).json({ error: 'error parsing input' })
  }

  const userId = session.user.id

  // TODO
  const result = await prisma.userMovie.upsert({
    where: {
      movieId_userId: {
        movieId,
        userId
      }
    },
    create: {
      ...userMovieBody,
      movieId,
      userId
    },
    update: {
      ...userMovieBody
    }
  })

  const movie = await convertUserMovie(result)
  return res.status(200).json(movie)
}
