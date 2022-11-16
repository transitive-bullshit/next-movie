'use client'

import * as React from 'react'
import Select from 'react-select'
import cs from 'clsx'

import * as Checkbox from '@radix-ui/react-checkbox'

import { Tooltip } from '@/components/Tooltip/Tooltip'
import { genres, genreLabelMap } from '@/lib/genres'
import {
  SearchIcon,
  CheckIcon,
  ClearIcon,
  SingleIcon,
  GridIcon,
  ListIcon
} from '@/icons/index'
import { SearchOptions } from '@/lib/hooks/search-options'

import styles from './styles.module.css'

const genreOptions = genres.map((genre) => ({
  value: genre,
  label: genreLabelMap[genre]
}))

const minYear = 1900
const maxYear = new Date().getFullYear()

const yearOptions = [...new Array(maxYear - minYear + 1)]
  .map((_, index) => ({
    value: minYear + index,
    label: `${minYear + index}`
  }))
  .reverse()

const imdbRatingOptions = [
  6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7, 7.1, 7.2, 7.3, 7.4, 7.5,
  7.6, 7.7, 7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9
]
  .map((value) => ({
    value,
    label: value.toFixed(1)
  }))
  .reverse()

const orderByOptions = [
  {
    value: 'relevancyScore',
    label: 'Default Sort'
  },
  {
    value: 'imdbRating',
    label: 'IMDB Rating'
  },
  {
    value: 'imdbVotes',
    label: 'IMDB Votes'
  },
  {
    value: 'rtCriticRating',
    label: 'RT Critic Score'
  },
  {
    value: 'rtAudienceRating',
    label: 'RT Audience Score'
  },
  {
    value: 'tmdbPopularity',
    label: 'TMDB Popularity'
  },
  {
    value: 'releaseDate',
    label: 'Release Date'
  }
]

const selectStyles: any = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#24292f'
  }),
  control: (provided: any) => ({
    ...provided,
    height: '100%'
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    cursor: 'pointer'
  })
}

export type MovieSearchOptionsFieldConfig = 'default' | 'hidden' | 'disabled'

export interface IMovieSearchOptionsProps {
  config?: {
    query?: MovieSearchOptionsFieldConfig
    genres?: MovieSearchOptionsFieldConfig
    releaseYearMin?: MovieSearchOptionsFieldConfig
    imdbRatingMin?: MovieSearchOptionsFieldConfig
    foreign?: MovieSearchOptionsFieldConfig
    layout?: MovieSearchOptionsFieldConfig
    orderBy?: MovieSearchOptionsFieldConfig
  }
}

