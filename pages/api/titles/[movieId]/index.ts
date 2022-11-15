import type { NextApiRequest, NextApiResponse } from 'next'

import { MovieModel } from '@/lib/types'
import { prisma } from '@/lib/prisma'
import { convertMovie } from '@/lib/utils'

export default async function getMovieByIdHandler(
  req: NextApiRequest,
  res: NextApiResponse<MovieModel | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  const movieId = req.query.movieId as string
  const id = parseInt(movieId)
  if (isNaN(id)) {
    return res.status(400).json({ error: `invalid movie id "${movieId}"` })
  }

  const result = await prisma.movie.findUnique({
    where: {
      id
    }
  })

  if (!result) {
    return res.status(404).json({ error: `movie "${movieId}" not found` })
  }

  const movie = await convertMovie(result)
  return res.status(200).json(movie)
}
