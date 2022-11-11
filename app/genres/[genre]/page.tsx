import { notFound } from 'next/navigation'

import { MovieList } from '@/components/MovieList/MovieList'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { prisma } from '@/lib/prisma'
import { encodeGenre, decodeGenre, genres, genreLabelMap } from '@/lib/genres'

import styles from './styles.module.css'

export default async function GenrePage({
  params
}: {
  params: { genre: string }
}) {
  const { genre: genreInput } = params

  const genre = genreInput ? decodeGenre(genreInput) : null
  if (!genre) {
    return notFound()
  }

  const genreLabel = genreLabelMap[genre]
  if (!genreLabel) {
    return notFound()
  }

  let movies = await prisma.movie.findMany({
    where: {
      genres: {
        has: genre
      }
    },
    orderBy: {
      relevancyScore: 'desc'
    },
    take: 10,
    skip: 0
  })

  // convert dates to strings
  movies = JSON.parse(JSON.stringify(movies))

  return (
    <YouTubeDialog>
      <div className={styles.container}>
        <h1 className={styles.genre}>{genreLabel}</h1>

        <MovieList movies={movies} />
      </div>
    </YouTubeDialog>
  )
}

export async function generateStaticParams() {
  const genresSet = new Set<string>(genres)
  const uniqueGenres = Array.from(genresSet).sort()

  return uniqueGenres.map((genre) => ({ genre: encodeGenre(genre) }))
}
