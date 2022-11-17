import * as React from 'react'
import cs from 'clsx'

import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { DarkModeToggle } from '@/components/DarkModeToggle/DarkModeToggle'

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

          <DarkModeToggle className={styles.action} />
        </div>
      </div>
    </header>
  )
}
