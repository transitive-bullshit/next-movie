import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import {
  NextMovieOptionsSchema,
  INextMovieOptions,
  INextMovieResult
} from '@/lib/types'
import { nextMovie } from '@/lib/next-movie'

export default async function nextMovieHandler(
  req: NextApiRequest,
  res: NextApiResponse<INextMovieResult | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  let params: INextMovieOptions

  try {
    params = NextMovieOptionsSchema.parse(req.body)
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('error parsing input', err.issues)
    }

    return res.status(400).json({ error: 'error parsing input' })
  }

  const result = await nextMovie(params)
  return res.status(200).json(result)
}
