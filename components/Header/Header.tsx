import * as React from 'react'

import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { DarkModeToggle } from '@/components/DarkModeToggle/DarkModeToggle'

import styles from './styles.module.css'

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
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
            href='/search'
            className={styles.action}
            activeClassName={styles.active}
          >
            Search
          </ActiveLink>

          <ActiveLink
            href='/about'
            className={styles.action}
            activeClassName={styles.active}
          >
            About
          </ActiveLink>

          <DarkModeToggle className={styles.action} />
        </div>
      </div>
    </header>
  )
}
