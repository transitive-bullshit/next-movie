// import pMemoize from 'p-memoize'
// import stringify from 'fast-json-stable-stringify'
// import QuickLRU from 'quick-lru'
import random from 'random'

import * as types from '@/types'
import { searchMovies } from '@/server/search-movies'

// TODO: is this even worth it within a serverless function?
// export const getNextMovie = pMemoize(getNextMovieImpl, {
//   cacheKey: (args: Parameters<typeof getNextMovieImpl>) => stringify(args[0]),
//   cache: new QuickLRU({ maxSize: 100 })
// })

export async function getNextMovie(
  opts: types.INextMovieOptions,
  session?: types.Session | null
): Promise<types.INextMovieResult> {
  const { cursor, limit, ...restSearchOptions } = opts.searchOptions
  const seed = opts.seed || JSON.stringify(restSearchOptions)
  const rng = random.clone(seed)
  const total =
    opts.total !== undefined
      ? opts.total | 0
      : (await searchMovies({ ...opts.searchOptions, limit: 0 })).total

  if (total <= 0) {
    return {
      movie: undefined,
      total,
      prevSeq: 0,
      seq: 0,
      nextSeq: 0
    }
  }

  const seq = opts.seq ? Math.max(1, (opts.seq | 0) % (total + 1)) : 1
  const offset = rng.int(0, total - 1)
  const prevSeq = total <= 1 ? 0 : getPrevSeq(seq, total)
  const nextSeq = total <= 1 ? 0 : getNextSeq(seq, total)

  const skip = (seq + offset) % total

  // console.log('>>> next-movie', {
  //   total,
  //   offset,
  //   skip,
  //   prevSeq,
  //   seq,
  //   nextSeq
  // })

  const result = await searchMovies(
    {
      ...restSearchOptions,
      limit: 1,
      skip
    },
    session
  )

  // console.log('<<< next-movie', {
  //   movie: result.results[0]?.title,
  //   total,
  //   offset,
  //   skip,
  //   prevSeq,
  //   seq,
  //   nextSeq
  // })

  return {
    movie: result.results[0],
    total,
    prevSeq,
    seq,
    nextSeq
  }
}

// all of this weird bit hackery is from
// https://github.com/transitive-bullshit/dissolve-generator
const RAND_MASKS = [
  0x00000001, 0x00000003, 0x00000006, 0x0000000c, 0x00000014, 0x00000030,
  0x00000060, 0x000000b8, 0x00000110, 0x00000240, 0x00000500, 0x00000ca0,
  0x00001b00, 0x00003500, 0x00006000, 0x0000b400, 0x00012000, 0x00020400,
  0x00072000, 0x00090000, 0x00140000, 0x00300000, 0x00400000, 0x00d80000,
  0x01200000, 0x03880000, 0x07200000, 0x09000000, 0x14000000, 0x32800000,
  0x48000000, 0xa3000000
]

function getNextSeq(seq: number, total: number): number {
  // if (seq >= total - 1) {
  //   return 0
  // } else {
  //   return seq + 1
  // }

  if (total <= 0 || seq < 1) return 0

  const dim = Math.ceil(Math.sqrt(total))
  const size = dim * dim

  const bitWidth = getBitWidth(size)
  const mask = RAND_MASKS[bitWidth - 1]
  if (!mask) return 0 // this shold never happen

  // 2d version coords of the dissolve effect are unused
  // const x = (0.5 + (seq % dim)) | 0
  // const y = (Math.ceil(seq / dim) - 1.0) | 0

  // iterate and ignore samples outside of our target range
  do {
    seq = (seq >> 1) ^ ((seq & 1) * mask)
  } while (seq > total)

  return seq
}

function getPrevSeq(targetSeq: number, total: number): number {
  // if (targetSeq < 1) {
  //   return total - 1
  // } else {
  //   return targetSeq - 1
  // }

  if (total <= 0 || targetSeq < 1 || targetSeq > total) return 0

  const dim = Math.ceil(Math.sqrt(total))
  const size = dim * dim

  const bitWidth = getBitWidth(size)
  const mask = RAND_MASKS[bitWidth - 1]
  if (!mask) return 0 // this shold never happen

  let prevSeq = total
  let seq = 1

  // iterate and ignore samples outside of our target range
  do {
    if (seq <= total) {
      prevSeq = seq
    }

    seq = (seq >> 1) ^ ((seq & 1) * mask)
  } while (seq > total || seq !== targetSeq)

  return prevSeq
}

function getBitWidth(n: number): number {
  let width = 0

  while (n > 0) {
    n >>= 1
    ++width
  }

  return width
}
