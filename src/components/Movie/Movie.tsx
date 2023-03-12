import * as React from 'react'
import Image from '@next-static/image'
import cs from 'clsx'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ms from 'pretty-ms'

import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { YouTubeButton } from '@/components/YouTubeButton/YouTubeButton'
import { Star } from '@/icons/Star'
import { isDev } from '@/lib/config'
import { dequal } from '@/lib/dequal'
import { genreLabelMap } from '@/lib/genres'
import imdbLogoImage from '@/public/logos/imdb.png'
import type { MovieModel, MutateUserMovieFn } from '@/types'

import { UserMovieIgnoreButton } from './UserMovieIgnoreButton'
import { UserMoviePopover } from './UserMoviePopover'
import { UserMovieWatchlistButton } from './UserMovieWatchlistButton'
import styles from './styles.module.css'

const rtCriticScoreEmptyImage = '/images/rt-critics-empty.svg'
const rtCriticScoreFreshImage = '/images/rt-critics-fresh.svg'
const rtCriticScoreCertifiedFreshImage =
  '/images/rt-critics-certified-fresh.svg'
const rtCriticScoreRottenImage = '/images/rt-critics-rotten.svg'

const rtAudienceScoreEmptyImage = '/images/rt-audience-empty.svg'
const rtAudienceScoreFreshImage = '/images/rt-audience-fresh.svg'
const rtAudienceScoreRottenImage = '/images/rt-audience-rotten.svg'

function getApproxHumanizedNumVotes(numVotes: number | null) {
  if (!numVotes) {
    return ''
  }

  const numDigits = (Math.log(numVotes) * Math.LOG10E + 1) | 0
  const temp = Math.pow(10, numDigits - 1)
  const floor = Math.floor(numVotes / temp)
  const approx = (floor * temp) | 0
  let humanizedApprox = approx.toLocaleString('en-US')

  if (numVotes > approx) {
    humanizedApprox += '+'
  }

  return humanizedApprox
}

export type MovieVariants = 'normal' | 'slim'

export type MovieProps = {
  movie: MovieModel
  priority?: boolean
  variant?: MovieVariants
  mutateUserMovie?: MutateUserMovieFn
}

function areMoviePropsEqual(propsA: MovieProps, propsB: MovieProps): boolean {
  return (
    propsA.movie.id === propsB.movie.id &&
    propsA.priority === propsB.priority &&
    propsA.variant === propsB.variant &&
    dequal(propsA.movie.userMovie, propsB.movie.userMovie)
    // TODO: mutateUserMovieFn?
  )
}

