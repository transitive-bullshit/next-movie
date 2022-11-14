import { notFound } from 'next/navigation'

import { Movie } from '@/components/Movie/Movie'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'
import { convertMovie } from '@/lib/utils'

import styles from './styles.module.css'

export default async function MovieDetailPage({
  params
}: {
  params: { movieId: string }
}) {
  const id = parseInt(params.movieId)
  if (!id || isNaN(id)) {
    return notFound()
  }

  const result = await prisma.movie.findUnique({
    where: {
      id
    }
  })

  if (!result) {
    return notFound()
  }

  const movie = await convertMovie(result)

  return (
    <>
      <YouTubeDialog>
        <div className={styles.container}>
          <Movie movie={movie} priority />
        </div>
      </YouTubeDialog>
    </>
  )
}

export async function generateStaticParams() {
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

  return movies.map((movie) => ({
    movieId: `${movie.id}`
  }))
}
