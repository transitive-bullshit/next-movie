import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { Movie } from '@/components/Movie/Movie'
import { githubRepoUrl } from '@/lib/config'
import { prisma } from '@/lib/prisma'

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
    take: 10
  })

  return (
    <>
      <GitHubShareButton repoUrl={githubRepoUrl} />

      <div className={styles.movies}>
        <Movie movie={movies[1]} />
      </div>
    </>
  )
}
