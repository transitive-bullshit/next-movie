import { PageHead } from '@/components/PageHead/PageHead'
import { decodeGenre, genreLabelMap } from '@/lib/genres'

export default function Head({ params }: { params: { genre: string } }) {
  const { genre: genreInput } = params

  const genre = genreInput ? decodeGenre(genreInput) : null
  if (!genre) {
    return
  }

  const genreLabel = genreLabelMap[genre]
  if (!genreLabel) {
    return
  }

  const pathname = `/genres/${genreInput}`
  return (
    <PageHead
      title={genreLabel}
      description={`${genreLabel} movies`}
      pathname={pathname}
    />
  )
}
