'use client'

import * as React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'

import { MovieSearchOptionsSchema, IMovieSearchOptions } from '@/lib/types'
import { toFormikValidationSchema } from '@/lib/zod-formik-adapter'

import styles from './styles.module.css'

const defaultSearchOptions: IMovieSearchOptions = {
  query: '',
  releaseYearMin: 1972,
  imdbRatingMin: 7,
  foreign: false,
  orderBy: 'relevancyScore'
} as any

export const MovieSearchOptions: React.FC = () => {
  // TODO: persist search options to local storage

  return (
    <Formik
      initialValues={defaultSearchOptions}
      validationSchema={toFormikValidationSchema(MovieSearchOptionsSchema)}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        setTimeout(() => {
          setSubmitting(false)
        }, 500)
      }}
    >
      {({
        isSubmitting
        /* and other goodies */
      }) => (
        <Form className={styles.movieSearchOptions}>
          <div>
            <label>Search</label>
            <Field name='query' />
            <ErrorMessage name='query' component='div' />
          </div>

          <div>
            <div>
              <label>Year Min</label>
              <Field
                type='number'
                name='releaseYearMin'
                min={1900}
                max={2022}
              />
              <ErrorMessage name='releaseYearMin' component='div' />
            </div>

            <div>
              <label>IMDB Rating Min</label>
              <Field type='number' name='imdbRatingMin' min={0} max={10} />
              <ErrorMessage name='imdbRatingMin' component='div' />
            </div>

            <div>
              <label>Foreign?</label>
              <Field type='checkbox' name='foreign' />
              <ErrorMessage name='foreign' component='div' />
            </div>

            <div>
              <button type='submit' disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
