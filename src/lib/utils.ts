import * as types from '@/types'

export const normalizeTitle = (title?: string | null): string => {
  return (title || '')
    .normalize('NFD') // convert to ascii?
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9-\u4e00-\u9fa5]/g, '')
    .replace(/--/g, '-')
    .replace(/-+$/, '')
    .replace(/^-+/, '')
    .trim()
    .toLowerCase()
}

export function getMoviePathname(
  movie: types.MovieModel | types.Movie
): string {
  const title = normalizeTitle(movie.title || movie.originalTitle)
  const suffix = [
    `${movie.id}`,
    title,
    movie.releaseYear ? `${movie.releaseYear}` : null
  ]
    .filter(Boolean)
    .join('-')
  return `/titles/${suffix}`
}

export function parseMovieId(input: string = ''): number | null {
  const parts = input?.split('/') || []
  const lastPart = parts[parts.length - 1]
  if (!lastPart) return null

  const prefixParts = lastPart.split('-')
  const prefix = prefixParts[0]
  if (!prefix) return null

  if (!/^\d+$/.test(prefix)) return null

  const id = parseInt(prefix, 10)
  if (isNaN(id) || id < 0) return null

  return id
}
