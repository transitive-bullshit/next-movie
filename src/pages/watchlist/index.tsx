import * as React from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { SWRConfig, unstable_serialize } from 'swr'

import { Layout } from '@/components/Layout/Layout'
import { MovieSearch } from '@/components/MovieSearch/MovieSearch'
import { PageHead } from '@/components/PageHead/PageHead'
import { emptySearchOptions } from '@/lib/config'
import { ISearchOptionsConfig, SearchOptions } from '@/lib/hooks/search-options'
import { getServerSession } from '@/server/auth'
import { searchUserMovies } from '@/server/search-user-movies'

import styles from './styles.module.css'

export default function WatchlistPage({
  title,
  description,
  pathname,
  fallbackData = [],
  searchOptionsConfig
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Providers
        fallbackData={fallbackData}
        searchOptionsConfig={searchOptionsConfig}
      >
        <PageHead title={title} description={description} pathname={pathname} />

        <div className={styles.page}>
          <h1 className={styles.title}>{title}</h1>

          <MovieSearch
            className={styles.body}
            config={{
              layoutSingle: 'disabled'
            }}
          />
        </div>
      </Providers>
    </Layout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchOptions = {
    ...emptySearchOptions,
    userMovie: {
      status: 'planning'
    }
  }

  const session = await getServerSession(context.req, context.res)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const result = await searchUserMovies(searchOptions, session)

  const url = '/api/user-movies/search'
  const key = `watchlist-${session.user.id}`
  const fallbackData = [
    {
      key: {
        url,
        key,
        body: searchOptions
      },
      value: result
    }
  ]

  return {
    props: {
      title: 'Watchlist',
      description: 'Your personal movie watchlist.',
      pathname: '/watchlist',
      fallbackData,
      searchOptionsConfig: {
        url,
        key,
        initialSearchOptions: searchOptions
      }
    }
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
