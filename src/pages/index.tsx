import * as React from 'react'
import { InferGetStaticPropsType } from 'next'
import { SWRConfig, unstable_serialize } from 'swr'

import { Layout } from '@/components/Layout/Layout'
import { MovieSearch } from '@/components/MovieSearch/MovieSearch'
import { PageHead } from '@/components/PageHead/PageHead'
import { defaultSearchOptions } from '@/lib/config'
import { SearchOptions } from '@/lib/hooks/search-options'
import { searchMovies } from '@/server/search-movies'

import styles from './styles.module.css'

export default function HomePage({
  fallbackData = []
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <RootPageProviders fallbackData={fallbackData}>
        <PageHead />

        <div className={styles.homePage}>
          <MovieSearch className={styles.body} />
        </div>
      </RootPageProviders>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const result = await searchMovies(defaultSearchOptions)

  const fallbackData = [
    {
      key: {
        url: '/api/titles/search',
        key: 'search',
        body: defaultSearchOptions
      },
      value: result
    }
  ]

  return {
    props: {
      fallbackData
    }
  }
}

export function RootPageProviders({
  children,
  fallbackData = []
}: {
  children: React.ReactNode
  fallbackData?: Array<{ key: any; value: any }>
}) {
  // TODO: https://github.com/vercel/swr/issues/2234
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

  // console.log('fallback', Object.keys(fallback.fallback)[0])

  return (
    <SWRConfig value={fallback}>
      <SearchOptions.Provider>{children}</SearchOptions.Provider>
    </SWRConfig>
  )
}
