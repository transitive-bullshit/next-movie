import { notFound } from 'next/navigation'

import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { MovieSearchResults } from '@/components/MovieSearchResults/MovieSearchResults'
import { IMovieSearchOptions } from '@/lib/types'
import { getMovie } from '@/lib/next-movie'

import { Providers } from './providers'
import styles from './styles.module.css'

interface IAppSearchParams {
  seed?: string
  total?: string
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

  const result = await getMovie({
    seed: searchParams.seed,
    searchOptions,
    total,
    seq
  })

  // TODO: add genres to searchOptions and params

  // TODO: UI
  return (
    <Providers>
      <div className={styles.searchPage}>
        <h1 className={styles.title}>Next Movie...</h1>

        <div className={styles.body}>
          <MovieSearchOptions />

          <MovieSearchResults />
        </div>
      </div>
    </Providers>
  )
}
