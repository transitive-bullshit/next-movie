'use client'

import * as React from 'react'
import cs from 'clsx'

import { Moon, Sun } from '@/icons/index'

import { useTheme } from '@/lib/hooks/use-theme'
import styles from './styles.module.css'

export const DarkModeToggle: React.FC<{ className?: string }> = ({
  className
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <button
      className={cs(styles.toggleDarkMode, className)}
      role='button'
      onClick={toggleDarkMode}
      title='Toggle dark mode'
    >
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  )
}
