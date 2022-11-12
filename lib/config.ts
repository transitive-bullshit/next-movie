import { IMovieSearchOptions } from './types'

export const environment = process.env.NODE_ENV || 'development'
export const isDev = environment === 'development'
export const isServer = typeof window === 'undefined'
export const isSafari =
  !isServer && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export const title = 'Next Movie'
export const description = 'TODO'
export const domain = 'next-movie.transitivebullsh.it'
export const author = 'Travis Fischer'
export const twitter = 'transitive_bs'
export const twitterUrl = `https://twitter.com/${twitter}`
export const githubRepoUrl = 'https://github.com/transitive-bullshit/next-movie'
export const copyright = `Copyright 2022 ${author}`
export const madeWithLove = 'Made with ❤️ in Brooklyn, NY'

export const port = process.env.PORT || '3000'
export const prodUrl = `https://${domain}`
export const url = isDev ? `http://localhost:${port}` : prodUrl

// these must all be absolute urls
export const socialImageUrl: string | null = null // `${prodUrl}/social.jpg`
export const bannerImageUrl: string | null = `${prodUrl}/banner.jpg`
export const twitterIconUrl: string | null = `${prodUrl}/icons/twitter.png`
export const githubIconUrl: string | null = `${prodUrl}/icons/github.png`

export const defaultSearchOptions: IMovieSearchOptions = {
  query: '',
  genres: [],
  releaseYearMin: 1972,
  imdbRatingMin: 7,
  foreign: false,
  orderBy: 'relevancyScore'
}
