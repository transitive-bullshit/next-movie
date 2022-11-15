import { PrismaClient } from '@prisma/client'
import { convertMovie, convertMovies } from './utils'

declare let global: { prisma: PrismaClient }

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

// TODO: not type-safe
// prisma.$use(async (params, next) => {
//   const res = await next(params)
//
//   if (params.model === 'Movie') {
//     if (params.action === 'findMany') {
//       return convertMovies(res)
//     } else if (params.action === 'findUnique') {
//       return convertMovie(res)
//     }
//   }
//
//   return res
// })

export { prisma }
