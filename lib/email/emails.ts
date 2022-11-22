import * as config from '@/lib/config'
import { type User } from '@/lib/types'

import { sendEmail } from './send-email'

export async function sendWelcomeEmail({ user }: { user: User }) {
  const subject = `${config.title} Welcome 👋`
  const title = 'Welcome 👋'

  return sendEmail({
    subject,
    title,
    to: user.email!,
    body: `Welcome to ${config.title}.

I hope you enjoy the service -- Feel free to respond to this email with any questions you may have.

Thanks! 🙂

[${config.author}](${config.twitterUrl})
 `
  })
}

export async function sendVerificationEmail({
  email,
  url
}: {
  email: string
  url: string
}) {
  const subject = `${config.title} Verify Email 👋`
  const title = 'Welcome 👋'

  return sendEmail({
    subject,
    title,
    to: email!,
    body: `Welcome to ${config.title}.

Please verify your email address by [clicking this link](${url}).

Cheers, 🙂

[${config.author}](${config.twitterUrl})
 `
  })
}

export async function sendSignInEmail({
  user,
  url
}: {
  user: User
  url: string
}) {
  const subject = `${config.title} Login`
  const title = 'Login'

  return sendEmail({
    subject,
    title,
    to: user.email!,
    body: `Welcome to ${config.title}.

Log in to ${config.title} by [clicking this link](${url}).

Cheers, 🙂

[${config.author}](${config.twitterUrl})
 `
  })
}
