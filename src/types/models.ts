import type { Prisma, Movie, User, Account, UserMovie } from '@prisma/client'

export type { Prisma, Movie, User, Account, UserMovie }

// prisma's models use Dates which are not serializable, so we have to
// convert them before using them client-side
export interface MovieModel extends Omit<Movie, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
  userMovie: UserMovieModel | null
}

export interface UserMovieModel
  extends Omit<UserMovie, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

export type MovieWithUserMovies = Movie & { userMovies?: UserMovie[] }
export type UserMovieWithMovie = UserMovie & { movie: Movie }

// const userMovieWithMovie = Prisma.validator<Prisma.UserMovieArgs>()({
//   include: { movie: true },
// })
// type UserMovieWithMovie = Prisma.UserMovieGetPayload<typeof userMovieWithMovie>