export const MovieSearchOptions: React.FC<IMovieSearchOptionsProps> = ({
  config
}) => {
  const {
    searchOptions,
    isDirty,
    onChangeQuery,
    onClearQuery,
    onChangeGenres,
    onChangeReleaseYearMin,
    onChangeImdbRatingMin,
    onChangeForeign,
    onChangeOrderBy,
    onChangeLayout,
    onResetDefaults
  } = SearchOptions.useContainer()

  const queryInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <form className={styles.movieSearchOptions}>
      <div className={styles.mainOptions}>
        {config?.query !== 'hidden' && (
          <div className={cs(styles.field, styles.queryField)}>
            <label htmlFor='query'>Search</label>

            <div
              className={cs(
                styles.searchInput,
                config?.query === 'disabled' && styles.disabled
              )}
            >
              <SearchIcon className={styles.searchIcon} />

              <input
                type='text'
                name='query'
                className={cs(styles.input, styles.textInput)}
                value={searchOptions.query}
                onChange={onChangeQuery}
                disabled={config?.query === 'disabled'}
                ref={queryInputRef}
              />

              {searchOptions.query && (
                <div
                  className={styles.clearInput}
                  onClick={() => {
                    onClearQuery()

                    if (queryInputRef.current) {
                      queryInputRef.current.focus()
                    }
                  }}
                  aria-hidden='true'
                >
                  <ClearIcon className={styles.clearIcon} />
                </div>
              )}
            </div>
          </div>
        )}

        {config?.genres !== 'hidden' && (
          <div className={cs(styles.field, styles.genresField)}>
            <label htmlFor='genres'>Genre</label>

            <Select
              name='genres'
              instanceId='genres'
              placeholder='Any'
              className={cs(
                styles.select,
                config?.genres === 'disabled' && styles.disabled
              )}
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
              isDisabled={config?.genres === 'disabled'}
            />
          </div>
        )}

        {config?.releaseYearMin !== 'hidden' && (
          <div className={cs(styles.field, styles.releaseYearMinField)}>
            <label htmlFor='releaseYearMin'>Min Release Year</label>

            <Select
              name='releaseYearMin'
              instanceId='releaseYearMin'
              placeholder='Any'
              className={cs(
                styles.select,
                config?.releaseYearMin === 'disabled' && styles.disabled
              )}
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
              isDisabled={config?.releaseYearMin === 'disabled'}
            />
          </div>
        )}

        {config?.imdbRatingMin !== 'hidden' && (
          <div className={cs(styles.field, styles.imdbRatingMinField)}>
            <label htmlFor='imdbRatingMin'>Min IMDB Rating</label>

            <Select
              name='imdbRatingMin'
              instanceId='imdbRatingMin'
              placeholder='Any'
              className={cs(
                styles.select,
                config?.imdbRatingMin === 'disabled' && styles.disabled
              )}
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
              isDisabled={config?.imdbRatingMin === 'disabled'}
            />
          </div>
        )}

        {config?.foreign !== 'hidden' && (
          <div
            className={cs(
              styles.field,
              styles.booleanField,
              styles.foreignField
            )}
          >
            <label htmlFor='foreign'>Foreign</label>

            <div
              className={cs(config?.foreign === 'disabled' && styles.disabled)}
            >
              <Checkbox.Root
                className={styles.checkbox}
                name='foreign'
                checked={searchOptions.foreign}
                onCheckedChange={onChangeForeign}
                disabled={config?.foreign === 'disabled'}
              >
                <Checkbox.Indicator className={styles.checkboxIndicator}>
                  <CheckIcon width={18} height={18} />
                </Checkbox.Indicator>
              </Checkbox.Root>
            </div>
          </div>
        )}
      </div>

      <div className={styles.subOptions}>
        <button
          className={cs(styles.resetButton, !isDirty && styles.disabled)}
          onClick={onResetDefaults}
          disabled={!isDirty}
        >
          Restore defaults
        </button>

        <div className={styles.rhs}>
          {config?.layout !== 'hidden' && (
            <div className={styles.layoutOptions}>
              <Tooltip content='Grid View'>
                <button
                  className={cs(
                    styles.layoutButton,
                    config?.layout === 'disabled' && styles.disabled
                  )}
                  onClick={() => onChangeLayout('grid')}
                  disabled={
                    searchOptions.layout === 'grid' ||
                    config?.layout === 'disabled'
                  }
                >
                  <GridIcon
                    className={cs(
                      styles.layoutOption,
                      searchOptions.layout === 'grid' && styles.selected
                    )}
                  />
                </button>
              </Tooltip>

              <Tooltip content='List View'>
                <button
                  className={cs(
                    styles.layoutButton,
                    config?.layout === 'disabled' && styles.disabled
                  )}
                  onClick={() => onChangeLayout('list')}
                  disabled={
                    searchOptions.layout === 'list' ||
                    config?.layout === 'disabled'
                  }
                >
                  <ListIcon
                    className={cs(
                      styles.layoutOption,
                      searchOptions.layout === 'list' && styles.selected
                    )}
                  />
                </button>
              </Tooltip>

              <Tooltip content='Single Movie View'>
                <button
                  className={cs(
                    styles.layoutButton,
                    config?.layout === 'disabled' && styles.disabled
                  )}
                  onClick={() => onChangeLayout('single')}
                  disabled={
                    searchOptions.layout === 'single' ||
                    config?.layout === 'disabled'
                  }
                >
                  <SingleIcon
                    className={cs(
                      styles.layoutOption,
                      (!searchOptions.layout ||
                        searchOptions.layout === 'single') &&
                        styles.selected
                    )}
                  />
                </button>
              </Tooltip>
            </div>
          )}

          {config?.orderBy !== 'hidden' && (
            <Select
              name='orderBy'
              instanceId='orderBy'
              className={cs(
                styles.orderBy,
                (config?.orderBy === 'disabled' ||
                  searchOptions.layout === 'single') &&
                  styles.disabled
              )}
              options={orderByOptions}
              styles={selectStyles}
              isDisabled={
                config?.orderBy === 'disabled' ||
                searchOptions.layout === 'single'
              }
              value={
                searchOptions.orderBy
                  ? {
                      value: searchOptions.orderBy,
                      label:
                        orderByOptions.find(
                          (o) => o.value === searchOptions.orderBy
                        )?.label ?? 'Default'
                    }
                  : null
              }
              onChange={onChangeOrderBy}
            />
          )}
        </div>
      </div>
    </form>
  )
}
