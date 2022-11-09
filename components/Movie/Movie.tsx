import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ms from 'pretty-ms'

import type { MovieModel } from '@/lib/models'
import imdbLogoImage from '@/public/logos/imdb.png'

import styles from './styles.module.css'
import { Star } from '@/icons/Star'

const rtCriticScoreEmptyImage = '/images/rt-critics-empty.svg'
const rtCriticScoreFreshImage = '/images/rt-critics-fresh.svg'
const rtCriticScoreCertifiedFreshImage =
  '/images/rt-critics-certified-fresh.svg'
const rtCriticScoreRottenImage = '/images/rt-critics-rotten.svg'

const rtAudienceScoreEmptyImage = '/images/rt-audience-empty.svg'
const rtAudienceScoreFreshImage = '/images/rt-audience-fresh.svg'
const rtAudienceScoreRottenImage = '/images/rt-audience-rotten.svg'

const genreMap: Record<string, string> = {
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
  filmnoir: 'Film noir',
  gameshow: 'Game show',
  history: 'History',
  horror: 'Horror',
  music: 'Music',
  musical: 'Musical',
  mystery: 'Mystery',
  news: 'News',
  realitytv: 'Reality TV',
  romance: 'Romance',
  scifi: 'Science fiction',
  sport: 'Sports',
  'stand up': 'Stand up',
  talkshow: 'Talk show',
  thriller: 'Thriller',
  'tv movie': 'TV movie',
  war: 'War',
  western: 'Western'
}

function getApproxHumanizedNumVotes(numVotes: number | null) {
  if (!numVotes) {
    return ''
  }

  const numDigits = (Math.log(numVotes) * Math.LOG10E + 1) | 0
  const temp = Math.pow(10, numDigits - 1)
  const floor = Math.floor(numVotes / temp)
  const approx = (floor * temp) | 0
  let humanizedApprox = approx.toLocaleString()

  if (numVotes > approx) {
    humanizedApprox += '+'
  }

  return humanizedApprox
}

export const Movie: React.FC<{
  movie: MovieModel
}> = ({ movie }) => {
  const rtAudienceVotesApprox = getApproxHumanizedNumVotes(
    movie.rtAudienceVotes
  )
  const imdbVotesApprox = getApproxHumanizedNumVotes(movie.imdbVotes)

  let rtCriticScoreImage = rtCriticScoreEmptyImage
  let rtAudienceScoreImage = rtAudienceScoreEmptyImage

  if (movie.rtCriticRating) {
    if (movie.rtCriticVotes! > 50) {
      if (movie.rtCriticRating >= 90) {
        rtCriticScoreImage = rtCriticScoreCertifiedFreshImage
      } else if (movie.rtCriticRating >= 60) {
        rtCriticScoreImage = rtCriticScoreFreshImage
      } else {
        rtCriticScoreImage = rtCriticScoreRottenImage
      }
    }
  }

  if (movie.rtAudienceRating) {
    if (movie.rtAudienceVotes! > 50) {
      if (movie.rtAudienceRating >= 60) {
        rtAudienceScoreImage = rtAudienceScoreFreshImage
      } else {
        rtAudienceScoreImage = rtAudienceScoreRottenImage
      }
    }
  }

  return (
    <div className={styles.movie}>
      <div className={styles.backdropWrapper}>
        {movie.backdropUrl && (
          <Image
            className={styles.backdrop}
            src={movie.backdropUrl}
            alt={movie.title}
            sizes='"(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 10vw"'
            fill
          />
        )}

        <div className={styles.overlay} />
      </div>

      <div className={styles.lhs}>
        {movie.posterUrl && (
          <div className={styles.frame}>
            <Image
              className={styles.poster}
              src={movie.posterUrl}
              alt={movie.title}
              sizes='"(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"'
              fill
            />
          </div>
        )}
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h3 className={styles.title}>{movie.title}</h3>

          <div className={styles.subHeader}>
            {movie.releaseYear && (
              <div className={styles.releaseYear}>{movie.releaseYear}</div>
            )}

            {movie.mpaaRating && (
              <div className={styles.mpaaRating}>{movie.mpaaRating}</div>
            )}

            {movie.runtime && (
              <div className={styles.runtime}>
                {ms(movie.runtime * 60 * 1000)}
              </div>
            )}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.lh}>
            <div className={styles.plot}>{movie.plot}</div>

            <div className={styles.metadata}>
              <div>Genres</div>

              <div className={styles.genres}>
                {movie.genres.map((genre) => (
                  <Link
                    key={genre}
                    href={`/genres/${encodeURIComponent(genre)}`}
                    className={styles.genre}
                  >
                    {genreMap[genre] ?? genre}
                  </Link>
                ))}
              </div>

              {movie.director && (
                <>
                  <div className={styles.label}>Director</div>

                  <div className={styles.director}>{movie.director}</div>
                </>
              )}

              {movie.cast?.length && (
                <>
                  <div className={styles.label}>Cast</div>

                  <div className={styles.cast}>
                    {movie.cast.map((person, index) => (
                      <div key={person} className={styles.person}>
                        {person}
                        {index < movie.cast.length - 1 ? ',' : ''}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={styles.rh}>
            <div className={styles.ratingsGrid}>
              {movie.imdbRating !== null && (
                <>
                  <Star className={styles.imdbStar} />

                  <div className={styles.imdbRatingValue0}>
                    <span className={styles.imdbRatingValue1}>
                      {movie.imdbRating.toFixed(1)}
                    </span>
                  </div>

                  <Link
                    href={`https://www.imdb.com/title/${movie.imdbId}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.imdbLogoLink}
                  >
                    <Image
                      className={styles.imdbLogo}
                      src={imdbLogoImage.src}
                      blurDataURL={imdbLogoImage.blurDataURL}
                      placeholder='blur'
                      alt='IMDB'
                      sizes='96px'
                      width={imdbLogoImage.width}
                      height={imdbLogoImage.height}
                    />

                    {imdbVotesApprox && (
                      <div className={styles.detail}>
                        {imdbVotesApprox} ratings
                      </div>
                    )}
                  </Link>
                </>
              )}

              {movie.rtCriticRating && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.rtRatingImage}
                    src={rtCriticScoreImage}
                    alt='Rotten Tomatoes Critic Score'
                  />

                  <div className={styles.rtRatingValue}>
                    {rtCriticScoreImage === rtCriticScoreEmptyImage
                      ? '- -'
                      : `${movie.rtCriticRating}%`}
                  </div>

                  <Link
                    href={movie.rtUrl || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.score}
                  >
                    Critic Score
                    {movie.rtCriticVotes && (
                      <div className={styles.detail}>
                        {movie.rtCriticVotes} reviews
                      </div>
                    )}
                  </Link>
                </>
              )}

              {movie.rtAudienceRating && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.rtRatingImage}
                    src={rtAudienceScoreImage}
                    alt='Rotten Tomatoes Audience Score'
                  />

                  <div className={styles.rtRatingValue}>
                    {rtAudienceScoreImage === rtAudienceScoreEmptyImage
                      ? '- -'
                      : `${movie.rtAudienceRating}%`}
                  </div>

                  <Link
                    href={movie.rtUrl || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.score}
                  >
                    Audience Score
                    {rtAudienceVotesApprox && (
                      <div className={styles.detail}>
                        {rtAudienceVotesApprox} ratings
                      </div>
                    )}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
