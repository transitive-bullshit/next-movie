import { MovieSearch } from '@/components/MovieSearch/MovieSearch'
import { defaultSearchOptions } from '@/lib/config'
import { searchMovies } from '@/lib/search'

import { RootPageProviders } from './providers'
import styles from './styles.module.css'

export default async function HomePage() {
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
    <RootPageProviders fallbackData={fallbackData}>
      <div className={styles.homePage}>
        <MovieSearch className={styles.body} />
      </div>
    </RootPageProviders>
  )
}
