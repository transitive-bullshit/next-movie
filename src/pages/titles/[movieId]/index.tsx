import * as React from 'react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'

import * as config from '@/lib/config'
import * as types from '@/types'
import { Layout } from '@/components/Layout/Layout'
import { Movie } from '@/components/Movie/Movie'
import { PageHead } from '@/components/PageHead/PageHead'
import { getMoviePathname, parseMovieId } from '@/lib/utils'
import { getServerSession } from '@/server/auth'
import { prisma } from '@/server/prisma'
import { convertMovie } from '@/server/utils'

import styles from './styles.module.css'

export default function MovieDetailPage({
  movie
}: {
  movie: types.MovieModel
}) {
  return (
    <Layout>
      {movie && (
        <>
          <PageHead
            title={movie.title || movie.originalTitle || `${movie.id}`}
            description={movie.plot}
            pathname={getMoviePathname(movie)}
            imagePathname={`/api/titles/${movie.id}/social-image`}
          />

          <div className={styles.container}>
            <EditableMovie movie={movie} />
          </div>
        </>
      )}
    </Layout>
  )
}

function EditableMovie({ movie: initialMovie }: { movie: types.MovieModel }) {
  const [movie, setMovie] = React.useState(initialMovie)

  const mutateUserMovie = React.useCallback<types.MutateUserMovieFn>(
    async (userMovie) => {
      const { movieId, ...patch } = userMovie

      const update = await fetch(`/api/titles/${movieId}/user-movie`, {
        method: 'POST',
        body: JSON.stringify(patch),
        headers: {
          'content-type': 'application/json'
        }
      }).then((res) => res.json())

      setMovie((movie) => ({
        ...movie,
        userMovie: update
      }))
    },
    []
  )

  return (
    <div className={styles.container}>
      <Movie movie={movie} priority={true} mutateUserMovie={mutateUserMovie} />
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = parseMovieId(context.params?.movieId as string)
  if (!id) {
    return {
      notFound: true
    }
  }

  const session = await getServerSession(context.req, context.res)
  const include: types.Prisma.MovieInclude | undefined = session?.user?.id
    ? {
        userMovies: {
          where: {
            userId: session.user.id
          }
        }
      }
    : undefined

  const result = await prisma.movie.findUnique({
    where: {
      id
    },
    include
  })

  if (!result) {
    return {
      notFound: true
    }
  }

  const movie = convertMovie(result)

  if (!session) {
    const ttlSeconds = 60 * 60 * 24 // one day
    context.res.setHeader(
      'Cache-Control',
      `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds}`
    )
  }

  return {
    props: {
      movie
    }
  }
}

// export async function getStaticPaths() {
//   if (config.isDev) {
//     return {
//       paths: [],
//       fallback: true
//     }
//   }

//   const movies = await prisma.movie.findMany({
//     select: {
//       id: true
//     },
//     orderBy: {
//       relevancyScore: 'desc'
//     },
//     // TODO
//     take: 10
//   })

//   const paths = movies.map((movie) => ({
//     params: {
//       movieId: `${movie.id}`
//     }
//   }))

//   return {
//     paths,
//     fallback: true
//   }
// }
