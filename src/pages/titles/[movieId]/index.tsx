import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import * as config from '@/lib/config'
import { Layout } from '@/components/Layout/Layout'
import { Movie } from '@/components/Movie/Movie'
import { PageHead } from '@/components/PageHead/PageHead'
import { getMoviePathname, parseMovieId } from '@/lib/utils'
import { prisma } from '@/server/prisma'
import { convertMovie } from '@/server/utils'

import styles from './styles.module.css'

export default function MovieDetailPage({
  movie
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      {movie && (
        <>
          <PageHead
            title={movie.title || movie.originalTitle || `${movie.id}`}
            description={movie.plot}
            pathname={getMoviePathname(movie)}
            imagePathname={`/api/titles/${movie.id}/social-image`}
          />

          <div className={styles.container}>
            <Movie movie={movie} priority={true} />
          </div>
        </>
      )}
    </Layout>
  )
}

export const getStaticProps = async ({
  params
}: {
  params: { movieId: string }
}) => {
  const id = parseMovieId(params.movieId)
  if (!id) {
    return {
      notFound: true
    }
  }

  const result = await prisma.movie.findUnique({
    where: {
      id
    }
  })

  if (!result) {
    return {
      notFound: true
    }
  }

  const movie = convertMovie(result)

  return {
    props: {
      movie
    }
  }
}

export async function getStaticPaths() {
  if (config.isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const movies = await prisma.movie.findMany({
    select: {
      id: true
    },
    orderBy: {
      relevancyScore: 'desc'
    },
    // TODO
    take: 10
  })

  const paths = movies.map((movie) => ({
    params: {
      movieId: `${movie.id}`
    }
  }))

  return {
    paths,
    fallback: true
  }
}
