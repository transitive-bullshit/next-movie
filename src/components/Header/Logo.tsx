'use client'

import * as React from 'react'
import cs from 'clsx'

import { useTheme } from '@/lib/hooks/use-theme'

import styles from './styles.module.css'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const { isDarkMode } = useTheme()

  return isDarkMode ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cs(styles.logo, className)}
      src='/next-logo-dark.svg'
      alt='Logo'
      width={200}
      height={33}
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cs(styles.logo, className)}
      src='/next-logo-light.svg'
      alt='Logo'
      width={200}
      height={33}
    />
  )
}
