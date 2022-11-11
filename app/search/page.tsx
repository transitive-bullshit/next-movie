import { MovieList } from '@/components/MovieList/MovieList'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'

interface IMovieSearchOptions {
  imdbRatingMin?: number
  imdbRatingMax?: number
  releaseYearMin?: number
  releaseYearMax?: number
  foreign?: boolean
  genres?: string[]

  relevancyScoreMin?: number
  relevancyScoreMax?: number

  orderBy?: string
  take?: number
  skip?: number
}

export default async function SearhPage() {
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
    skip: 100
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
