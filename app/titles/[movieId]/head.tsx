import { PageHead } from '@/components/PageHead/PageHead'
import { prisma } from '@/lib/prisma'

export default async function Head({
  params
}: {
  params: { movieId: string }
}) {
  const id = parseInt(params.movieId)
  if (!id || isNaN(id)) {
    return
  }

  const movie = await prisma.movie.findUnique({
    where: {
      id
    }
  })

  const pathname = `/titles/${id}`
  const imagePathname = `/api/titles/${id}/social-image`

  return (
    <PageHead
      title={movie?.title || movie?.originalTitle || `${id}`}
      description={movie?.plot}
      pathname={pathname}
      imagePathname={imagePathname}
    />
  )
}
