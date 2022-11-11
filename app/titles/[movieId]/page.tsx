import { notFound } from 'next/navigation'

import { Movie } from '@/components/Movie/Movie'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'

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

  let movie = await prisma.movie.findUnique({
    where: {
      id
    }
  })

  // convert dates to strings
  movie = JSON.parse(JSON.stringify(movie))

  if (!movie) {
    return notFound()
  }

  return (
    <>
      <YouTubeDialog>
        <div className={styles.container}>
          <Movie movie={movie} />
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
    take: 500
  })

  return movies.map((movie) => ({
    movieId: `${movie.id}`
  }))
}
