import { type IMovieSearchOptions, type IMovieSearchLayout } from '@/types'

export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'Next Movie'
export const description =
  'Find your next favorite movie using Next.js 13. Search by IMDB rating, Rotten Tomatoes score, release year, and more.'
export const domain = 'next-movie-test.transitivebullsh.it'
console.warn('TODO: revert domain to prod')

export const author = 'Travis Fischer'
export const twitter = 'transitive_bs'
export const twitterUrl = `https://twitter.com/${twitter}`
export const githubRepoUrl = 'https://github.com/transitive-bullshit/next-movie'
export const copyright = `Copyright 2022 ${author}`
export const madeWithLove = 'Made with ❤️ in Brooklyn, NY'

export const port = process.env.PORT || '3000'
export const prodUrl = `https://${domain}`
export const url = isDev ? `http://localhost:${port}` : prodUrl

export const apiBaseUrl =
  isDev || !process.env.VERCEL_URL ? url : `https://${process.env.VERCEL_URL}`

// these must all be absolute urls
export const socialImageUrl = `${url}/social.jpg`
export const socialImageBgUrl = `${url}/social-image-bg.jpg`
export const socialIconUrl = `${url}/icon.svg`
export const bannerImageUrl = `${prodUrl}/banner.jpg`
export const twitterIconUrl = `${prodUrl}/icons/twitter.png`
export const githubIconUrl = `${prodUrl}/icons/github.png`

// ----------------------------------------------------------------------------

export const defaultSearchOptions: IMovieSearchOptions = {
  query: '',
  genres: [],
  releaseYearMin: 1972,
  imdbRatingMin: 7,
  foreign: false,
  orderBy: 'relevancyScore',
  layout: 'list'
}

export const layoutToDefaultPageSize: Record<IMovieSearchLayout, number> = {
  grid: 50,
  list: 10,
  single: 1
}
