import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { Movie } from '@/components/Movie/Movie'
import { githubRepoUrl } from '@/lib/config'
import { prisma } from '@/lib/prisma'

import { YouTubeDialog } from '../components/YouTubeDialog/YouTubeDialog'
import styles from './styles.module.css'

export default async function HomePage() {
  const movies = await prisma.movie.findMany({
    where: {
      imdbRating: {
        gte: 6
      },
      releaseYear: {
        gte: 1972
      },
      relevancyScore: {
        gte: 31000
      },
      foreign: false,
      NOT: {
        genres: {
          hasSome: ['stand up', 'documentary', 'short']
        }
      }
    },
    orderBy: {
      relevancyScore: 'desc'
    },
    take: 100
  })

  return (
    <>
      <GitHubShareButton repoUrl={githubRepoUrl} />

      <YouTubeDialog>
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie key={movie.tmdbId} movie={movie} />
          ))}
        </div>
      </YouTubeDialog>
    </>
  )
}
