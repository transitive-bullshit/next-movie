import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import { Layout } from '@/components/Layout/Layout'
import { Movie } from '@/components/Movie/Movie'
import { PageHead } from '@/components/PageHead/PageHead'
import { prisma } from '@/lib/prisma'
import { convertMovie } from '@/lib/utils'
import * as config from '@/lib/config'

import styles from './styles.module.css'

export default function MovieDetailPage({
  movie
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const pathname = movie ? `/titles/${movie?.id}` : undefined
  const imagePathname = movie
    ? `/api/titles/${movie?.id}/social-image`
    : undefined

  return (
    <Layout>
      <PageHead
        title={movie?.title || movie?.originalTitle || `${movie?.id}`}
        description={movie?.plot}
        pathname={pathname}
        imagePathname={imagePathname}
      />

      <div className={styles.container}>
        {movie && <Movie movie={movie} priority={true} />}
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({
  params
}: {
  params: { movieId: string }
}) => {
  const id = parseInt(params.movieId)
  if (!id || isNaN(id)) {
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

  const movie = await convertMovie(result)

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
