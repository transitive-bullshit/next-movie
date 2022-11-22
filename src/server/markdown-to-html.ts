import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, {
    allowDangerousHtml: true
  })
  .use(rehypeRaw)
  .use(rehypeFormat)
  .use(rehypeStringify)

export async function markdownToHtml(markdown: string) {
  const result = await processor.process(markdown)
  return result.toString()
}
