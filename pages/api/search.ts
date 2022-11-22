import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'

import { getServerSession } from '@/lib/auth'

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

  const session = await getServerSession(req, res)
  const result = await searchMovies(searchOptions, session)

  // add an extra long delay to accentuate any client-side swr cache misses
  // (for debugging purposes)
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 5000)
  // })

  // TODO: search results can't be cached because the params are a POST body
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  // )

  return res.status(200).json(result)
}
