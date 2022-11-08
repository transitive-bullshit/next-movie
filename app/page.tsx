import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { githubRepoUrl } from '@/lib/config'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  const res = await prisma.movie.findMany({
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
    select: {
      title: true,
      releaseYear: true,
      releaseDate: true,
      imdbRating: true,
      imdbVotes: true,
      tmdbPopularity: true,
      imdbCustomPopularity: true,
      relevancyScore: true
    },
    orderBy: {
      relevancyScore: 'desc'
    }
  })

  return (
    <>
      <GitHubShareButton repoUrl={githubRepoUrl} />

      <p>TODO</p>
    </>
  )
}
