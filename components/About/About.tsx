import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import cs from 'clsx'

import styles from './styles.module.css'

const content = `
## About

Building a better app for finding great movies has been on my proverbial todo list for awhile. With Next.js 13's paradigm shift, I thought it'd be the perfect time to build it and [open source my learnings along the way](https://github.com/transitive-bullshit/next-movie).

## App Features

- Advanced movie search by rating, genre, release date, etc
- All movies include **YouTube trailers**
- Most movies include **IMDB rating, RT audience score, and RT critic score**
- Supports grid view, list view, and single movie view
- Polished UX
- High quality movie database

## Implementation Features

- New \`/app\` dir
- Blurred image placeholders
- Dynamic OG images
- Dark mode
- Hosted on **Vercel**
- ORM using **Prisma** + **Postgres**
- UI components built using **Radix UI**
- Styled using **CSS Modules**
- Data fetching using **SWR**
- Validations using **Zod**
- Written in **TypeScript**
- Fully **Open Source**

## Screenshots

#### List View

<p align="center">
  <img alt="List view dark mode" src="https://raw.githubusercontent.com/transitive-bullshit/next-movie/main/public/images/list-view-dark.jpg" width="45%" />
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="List view light mode" src="https://raw.githubusercontent.com/transitive-bullshit/next-movie/main/public/images/list-view-light.jpg" width="45%" />
</p>

#### Grid View

<p align="center">
  <img alt="Grid view dark mode" src="https://raw.githubusercontent.com/transitive-bullshit/next-movie/main/public/images/grid-view-dark.jpg" width="45%" />
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Grid view light mode" src="https://raw.githubusercontent.com/transitive-bullshit/next-movie/main/public/images/grid-view-light.jpg" width="45%" />
</p>

#### Single Movie View

<p align="center">
  <img alt="Single movie view dark mode" src="https://raw.githubusercontent.com/transitive-bullshit/next-movie/main/public/images/single-view-dark.jpg" width="45%" />
&nbsp; &nbsp; &nbsp; &nbsp;
  <img alt="Single movie view light mode" src="https://raw.githubusercontent.com/transitive-bullshit/next-movie/main/public/images/single-view-light.jpg" width="45%" />
</p>

## Roadmap

> **Warning**
> This app is a work in progress. I'm building this in public. You can follow the progress on Twitter [@transitive_bs](https://twitter.com/transitive_bs).

- [x] [Movie database](https://github.com/transitive-bullshit/populate-movies)
- [x] Search functionality
- [x] Grid view
- [x] List view
- [x] Single view (original idea for browsing movies using a "next movie" button)
- [x] Dynamic OG images for movies
- [x] Dynamic OG images for genres
- [x] Dark mode
- [ ] About page
- [ ] Mobile friendly
- [ ] Add top X movies pages

Post-v1.0:

- [ ] Streaming service availability + filters
- [ ] Weight single view movie selection by \`relevancyScore\`
- [ ] Better movie detail page design
- [ ] Person detail page
- [ ] User auth and accounts
  - [ ] Watchlist
  - [ ] Seen list + user ratings
- [ ] Automate scripts to keep movie DB up-to-date
- [ ] Improve access to Rotten Tomatoes metadata

## Movie Database

<p align="center">
  <a href="https://github.com/transitive-bullshit/populate-movies">
    <img alt="Populates a full database of movies from TMDB and IMDB into Postgres." src="https://raw.githubusercontent.com/transitive-bullshit/populate-movies/main/media/banner.jpg" />
  </a>
</p>

Under the hood, \`next-movie\` uses [populate-movies](https://github.com/transitive-bullshit/populate-movies) to generate it's high quality movie database, featuring:

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

This project is [open source](https://github.com/transitive-bullshit/next-movie).

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by [sponsoring me](https://github.com/sponsors/transitive-bullshit) or <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>

<p>
  <a href="https://developers.themoviedb.org/3/getting-started/introduction"><img alt="TMDB" src="/logos/tmdb.png" height="65"></a>
  &nbsp; &nbsp; &nbsp; &nbsp;
  <a href="https://www.imdb.com/interfaces/"><img alt="IMDB" src="/logos/imdb.png" height="65"></a>
  &nbsp; &nbsp; &nbsp; &nbsp;
  <a href="https://www.rottentomatoes.com"><img alt="Rotten Tomatoes" src="/logos/rt.png" height="65"></a>
</p>
`

export const About: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cs(styles.about, className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