export const Movie: React.FC<MovieProps> = React.memo(
  React.forwardRef(function Movie(
    { movie, priority, variant = 'normal', mutateUserMovie },
    ref
  ) {
    const rtAudienceVotesApprox = getApproxHumanizedNumVotes(
      movie.rtAudienceVotes
    )
    const imdbVotesApprox = getApproxHumanizedNumVotes(movie.imdbVotes)

    let rtCriticScoreImage = rtCriticScoreEmptyImage
    let rtAudienceScoreImage = rtAudienceScoreEmptyImage

    if (movie.rtCriticRating) {
      if (movie.rtCriticVotes! >= 5) {
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
      if (movie.rtAudienceVotes! >= 50) {
        if (movie.rtAudienceRating >= 60) {
          rtAudienceScoreImage = rtAudienceScoreFreshImage
        } else {
          rtAudienceScoreImage = rtAudienceScoreRottenImage
        }
      }
    }

    return (
      <motion.div
        className={cs(styles.movie, styles[`variant-${variant}`])}
        initial={{ scale: 0, translateY: -50 }}
        animate={{ scale: 1, translateY: 0 }}
        exit={{ scale: 0, translateY: 50 }}
        ref={ref as any}
      >
        {/* <div className={styles.backdropWrapper}>
        {movie.backdropUrl && (
          <Image
            className={styles.backdrop}
            src={movie.backdropUrl}
            alt={movie.title}
            width={movie.backdropWidth!}
            height={movie.backdropHeight!}
            sizes='(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 10vw'
            unoptimized
          />
        )}

        <div className={styles.overlay} />
      </div> */}

        <div className={styles.lhs}>
          <ActiveLink href={movie.pathname}>
            <div className={styles.frame}>
              {movie.posterUrl ? (
                <Image
                  className={styles.poster}
                  src={movie.posterUrl}
                  alt={movie.title}
                  width={movie.posterWidth!}
                  height={movie.posterHeight!}
                  sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
                  placeholder={movie.posterPlaceholderUrl ? 'blur' : 'empty'}
                  blurDataURL={movie.posterPlaceholderUrl || undefined}
                  priority={priority}
                  unoptimized
                />
              ) : (
                <div className={cs(styles.poster, styles.emptyPoster)} />
              )}
            </div>
          </ActiveLink>
        </div>

        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.leftHeader}>
              <ActiveLink className={styles.title} href={movie.pathname}>
                <h3>{movie.title}</h3>
              </ActiveLink>

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

            <div className={styles.rightHeader}>
              {movie.trailerYouTubeId && <YouTubeButton movie={movie} />}
            </div>
          </div>

          <div className={styles.body}>
            <div className={styles.lh}>
              <div className={cs(styles.plot, priority && styles.expanded)}>
                {movie.plot}
              </div>

              <div className={styles.metadata}>
                <div className={styles.genresLabel}>Genres</div>

                <div className={styles.genres}>
                  {movie.genres.map((genre) => (
                    <Link
                      key={genre}
                      href={`/genres/${genre}`}
                      className={styles.genre}
                    >
                      {genreLabelMap[genre] ?? genre}
                    </Link>
                  ))}
                </div>

                {movie.director && (
                  <>
                    <div className={cs(styles.label, styles.directorLabel)}>
                      Director
                    </div>

                    <div className={styles.director}>{movie.director}</div>
                  </>
                )}

                {movie.cast?.length ? (
                  <>
                    <div className={cs(styles.label, styles.castLabel)}>
                      Cast
                    </div>

                    <div className={styles.cast}>
                      {movie.cast.map((person, index) => (
                        <div key={person} className={styles.person}>
                          {person}
                          {index < movie.cast.length - 1 ? ',' : ''}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {isDev && (
                  <>
                    <div className={styles.label}>Score</div>

                    <div>
                      {(movie.relevancyScore! | 0).toLocaleString('en-US')}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={styles.rh}>
              <div className={styles.ratingsGrid}>
                {movie.imdbRating !== null && (
                  <>
                    <Star className={cs(styles.imdbStar, styles.ratingIcon)} />

                    <div className={cs(styles.imdbRatingValue0, styles.rating)}>
                      <span className={styles.imdbRatingValue1}>
                        {movie.imdbRating.toFixed(1)}
                      </span>
                    </div>

                    <Link
                      href={`https://www.imdb.com/title/${movie.imdbId}`}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={cs(styles.imdbLogoLink, styles.ratingLink)}
                    >
                      <Image
                        className={styles.imdbLogo}
                        src={imdbLogoImage.src}
                        alt='IMDB'
                        sizes='96px'
                        width={imdbLogoImage.width}
                        height={imdbLogoImage.height}
                        unoptimized
                      />

                      {imdbVotesApprox !== null && (
                        <span className={styles.detail}>
                          {imdbVotesApprox} ratings
                        </span>
                      )}
                    </Link>
                  </>
                )}

                {movie.rtUrl && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={cs(styles.rtRatingImage, styles.ratingIcon)}
                      src={rtCriticScoreImage}
                      alt='Rotten Tomatoes Critic Score'
                      loading='lazy'
                      decoding='async'
                    />

                    <div className={cs(styles.rtRatingValue, styles.rating)}>
                      {rtCriticScoreImage === rtCriticScoreEmptyImage
                        ? '- -'
                        : `${movie.rtCriticRating}%`}
                    </div>

                    <Link
                      href={movie.rtUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={cs(styles.score, styles.ratingLink)}
                    >
                      Critic Score
                      {movie.rtCriticVotes !== null && (
                        <span className={styles.detail}>
                          {movie.rtCriticVotes} reviews
                        </span>
                      )}
                    </Link>
                  </>
                )}

                {movie.rtUrl && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={cs(styles.rtRatingImage, styles.ratingIcon)}
                      src={rtAudienceScoreImage}
                      alt='Rotten Tomatoes Audience Score'
                      loading='lazy'
                      decoding='async'
                    />

                    <div className={cs(styles.rtRatingValue, styles.rating)}>
                      {rtAudienceScoreImage === rtAudienceScoreEmptyImage
                        ? '- -'
                        : `${movie.rtAudienceRating}%`}
                    </div>

                    <Link
                      href={movie.rtUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={cs(styles.score, styles.ratingLink)}
                    >
                      Audience Score
                      {rtAudienceVotesApprox !== null && (
                        <span className={styles.detail}>
                          {rtAudienceVotesApprox} ratings
                        </span>
                      )}
                    </Link>
                  </>
                )}
              </div>

              {mutateUserMovie && (
                <div className='flex gap-4 w-full justify-around md:justify-end'>
                  <UserMovieIgnoreButton
                    movie={movie}
                    mutateUserMovie={mutateUserMovie}
                  />

                  <UserMovieWatchlistButton
                    movie={movie}
                    mutateUserMovie={mutateUserMovie}
                  />

                  <UserMoviePopover
                    movie={movie}
                    mutateUserMovie={mutateUserMovie}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }),
  areMoviePropsEqual
)
