import { MovieList } from '@/components/MovieList/MovieList'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'

export default async function HomePage() {
  let movies = await prisma.movie.findMany({
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
    take: 10,
    skip: 125
  })

  // convert dates to strings
  movies = JSON.parse(JSON.stringify(movies))

  return (
    <>
      <YouTubeDialog>
        <MovieList movies={movies} />
      </YouTubeDialog>
    </>
  )
}
