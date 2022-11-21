import * as React from 'react'
import cs from 'clsx'

import styles from './styles.module.css'

export const Markdown: React.FC<{ className?: string; content: string }> = ({
  className,
  content
}) => {
  return (
    <div
      className={cs(styles.markdown, className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
