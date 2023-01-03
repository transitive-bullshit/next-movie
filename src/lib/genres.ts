import { IMovieSearchOptions } from '@/types'

export const genreLabelMap: Record<string, string> = {
  action: 'Action',
  adventure: 'Adventure',
  animation: 'Animation',
  biography: 'Biography',
  comedy: 'Comedy',
  crime: 'Crime',
  documentary: 'Documentary',
  drama: 'Drama',
  family: 'Family',
  fantasy: 'Fantasy',
  filmnoir: 'Film Noir',
  gameshow: 'Game Show',
  history: 'History',
  horror: 'Horror',
  music: 'Music',
  musical: 'Musical',
  mystery: 'Mystery',
  news: 'News',
  realitytv: 'Reality TV',
  romance: 'Romance',
  scifi: 'Science Fiction',
  sport: 'Sports',
  'stand-up': 'Stand Up',
  talkshow: 'Talk Show',
  thriller: 'Thriller',
  'tv-movie': 'TV Movie',
  war: 'War',
  western: 'Western'
}

export const genreTitleMap: Record<string, string> = {
  action: 'Action Flicks',
  adventure: 'Adventure Movies',
  animation: 'Animated Movies',
  biography: 'Biographies',
  comedy: 'Comedy Movies',
  crime: 'Crime Movies',
  documentary: 'Documentaries',
  drama: 'Drama Movies',
  family: 'Family Movies',
  fantasy: 'Fantasy Movies',
  filmnoir: 'Film Noir Movies',
  gameshow: 'Game Show Movies',
  history: 'History Movies',
  horror: 'Horror Movies',
  music: 'Music Movies',
  musical: 'Musicals',
  mystery: 'Mystery Movies',
  news: 'News Movies',
  realitytv: 'Reality TV Movies',
  romance: 'Romance Movies',
  scifi: 'Science Fiction Movies',
  sport: 'Sports Movies',
  'stand-up': 'Stand Up Specials',
  talkshow: 'Talk Show Movies',
  thriller: 'Thriller Movies',
  'tv-movie': 'TV Movies',
  war: 'War Movies',
  western: 'Westerns'
}

// don't show these genres in the dropdown menu
export const genresToIgnore = new Set<string>([
  'gameshow',
  'filmnoir',
  'news',
  'realitytv',
  'talkshow',
  'tv-movie'
])

export const genres = Object.keys(genreLabelMap)

export const defaultSearchOptionsByGenre: Record<string, IMovieSearchOptions> =
  Object.fromEntries(
    genres.map((genre) => [
      genre,
      {
        query: '',
        genres: [genre],
        foreign: false,
        orderBy: 'relevancyScore',
        layout: 'list'
      }
    ])
  )
