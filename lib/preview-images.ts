import got from 'got'
import lqip from 'lqip-modern'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import * as types from './types'
import { keyv } from './keyv'

export interface CachedPreviewImage {
  w: number
  h: number
  u: string
}

export async function enrichMoviesWithPreviewImages(
  movies: types.MovieModel[]
) {
  await pMap(
    movies,
    async (movie) => {
      if (movie.posterUrl) {
        const url = movie.posterUrl
        const cacheKey = getCacheKey(url)
        const previewImage = await getPreviewImage({ url, cacheKey })

        movie.posterPlaceholderURL = previewImage?.dataURIBase64
      }
    },
    {
      concurrency: 8
    }
  )
}

async function createPreviewImage({
  url,
  cacheKey
}: {
  url: string
  cacheKey: string
}): Promise<types.PreviewImage | null> {
  try {
    try {
      const cachedPreviewImage = await keyv.get(cacheKey)
      if (cachedPreviewImage) {
        return {
          originalWidth: cachedPreviewImage.w,
          originalHeight: cachedPreviewImage.h,
          dataURIBase64: cachedPreviewImage.u
        }
      }
    } catch (err: any) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, err.message)
    }

    const { body } = await got(url, { responseType: 'buffer' })
    const result = await lqip(body)
    console.log('lqip', { ...result.metadata, url, cacheKey })

    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64
    }

    const cachedPreviewImage = {
      w: previewImage.originalWidth,
      h: previewImage.originalHeight,
      u: previewImage.dataURIBase64
    }

    try {
      await keyv.set(cacheKey, cachedPreviewImage)
    } catch (err: any) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, err.message)
    }

    return previewImage
  } catch (err: any) {
    console.warn('failed to create preview image', url, err.message)
    return null
  }
}

export const getPreviewImage = pMemoize(createPreviewImage, {
  cacheKey: (args: Parameters<typeof createPreviewImage>) => args[0].cacheKey
})

export function getCacheKey(url: string) {
  const parsed = new URL(url)

  if (parsed.hostname === 'image.tmdb.org') {
    const parts = parsed.pathname.split('/')
    return parts[parts.length - 1]
  } else {
    return url
  }
}
