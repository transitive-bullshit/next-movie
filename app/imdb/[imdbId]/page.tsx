import { notFound } from 'next/navigation'

import { Movie } from '@/components/Movie/Movie'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'
import { convertMovie } from '@/lib/utils'

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

  const result = await prisma.movie.findUnique({
    where: {
      imdbId
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
          <Movie movie={movie} />
        </div>
      </YouTubeDialog>
    </>
  )
}
