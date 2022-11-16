import { notFound } from 'next/navigation'
import Link from 'next/link'

import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { Movie } from '@/components/Movie/Movie'
import { IMovieSearchOptions } from '@/lib/types'
import { getMovie } from '@/lib/next-movie'

import { Providers } from './providers'
import styles from './styles.module.css'

interface IAppSearchParams {
  seed?: string
  total?: string
  // genres?: string
  releaseYearMin?: string
  imdbRatingMin?: string
  foreign?: string
  orderBy?: string
}

export default async function AppMoviePage({
  params,
  searchParams
}: {
  params: { seq: string }
  searchParams: IAppSearchParams
}) {
  console.log('AppMoviePage', params, searchParams)

  const seq = parseInt(params.seq)
  if (isNaN(seq) || seq < 0) {
    return notFound()
  }

  const searchOptions: IMovieSearchOptions = {}
  let total: number | undefined

  if (searchParams.releaseYearMin) {
    const releaseYearMin = parseInt(searchParams.releaseYearMin)
    if (isNaN(releaseYearMin) || releaseYearMin < 0) {
      return notFound()
    } else {
      searchOptions.releaseYearMin = releaseYearMin
    }
  }

  if (searchParams.imdbRatingMin) {
    const imdbRatingMin = parseFloat(searchParams.imdbRatingMin)
    if (isNaN(imdbRatingMin) || imdbRatingMin < 0) {
      return notFound()
    } else {
      searchOptions.imdbRatingMin = imdbRatingMin
    }
  }

  if (searchParams.foreign) {
    searchOptions.foreign = searchParams.foreign === 'true'
  }

  if (searchParams.orderBy) {
    searchOptions.orderBy = searchParams.orderBy
  }

  if (searchParams.total) {
    total = parseInt(searchParams.total)
    if (isNaN(total) || total < 0) {
      return notFound()
    }
  }

  console.log('>>> getMovie', {
    seed: searchParams.seed,
    searchOptions,
    total,
    seq
  })
  const result = await getMovie({
    seed: searchParams.seed,
    searchOptions,
    total,
    seq
  })
  console.log('<<< getMovie', result)

  // TODO: add genres to searchOptions and params
  // TODO: fix default searchOptions

  return (
    <Providers
      searchOptionsConfig={{ key: 'app', initialSearchOptions: searchOptions }}
    >
      <div className={styles.searchPage}>
        <h1 className={styles.title}>Next Movie...</h1>

        <div className={styles.body}>
          <MovieSearchOptions />

          <Movie movie={result.movie} />

          <div>
            <Link
              href={{
                pathname: `/app/${result.prevSeq}`,
                query: {
                  ...searchOptions
                }
              }}
            >
              Previous Movie
            </Link>

            <Link
              href={{
                pathname: `/app/${result.nextSeq}`,
                query: {
                  ...searchOptions
                }
              }}
            >
              Next Movie
            </Link>
          </div>
        </div>
      </div>
    </Providers>
  )
}
