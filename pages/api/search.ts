import type { NextApiRequest, NextApiResponse } from 'next'

import { IMovieSearchOptions, IMovieSearchResults } from '@/lib/types'
import { searchMovies } from '@/lib/search'

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<IMovieSearchResults | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  // TODO: input validation
  const searchOptions: IMovieSearchOptions = req.body

  const result = await searchMovies(searchOptions)
  res.status(200).json(result)
}
