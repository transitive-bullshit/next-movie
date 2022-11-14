import { MovieList } from '@/components/MovieList/MovieList'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'
import { convertMovies } from '@/lib/utils'

export default async function HomePage() {
  const results = await prisma.movie.findMany({
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
          // hasSome: ['stand up', 'short']
        }
      }
    },
    orderBy: {
      relevancyScore: 'desc'
    },
    take: 10,
    skip: 0
  })

  const movies = await convertMovies(results)

  return (
    <>
      <YouTubeDialog>
        <MovieList movies={movies} />
      </YouTubeDialog>
    </>
  )
}
