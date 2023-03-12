import * as fs from 'fs'
import * as path from 'path'
import handlebars from 'handlebars'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'
import { unified } from 'unified'

import * as config from '@/lib/config'

const rawEmailTemplate = fs.readFileSync(
  path.join(process.cwd(), 'src', 'server', 'email', 'email-template.hbs'),
  'utf-8'
)

let handlebarsTemplate: handlebars.TemplateDelegate<any>

export async function renderEmail({
  subject,
  title,
  body
}: {
  subject: string
  title: string
  body: string
}) {
  if (!handlebarsTemplate) {
    handlebarsTemplate = handlebars.compile(rawEmailTemplate)
  }

  // convert markdown body to html
  const htmlBody = (
    await unified().use(remarkParse).use(remarkHtml).process(body)
  ).toString()

  const emailTemplateProps = {
    ...config,
    subject,
    title,
    body: htmlBody,
    primaryColor: '#34495e',
    unsubscribe: false
  }

  // render handlebars template
  const html = handlebarsTemplate(emailTemplateProps)

  return html
}
