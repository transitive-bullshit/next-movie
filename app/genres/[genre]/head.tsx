import { PageHead } from '@/components/PageHead/PageHead'
import { genreTitleMap } from '@/lib/genres'

export default function Head({ params }: { params: { genre: string } }) {
  const { genre } = params

  if (!genre) {
    return
  }

  const genreTitle = genreTitleMap[genre]
  if (!genreTitle) {
    return
  }

  const pathname = `/genres/${genre}`
  const imagePathname = `/api/genres/${genre}/social-image`

  return (
    <PageHead
      title={genreTitle}
      description={`The top ${genreTitle.toLowerCase()} of all time.`}
      pathname={pathname}
      imagePathname={imagePathname}
    />
  )
}
