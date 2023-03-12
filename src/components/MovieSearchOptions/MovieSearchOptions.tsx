'use client'

import * as Checkbox from '@radix-ui/react-checkbox'
import * as React from 'react'
import cs from 'clsx'
import Select from 'react-select'

import { Button } from '@/components/Button/Button'
import { Tooltip } from '@/components/Tooltip/Tooltip'
import {
  CheckIcon,
  ClearIcon,
  GridIcon,
  ListIcon,
  SearchIcon,
  SingleIcon
} from '@/icons/index'
import { genreLabelMap, genres, genresToIgnore } from '@/lib/genres'
import { SearchOptions } from '@/lib/hooks/search-options'

import styles from './styles.module.css'

const genreOptions = genres
  .filter((genre) => !genresToIgnore.has(genre))
  .map((genre) => ({
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

export interface IMovieSearchOptionsConfig {
  query?: MovieSearchOptionsFieldConfig
  genres?: MovieSearchOptionsFieldConfig
  releaseYearMin?: MovieSearchOptionsFieldConfig
  imdbRatingMin?: MovieSearchOptionsFieldConfig
  foreign?: MovieSearchOptionsFieldConfig
  layout?: MovieSearchOptionsFieldConfig
  layoutGrid?: MovieSearchOptionsFieldConfig
  layoutList?: MovieSearchOptionsFieldConfig
  layoutSingle?: MovieSearchOptionsFieldConfig
  orderBy?: MovieSearchOptionsFieldConfig
}

export interface IMovieSearchOptionsProps {
  config?: IMovieSearchOptionsConfig
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

  const onClickClearQuery = React.useCallback(() => {
    onClearQuery()

    if (queryInputRef.current) {
      queryInputRef.current.focus()
    }
  }, [onClearQuery, queryInputRef])

  const selectedGenreValue = React.useMemo(
    () =>
      searchOptions.genres?.[0]
        ? {
            value: searchOptions.genres[0],
            label: genreLabelMap[searchOptions.genres[0]]
          }
        : null,
    [searchOptions.genres]
  )

  const selectedReleaseMinYearValue = React.useMemo(
    () =>
      searchOptions.releaseYearMin
        ? {
            value: searchOptions.releaseYearMin,
            label: `${searchOptions.releaseYearMin}`
          }
        : null,
    [searchOptions.releaseYearMin]
  )

  const selectedIMDBRatingMinValue = React.useMemo(
    () =>
      searchOptions.imdbRatingMin
        ? {
            value: searchOptions.imdbRatingMin,
            label: searchOptions.imdbRatingMin?.toFixed(1)
          }
        : null,
    [searchOptions.imdbRatingMin]
  )

  const selectedOrderByValue = React.useMemo(
    () =>
      searchOptions.orderBy
        ? {
            value: searchOptions.orderBy,
            label:
              orderByOptions.find((o) => o.value === searchOptions.orderBy)
                ?.label ?? 'Default'
          }
        : null,
    [searchOptions.orderBy]
  )

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
                id='query'
                className={cs(styles.input, styles.textInput)}
                value={searchOptions.query}
                onChange={onChangeQuery}
                disabled={config?.query === 'disabled'}
                ref={queryInputRef}
              />

              {searchOptions.query && (
                <div
                  className={styles.clearInput}
                  onClick={onClickClearQuery}
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
              id='genres'
              instanceId='genres'
              aria-label='Genres'
              placeholder='Any'
              className={cs(
                styles.select,
                config?.genres === 'disabled' && styles.disabled
              )}
              options={genreOptions}
              styles={selectStyles}
              value={selectedGenreValue}
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
              id='releaseYearMin'
              instanceId='releaseYearMin'
              aria-label='Min Release Year'
              placeholder='Any'
              className={cs(
                styles.select,
                config?.releaseYearMin === 'disabled' && styles.disabled
              )}
              options={yearOptions}
              styles={selectStyles}
              value={selectedReleaseMinYearValue}
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
              id='imdbRatingMin'
              instanceId='imdbRatingMin'
              aria-label='Min IMDB Rating'
              placeholder='Any'
              className={cs(
                styles.select,
                config?.imdbRatingMin === 'disabled' && styles.disabled
              )}
              options={imdbRatingOptions}
              styles={selectStyles}
              value={selectedIMDBRatingMinValue}
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
                id='foreign'
                aria-label='Foreign'
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
        <Button
          className={cs(styles.resetButton, !isDirty && styles.disabled)}
          onClick={onResetDefaults}
          disabled={!isDirty}
        >
          Restore defaults
        </Button>

        {config?.layout !== 'hidden' && (
          <div className={styles.layoutOptions}>
            {config?.layoutGrid !== 'hidden' && (
              <Tooltip content='Grid View'>
                <button
                  className={cs(
                    styles.layoutButton,
                    config?.layout === 'disabled' && styles.disabled,
                    config?.layoutGrid === 'disabled' && styles.disabled
                  )}
                  onClick={() => onChangeLayout('grid')}
                  disabled={
                    searchOptions.layout === 'grid' ||
                    config?.layout === 'disabled' ||
                    config?.layoutGrid === 'disabled'
                  }
                  aria-label='Grid View'
                >
                  <GridIcon
                    className={cs(
                      styles.layoutOption,
                      searchOptions.layout === 'grid' && styles.selected
                    )}
                  />
                </button>
              </Tooltip>
            )}

            {config?.layoutList !== 'hidden' && (
              <Tooltip content='List View'>
                <button
                  className={cs(
                    styles.layoutButton,
                    config?.layout === 'disabled' && styles.disabled,
                    config?.layoutGrid === 'disabled' && styles.disabled
                  )}
                  onClick={() => onChangeLayout('list')}
                  disabled={
                    searchOptions.layout === 'list' ||
                    config?.layout === 'disabled' ||
                    config?.layoutList === 'disabled'
                  }
                  aria-label='List View'
                >
                  <ListIcon
                    className={cs(
                      styles.layoutOption,
                      searchOptions.layout === 'list' && styles.selected
                    )}
                  />
                </button>
              </Tooltip>
            )}

            {config?.layoutSingle !== 'hidden' && (
              <Tooltip content='Single Movie View'>
                <button
                  className={cs(
                    styles.layoutButton,
                    config?.layout === 'disabled' && styles.disabled,
                    config?.layoutSingle === 'disabled' && styles.disabled
                  )}
                  onClick={() => onChangeLayout('single')}
                  disabled={
                    searchOptions.layout === 'single' ||
                    config?.layout === 'disabled' ||
                    config?.layoutSingle === 'disabled'
                  }
                  aria-label='Single Movie View'
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
            )}
          </div>
        )}

        {config?.orderBy !== 'hidden' && (
          <div className={cs(styles.field, styles.orderByField)}>
            <label htmlFor='orderBy' className={styles.labelOrderBy}>
              Sort By
            </label>

            <Select
              name='orderBy'
              id='orderBy'
              instanceId='orderBy'
              aria-label='Sort by'
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
              value={selectedOrderByValue}
              onChange={onChangeOrderBy}
            />
          </div>
        )}
      </div>
    </form>
  )
}
