import { PageHead } from '@/components/PageHead/PageHead'
import { genreLabelMap } from '@/lib/genres'

export default function Head({ params }: { params: { genre: string } }) {
  const { genre } = params

  if (!genre) {
    return
  }

  const genreLabel = genreLabelMap[genre]
  if (!genreLabel) {
    return
  }

  const pathname = `/genres/${genre}`
  return (
    <PageHead
      title={genreLabel}
      description={`The top ${genreLabel} movies of all time.`}
      pathname={pathname}
    />
  )
}
