import random from 'random'

import { searchMovies } from './search'
import * as types from './types'

export async function nextMovie(
  opts: types.INextMovieOptions
): Promise<types.INextMovieResult> {
  const total =
    opts.total ??
    (await searchMovies({ ...opts.searchOptions, limit: 0 })).total
  const seq = opts.seq ?? random.clone(opts.seed).int(0, total - 1)
  const nextSeq = getNextSeq(total, seq)

  // TODO: how to select `seq` skipped movie
  const result = await searchMovies({
    ...opts.searchOptions,
    limit: 1
    // skip: nextSeq
  })

  return {
    movie: result.results[0],
    total,
    seq: nextSeq
  }
}

const RAND_MASKS = [
  0x00000001, 0x00000003, 0x00000006, 0x0000000c, 0x00000014, 0x00000030,
  0x00000060, 0x000000b8, 0x00000110, 0x00000240, 0x00000500, 0x00000ca0,
  0x00001b00, 0x00003500, 0x00006000, 0x0000b400, 0x00012000, 0x00020400,
  0x00072000, 0x00090000, 0x00140000, 0x00300000, 0x00400000, 0x00d80000,
  0x01200000, 0x03880000, 0x07200000, 0x09000000, 0x14000000, 0x32800000,
  0x48000000, 0xa3000000
]

function getNextSeq(total: number, seq: number): number {
  const dim = Math.ceil(Math.sqrt(total))
  const size = dim * dim

  const bitWidth = getBitWidth(size)
  const mask = RAND_MASKS[bitWidth - 1]

  const x = (0.5 + (seq % dim)) | 0
  const y = (Math.ceil(seq / dim) - 1.0) | 0

  // iterate and ignore samples outside of our target range
  do {
    seq = (seq >> 1) ^ ((seq & 1) * mask)
  } while (seq >= total)

  return seq
}

function getBitWidth(n: number): number {
  let width = 0

  while (n > 0) {
    n >>= 1
    ++width
  }

  return width
}
