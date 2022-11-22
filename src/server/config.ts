import { z } from 'zod'

const envSchema = z.object({
  // general env
  NODE_ENV: z.enum(['development', 'test', 'production']),

  // prisma database
  DATABASE_URL: z.string().url(),

  // authentication
  NEXTAUTH_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),

  // email
  MAILGUN_API_KEY: z.string().min(1),
  MAILGUN_DOMAIN: z.string().min(1)
})

// ensure that all required env variables are defined
const env = envSchema.safeParse(process.env)

if (!env.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 4)
  )

  process.exit(1)
}

export const fromEmail = 'Travis Fischer <travis@transitivebullsh.it>'
export const githubClientId = process.env.GITHUB_CLIENT_ID!
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!
export const mailgunApiKey = process.env.MAILGUN_API_KEY!
export const mailgunDomain = process.env.MAILGUN_DOMAIN!
