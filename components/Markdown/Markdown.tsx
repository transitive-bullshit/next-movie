import 'server-only'
import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import cs from 'clsx'

import styles from './styles.module.css'

export const Markdown: React.FC<{ className?: string; children: string }> = ({
  className,
  children
}) => {
  return (
    <div className={cs(styles.markdown, className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
