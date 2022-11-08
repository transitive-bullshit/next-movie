import React from 'react'

import cs from 'clsx'

import styles from './styles.module.css'

export const Paper: React.FC<{
  className?: string
  children?: React.ReactNode
}> = ({ className, ...rest }) => {
  return <div className={cs(styles.paper, className)} {...rest} />
}
