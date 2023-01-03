import { PrismaClient } from '@prisma/client'

declare let global: { prisma: PrismaClient }

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export { prisma }
