import * as React from 'react'
import cs from 'clsx'

import styles from './styles.module.css'

export const Button: React.FC<
  {
    className?: string
    buttonClassName?: string
    children: React.ReactNode
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, buttonClassName, children, style, ...buttonProps }) => {
  return (
    <div className={cs(styles.buttonWrapper, className)} style={style}>
      <button className={cs(styles.button, buttonClassName)} {...buttonProps}>
        <span className={styles.buttonContent}>{children}</span>
      </button>
    </div>
  )
}
