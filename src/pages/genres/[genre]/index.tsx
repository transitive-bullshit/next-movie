import * as React from 'react'
import { InferGetStaticPropsType } from 'next'
import { SWRConfig, unstable_serialize } from 'swr'

import { Layout } from '@/components/Layout/Layout'
import { MovieSearch } from '@/components/MovieSearch/MovieSearch'
import { PageHead } from '@/components/PageHead/PageHead'
import {
  defaultSearchOptionsByGenre,
  genreTitleMap,
  genres
} from '@/lib/genres'
import { ISearchOptionsConfig, SearchOptions } from '@/lib/hooks/search-options'
import { searchMovies } from '@/server/search-movies'

import styles from './styles.module.css'

export default function GenrePage({
  genre,
  genreTitle,
  fallbackData = [],
  searchOptionsConfig
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pathname = `/genres/${genre}`
  const imagePathname = `/api/genres/${genre}/social-image`

  return (
    <Layout>
      <Providers
        fallbackData={fallbackData}
        searchOptionsConfig={searchOptionsConfig}
      >
        <PageHead
          title={genreTitle}
          description={`The top ${genreTitle.toLowerCase()} of all time.`}
          pathname={pathname}
          imagePathname={imagePathname}
        />

        <div className={styles.genre}>
          <MovieSearch
            className={styles.body}
            config={{ genres: 'disabled' }}
          />
        </div>
      </Providers>
    </Layout>
  )
}

export const getStaticProps = async ({
  params
}: {
  params: { genre: string }
}) => {
  const { genre } = params

  if (!genre) {
    return {
      notFound: true
    }
  }

  const genreTitle = genreTitleMap[genre]
  if (!genreTitle) {
    return {
      notFound: true
    }
  }

  const defaultSearchOptions = defaultSearchOptionsByGenre[genre]
  const result = await searchMovies(defaultSearchOptions)

  const url = '/api/titles/search'
  const key = `genre-${genre}`
  const fallbackData = [
    {
      key: {
        url,
        key,
        body: defaultSearchOptions
      },
      value: result
    }
  ]

  return {
    props: {
      genre,
      genreTitle,
      fallbackData,
      searchOptionsConfig: {
        url,
        key,
        initialSearchOptions: defaultSearchOptions
      }
    }
  }
}

export async function getStaticPaths() {
  const genresSet = new Set<string>(genres)
  const uniqueGenres = Array.from(genresSet).sort()

  const paths = uniqueGenres.map((genre) => ({ params: { genre } }))

  return {
    paths,
    fallback: false
  }
}

export function Providers({
  children,
  fallbackData = [],
  searchOptionsConfig
}: {
  children: React.ReactNode
  fallbackData?: Array<{ key: any; value: any }>
  searchOptionsConfig: ISearchOptionsConfig
}) {
  const fallback = React.useMemo(
    () => ({
      fallback: Object.fromEntries(
        fallbackData.map((d) => [
          `$inf$${unstable_serialize(d.key)}`,
          [d.value]
        ])
      )
    }),
    [fallbackData]
  )

  return (
    <SWRConfig value={fallback}>
      <SearchOptions.Provider initialState={searchOptionsConfig}>
        {children}
      </SearchOptions.Provider>
    </SWRConfig>
  )
}
