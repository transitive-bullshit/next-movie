'use client'

import * as React from 'react'

import { Search } from '@/lib/hooks/search'

import styles from './styles.module.css'

export const MovieSearchOptions: React.FC = () => {
  const { searchOptions, setSearchOptions } = Search.useContainer()

  return (
    <div className={styles.movieSearchOptions}>
      <div>
        <input className={styles.query} value={searchOptions.query} />
      </div>

      <div>
        <input
          className={styles.releaseYearMin}
          value={`${searchOptions.releaseYearMin}`}
          maxLength={4}
        />

        <input
          className={styles.releaseYearMax}
          value={`${searchOptions.releaseYearMax}`}
          maxLength={4}
        />

        <input
          className={styles.imdbRatingMin}
          value={`${searchOptions.imdbRatingMin}`}
          maxLength={4}
        />

        <input
          type='checkbox'
          className={styles.foreign}
          checked={searchOptions.foreign}
        />
      </div>
    </div>
  )
}
