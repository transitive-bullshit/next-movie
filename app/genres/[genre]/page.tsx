import { notFound } from 'next/navigation'

import { MovieSearch } from '@/components/MovieSearch/MovieSearch'
import {
  genres,
  genreTitleMap,
  defaultSearchOptionsByGenre
} from '@/lib/genres'
import { searchMovies } from '@/lib/search'

import { Providers } from './providers'
import styles from './styles.module.css'

export default async function GenrePage({
  params
}: {
  params: { genre: string }
}) {
  const { genre } = params

  if (!genre) {
    return notFound()
  }

  const genreTitle = genreTitleMap[genre]
  if (!genreTitle) {
    return notFound()
  }

  const defaultSearchOptions = defaultSearchOptionsByGenre[genre]
  const result = await searchMovies(defaultSearchOptions)

  const searchKey = `genre-${genre}`
  const fallbackData = [
    {
      key: {
        url: '/api/search',
        key: searchKey,
        body: defaultSearchOptions
      },
      value: result
    }
  ]

  return (
    <Providers
      fallbackData={fallbackData}
      searchOptionsConfig={{
        key: searchKey,
        initialSearchOptions: defaultSearchOptions
      }}
    >
      <div className={styles.genrePage}>
        <h1 className={styles.genre}>{genreTitle}</h1>

        <MovieSearch className={styles.body} config={{ genres: 'disabled' }} />
      </div>
    </Providers>
  )
}

export async function generateStaticParams() {
  const genresSet = new Set<string>(genres)
  const uniqueGenres = Array.from(genresSet).sort()

  return uniqueGenres.map((genre) => ({ genre }))
}
