import { notFound } from 'next/navigation'

import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { MovieSearchResults } from '@/components/MovieSearchResults/MovieSearchResults'
import { defaultSearchOptions } from '@/lib/config'
import { searchMovies } from '@/lib/search'

import { Providers } from './providers'
import styles from './styles.module.css'

export default async function SearchPage({
  params
}: {
  params: { seq: string }
}) {
  const seq = parseInt(params.seq)
  if (isNaN(seq) || seq < 0) {
    return notFound()
  }

  // TODO
  const result = await searchMovies(defaultSearchOptions)

  const fallbackData = [
    {
      key: {
        url: '/api/search',
        key: 'search',
        body: defaultSearchOptions
      },
      value: result
    }
  ]

  return (
    <Providers fallbackData={fallbackData}>
      <div className={styles.searchPage}>
        <h1 className={styles.title}>Movie Search</h1>

        <div className={styles.body}>
          <MovieSearchOptions />

          <MovieSearchResults />
        </div>
      </div>
    </Providers>
  )
}
