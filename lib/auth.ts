import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import * as config from '@/lib/config'
import { prisma } from '@/lib/prisma'
import { sendSignInEmail, sendVerificationEmail } from './email'

export const authOptions: NextAuthOptions = {
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  // pages: {
  //   signIn: '/login'
  // },
  providers: [
    GitHubProvider({
      clientId: config.githubClientId,
      clientSecret: config.githubClientSecret
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url }) => {
        const user = await prisma.user.findUnique({
          where: {
            email: identifier
          }
        })

        if (user?.emailVerified) {
          await sendSignInEmail({ user, url })
        } else {
          await sendVerificationEmail({ email: identifier, url })
        }
      }
    })
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      }
    }
  }
}
