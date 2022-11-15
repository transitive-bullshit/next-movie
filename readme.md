<p align="center">
  <a href="https://next-movie.transitivebullsh.it">
    <img alt="Pick your next movie using Next.js 13" src="/public/social.jpg">
  </a>
</p>

<p align="center">
  Pick your next movie using Next.js 13
</p>

<p align="center">
  <a href="https://github.com/transitive-bullshit/next-movie/actions/workflows/test.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/next-movie/actions/workflows/test.yml/badge.svg"></a>
  <a href="https://github.com/transitive-bullshit/next-movie/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue"></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg"></a>
</p>

- [Intro](#intro)
- [Movie Database](#movie-database)
- [License](#license)

## Intro

TODO

## Movie Database

<p align="center">
  <a href="https://github.com/transitive-bullshit/populate-movies">
    <img alt="Populates a full database of movies from TMDB and IMDB into Postgres." src="https://raw.githubusercontent.com/transitive-bullshit/populate-movies/main/media/banner.jpg">
  </a>
</p>

<p align="center">
  Populates a full database of movies from TMDB and IMDB into Postgres.
</p>

Under the hood, `next-movie` uses [populate-movies](https://github.com/transitive-bullshit/populate-movies) to generate it's high quality movie database.

This accompanying OSS project features:

- 73k movies
- Metadata from TMDB, IMDB, and Rotten Tomatoes
- Easily automatable to keep metadata up-to-date
- Custom post-processing
  - Selects the best available YouTube trailer for every movie
  - Relevancy scores that use a combination of popularity, rating, and release date
  - Nuanced foreign movie detection that looks at more than just language/country
  - [LQIP](https://github.com/transitive-bullshit/lqip-modern) preview image generation for all movie images
  - Basic text index for searching

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my open source work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
