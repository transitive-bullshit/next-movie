import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { MovieSearchResults } from '@/components/MovieSearchResults/MovieSearchResults'
import { defaultSearchOptions } from '@/lib/config'
import { searchMovies } from '@/lib/search'

import { Providers } from './providers'
import styles from './styles.module.css'

export default async function SearchPage() {
  const result = await searchMovies(defaultSearchOptions)

  return (
    <Providers fallbackData={result}>
      <div className={styles.container}>
        <h1 className={styles.title}>Search</h1>

        <div className={styles.body}>
          <MovieSearchOptions />

          <MovieSearchResults />
        </div>
      </div>
    </Providers>
  )
}
