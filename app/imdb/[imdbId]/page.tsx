import { notFound } from 'next/navigation'

import { Movie } from '@/components/Movie/Movie'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'

import styles from './styles.module.css'

export default async function MovieDetailPage({
  params
}: {
  params: { imdbId: string }
}) {
  const { imdbId } = params
  if (!imdbId || !imdbId.startsWith('tt')) {
    return notFound()
  }

  let movie = await prisma.movie.findUnique({
    where: {
      imdbId
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
