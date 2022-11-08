'use client'

import * as React from 'react'

import { GitHub, Moon, Sun, Twitter } from '@/icons/index'
import { copyright, githubRepoUrl, twitter, twitterUrl } from '@/lib/config'

import { useTheme } from '@/lib/hooks/use-theme'
import styles from './styles.module.css'

export const Footer: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <a href={twitterUrl} target='_blank' rel='noopener noreferrer'>
          {copyright}
        </a>
      </div>

      <div className={styles.settings}>
        <a
          className={styles.toggleDarkMode}
          href='#'
          role='button'
          onClick={toggleDarkMode}
          title='Toggle dark mode'
        >
          {isDarkMode ? <Moon /> : <Sun />}
        </a>
      </div>

      <div className={styles.social}>
        <a
          className={styles.twitter}
          href={twitterUrl}
          title={`Twitter ${twitter}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Twitter />
        </a>

        <a
          className={styles.github}
          href={githubRepoUrl}
          title='View source on GitHub'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHub />
        </a>
      </div>
    </footer>
  )
}
