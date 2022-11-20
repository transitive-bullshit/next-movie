import { notFound } from 'next/navigation'

import { MovieSearch } from '@/components/MovieSearch/MovieSearch'
import { IMovieSearchOptionsConfig } from '@/components/MovieSearchOptions/MovieSearchOptions'
import {
  genres,
  genreTitleMap,
  defaultSearchOptionsByGenre
} from '@/lib/genres'
import { searchMovies } from '@/lib/search'

import { Providers } from './providers'
import styles from './styles.module.css'

const config: IMovieSearchOptionsConfig = { genres: 'disabled' }

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

        <MovieSearch className={styles.body} config={config} />
      </div>
    </Providers>
  )
}

export async function generateStaticParams() {
  const genresSet = new Set<string>(genres)
  const uniqueGenres = Array.from(genresSet).sort()

  return uniqueGenres.map((genre) => ({ genre }))
}
