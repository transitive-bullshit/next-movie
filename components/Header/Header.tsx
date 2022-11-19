import 'server-only'
import * as React from 'react'
import cs from 'clsx'

import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { DarkModeToggle } from '@/components/DarkModeToggle/DarkModeToggle'
import { GitHub, Twitter } from '@/icons/index'
import * as config from '@/lib/config'

import styles from './styles.module.css'

export const Header: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <header className={cs(styles.header, className)}>
      <div className={styles.navHeader}>
        <ActiveLink
          href='/'
          className={styles.action}
          activeClassName={styles.active}
          aria-label='Next Movie Logo'
        >
          <div className={styles.logo} />
        </ActiveLink>

        <div className={styles.rhs}>
          <ActiveLink
            href='/about'
            className={styles.action}
            activeClassName={styles.active}
          >
            About
          </ActiveLink>

          <DarkModeToggle className={cs(styles.action, styles.icon)} />

          <a
            className={cs(styles.twitter, styles.action, styles.icon)}
            href={config.twitterUrl}
            title={`Twitter ${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Twitter />
          </a>

          <a
            className={cs(styles.github, styles.action, styles.icon)}
            href={config.githubRepoUrl}
            title='View source on GitHub'
            target='_blank'
            rel='noopener noreferrer'
          >
            <GitHub />
          </a>
        </div>
      </div>
    </header>
  )
}
