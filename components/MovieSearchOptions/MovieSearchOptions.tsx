'use client'

import * as React from 'react'
import Select from 'react-select'
import cs from 'clsx'

import * as Checkbox from '@radix-ui/react-checkbox'

import { genres, genreLabelMap } from '@/lib/genres'
import { SearchIcon } from '@/icons/Search'
import { CheckIcon } from '@/icons/Check'
import { SearchOptions } from '@/lib/hooks/search-options'

import styles from './styles.module.css'

const genreOptions = genres.map((genre) => ({
  value: genre,
  label: genreLabelMap[genre]
}))

const minYear = 1900
const maxYear = 2022

const yearOptions = [...new Array(maxYear - minYear + 1)]
  .map((_, index) => ({
    value: minYear + index,
    label: `${minYear + index}`
  }))
  .reverse()

const imdbRatingOptions = [
  6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5,
  7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9, 9.1,
  9.2, 9.3, 9.4, 9.5
]
  .map((value) => ({
    value,
    label: value.toFixed(1)
  }))
  .reverse()

const selectStyles: any = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#24292f'
  }),
  control: (provided: any) => ({
    ...provided,
    height: '100%'
  })
}

export const MovieSearchOptions: React.FC = () => {
  const {
    searchOptions,
    onChangeQuery,
    onChangeGenres,
    onChangeReleaseYearMin,
    onChangeImdbRatingMin,
    onChangeForeign
  } = SearchOptions.useContainer()

  return (
    <form className={styles.movieSearchOptions}>
      <div className={styles.mainOptions}>
        <div className={cs(styles.field, styles.queryField)}>
          <label htmlFor='query'>Search</label>

          <div className={styles.searchInput}>
            <SearchIcon className={styles.searchIcon} />

            <input
              type='text'
              name='query'
              className={cs(styles.input, styles.textInput)}
              value={searchOptions.query}
              onChange={onChangeQuery}
            />
          </div>
        </div>

        <div className={cs(styles.field, styles.genresField)}>
          <label htmlFor='genres'>Genre</label>

          <Select
            name='genres'
            instanceId='genres'
            placeholder='Any'
            className={styles.select}
            options={genreOptions}
            styles={selectStyles}
            value={
              searchOptions.genres?.[0]
                ? {
                    value: searchOptions.genres[0],
                    label: genreLabelMap[searchOptions.genres[0]]
                  }
                : null
            }
            // TODO: allow filtering by multiple genres
            // isMulti
            isClearable
            onChange={onChangeGenres}
          />
        </div>

        <div className={cs(styles.field, styles.releaseYearMinField)}>
          <label htmlFor='releaseYearMin'>Min Release Year</label>

          <Select
            name='releaseYearMin'
            instanceId='releaseYearMin'
            placeholder='Any'
            className={styles.select}
            options={yearOptions}
            styles={selectStyles}
            value={
              searchOptions.releaseYearMin
                ? {
                    value: searchOptions.releaseYearMin,
                    label: `${searchOptions.releaseYearMin}`
                  }
                : null
            }
            isClearable
            onChange={onChangeReleaseYearMin}
          />
        </div>

        <div className={cs(styles.field, styles.imdbRatingMinField)}>
          <label htmlFor='imdbRatingMin'>Min IMDB Rating</label>

          <Select
            name='imdbRatingMin'
            instanceId='imdbRatingMin'
            placeholder='Any'
            className={styles.select}
            options={imdbRatingOptions}
            styles={selectStyles}
            value={
              searchOptions.imdbRatingMin
                ? {
                    value: searchOptions.imdbRatingMin,
                    label: searchOptions.imdbRatingMin?.toFixed(1)
                  }
                : null
            }
            isClearable
            onChange={onChangeImdbRatingMin}
          />
        </div>

        <div
          className={cs(styles.field, styles.booleanField, styles.foreignField)}
        >
          <label htmlFor='foreign'>Foreign</label>

          <div>
            <Checkbox.Root
              className={cs(styles.checkbox)}
              name='foreign'
              checked={searchOptions.foreign}
              onCheckedChange={onChangeForeign}
            >
              <Checkbox.Indicator className={styles.checkboxIndicator}>
                <CheckIcon width={18} height={18} />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        </div>
      </div>
    </form>
  )
}
