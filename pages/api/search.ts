import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import {
  MovieSearchOptionsSchema,
  IMovieSearchResults,
  IMovieSearchOptions
} from '@/lib/types'
import { searchMovies } from '@/lib/search'

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<IMovieSearchResults | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  let searchOptions: IMovieSearchOptions

  try {
    searchOptions = MovieSearchOptionsSchema.parse(req.body)
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('search error parsing input', err.issues)
    }

    return res.status(400).json({ error: 'error parsing input' })
  }

  const result = await searchMovies(searchOptions)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  )

  return res.status(200).json(result)
}
