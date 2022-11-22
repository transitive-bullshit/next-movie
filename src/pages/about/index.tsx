import * as React from 'react'
import { InferGetStaticPropsType } from 'next'

import { Layout } from '@/components/Layout/Layout'
import { Markdown } from '@/components/Markdown/Markdown'
import * as config from '@/lib/config'
import { markdownToHtml } from '@/server/markdown-to-html'

import styles from './styles.module.css'

const markdownContent = `
## About

Building a better app for finding great movies has been on my proverbial todo list for awhile. With Next.js 13's paradigm shift, I thought it'd be the perfect time to build it and [open source my learnings along the way](https://github.com/transitive-bullshit/next-movie).

## App Features

- Advanced movie search by rating, genre, release date, etc
- All movies include **YouTube trailers**
- Most movies include **IMDB rating, RT audience score, and RT critic score**
- Supports grid view, list view, and single movie view
- High quality movie database

## Movie Database

<p align="center">
  <a href="https://github.com/transitive-bullshit/populate-movies">
    <img alt="Populates a full database of movies from TMDB and IMDB into Postgres." src="https://raw.githubusercontent.com/transitive-bullshit/populate-movies/main/media/banner.jpg" />
  </a>
</p>

Under the hood, this app uses [populate-movies](https://github.com/transitive-bullshit/populate-movies) to generate it's high quality movie database, featuring:

- ~73k movies (filtered from ~750k TMDB "movies")
- Metadata from TMDB, IMDB, and Rotten Tomatoes
- Automatable pipeline
- Custom post-processing
  - Selects the best available YouTube trailer for every movie
  - Relevancy scores using a combination of popularity, rating, and release date
  - Nuanced foreign movie detection that looks at more than just language/country
  - [LQIP](https://github.com/transitive-bullshit/lqip-modern) preview image generation for all movie images
  - Basic text index for searching
- Open source using TS + Prisma + Postgres

## License

This project is [open source](https://github.com/transitive-bullshit/next-movie). MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter</a>.

<br />

<p>
  <a href="https://developers.themoviedb.org/3/getting-started/introduction"><img alt="TMDB" src="/logos/tmdb.png" height="65"></a>
  &nbsp; &nbsp; &nbsp; &nbsp;
  <a href="https://www.imdb.com/interfaces/"><img alt="IMDB" src="/logos/imdb.png" height="65"></a>
  &nbsp; &nbsp; &nbsp; &nbsp;
  <a href="https://www.rottentomatoes.com"><img alt="Rotten Tomatoes" src="/logos/rt.png" height="65"></a>
</p>
`

export default function AboutPage({
  content
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className={styles.aboutPage}>
        <div className={styles.meta}>
          <h1 className={styles.title}>Next Movie</h1>
          <p className={styles.detail}>
            By{' '}
            <a
              href={config.twitterUrl}
              title={`Twitter ${config.twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              Travis Fischer
            </a>
          </p>
        </div>

        <Markdown content={content} />
      </div>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const content = await markdownToHtml(markdownContent)

  return {
    props: {
      content
    }
  }
}
