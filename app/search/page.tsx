import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { MovieSearchResults } from '@/components/MovieSearchResults/MovieSearchResults'
import { defaultSearchOptions } from '@/lib/config'
import { searchMovies } from '@/lib/search'

import { Providers } from './providers'

export default async function SearchPage() {
  const result = await searchMovies(defaultSearchOptions)

  return (
    <Providers fallbackData={result}>
      <MovieSearchOptions />

      <MovieSearchResults />
    </Providers>
  )
}
