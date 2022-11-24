import test from 'ava'

import * as types from '@/types'

import { normalizeTitle, getMoviePathname, parseMovieId } from './utils'

test('normalizeTitle', (t) => {
  t.is(normalizeTitle(), '')
  t.is(normalizeTitle(''), '')
  t.is(normalizeTitle('#'), '')
  t.is(normalizeTitle('#foo'), 'foo')
  t.is(normalizeTitle('/foo'), 'foo')
  t.is(normalizeTitle('/foo/bar'), 'foobar')
  t.is(normalizeTitle('://test.com'), 'testcom')
  t.is(normalizeTitle('foo bar'), 'foo-bar')
  t.is(normalizeTitle('FooBar'), 'foobar')
  t.is(normalizeTitle('---Foo-Bar---'), 'foo-bar')
  t.is(normalizeTitle(';Foo;Bar.'), 'foobar')
  t.is(normalizeTitle('Léon: The Professional'), 'leon-the-professional')
})

test('getMoviePathname', (t) => {
  t.is(
    getMoviePathname({ id: 123, title: 'The Foo Bar.' } as types.MovieModel),
    '/titles/123-the-foo-bar'
  )
  t.is(
    getMoviePathname({
      id: 123,
      title: 'The Foo Bar.',
      releaseYear: 2015
    } as types.MovieModel),
    '/titles/123-the-foo-bar-2015'
  )
  t.is(
    getMoviePathname({ id: 4200, title: '...' } as types.MovieModel),
    '/titles/4200'
  )
  t.is(
    getMoviePathname({
      id: 123,
      originalTitle: 'FUN-IN THE SUN'
    } as types.MovieModel),
    '/titles/123-fun-in-the-sun'
  )
  t.is(
    getMoviePathname({
      id: 101,
      title: 'Léon: The Professional',
      releaseYear: 1994
    } as types.MovieModel),
    '/titles/101-leon-the-professional-1994'
  )
})

test('parseMovieId', (t) => {
  t.is(parseMovieId(), null)
  t.is(parseMovieId(null as any), null)
  t.is(parseMovieId(undefined), null)
  t.is(parseMovieId(''), null)
  t.is(parseMovieId('this is a test'), null)
  t.is(parseMovieId('123foo'), null)
  t.is(parseMovieId('123foo-'), null)
  t.is(parseMovieId('123.8'), null)
  t.is(parseMovieId('0.5-foo'), null)
  t.is(parseMovieId('-5'), null)
  t.is(parseMovieId('/titles/123-foo-bar'), 123)
  t.is(parseMovieId('/titles/123.5-foo-bar'), null)
  t.is(parseMovieId('/api/456/789-titles/1-foo-bar'), 1)
  t.is(parseMovieId('/api/456-yoo/-789-titles/003-foo-bar'), 3)
  t.is(parseMovieId('/foo/bar/titles/829345-nala-foo-bar'), 829345)
  t.is(parseMovieId('/foo/bar/titles/7589'), 7589)
})
