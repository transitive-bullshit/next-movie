import { notFound } from 'next/navigation'

import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { Movie } from '@/components/Movie/Movie'
import { githubRepoUrl } from '@/lib/config'
import { prisma } from '@/lib/prisma'

import { YouTubeDialog } from '../../../components/YouTubeDialog/YouTubeDialog'
import styles from './styles.module.css'

export default async function MovieDetailPage({
  params
}: {
  params: { movieId: string }
}) {
  const tmdbId = parseInt(params.movieId)
  if (!tmdbId || isNaN(tmdbId)) {
    return notFound()
  }

  const movie = await prisma.movie.findUnique({
    where: {
      tmdbId
    }
  })

  if (!movie) {
    return notFound()
  }

  return (
    <>
      <GitHubShareButton repoUrl={githubRepoUrl} />

      <YouTubeDialog>
        <div className={styles.movies}>
          <Movie movie={movie} />
        </div>
      </YouTubeDialog>
    </>
  )
}

export async function generateStaticParams() {
  const movies = await prisma.movie.findMany({
    select: {
      tmdbId: true
    }
  })

  return movies.map((movie) => ({
    movieId: `${movie.tmdbId}`
  }))
}
