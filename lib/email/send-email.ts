import formData from 'form-data'
import Mailgun from 'mailgun.js'

import { fromEmail, mailgunApiKey, mailgunDomain } from '@/lib/config'
import { renderEmail } from './render-email'

const mailgun = new Mailgun(formData)
const client =
  mailgunApiKey && mailgunDomain
    ? mailgun.client({
        username: 'api',
        key: mailgunApiKey
      })
    : null

export interface SendEmailOptions {
  /**
   * Email address for `From` header
   */
  from?: string

  /**
   * Email address of the recipient(s).
   *
   * @example `Bob <bob@host.com>`. You can use commas to separate multiple recipients.
   */
  to: string | string[]

  /**
   * Same as `To` but for `carbon copy`
   */
  cc?: string

  /**
   * Same as `To` but for `blind carbon copy`
   */
  bcc?: string

  /**
   * Message subject
   */
  subject: string

  /**
   * Message content title (defaults to subject if not passed)
   */
  title?: string

  /**
   * Message content body as markdown string
   */
  body: string
}

export async function sendEmail({
  from = fromEmail,
  to,
  cc,
  bcc,
  subject,
  title,
  body
}: SendEmailOptions) {
  if (!client) {
    console.warn(
      'Warning: email is disabled. Please specify MAILGUN_API_KEY and MAILGUN_DOMAIN to enable email.'
    )
    return
  }

  if (!to) {
    return
  }

  const html = await renderEmail({
    subject,
    title: title || subject,
    body
  })

  return client.messages.create(mailgunDomain, {
    subject,
    from,
    to,
    cc,
    bcc,
    html
  })
}
