import * as React from 'react'
import cs from 'clsx'
import { signIn, signOut, useSession } from 'next-auth/react'

import * as config from '@/lib/config'
import { ActiveLink } from '@/components/ActiveLink/ActiveLink'
import { DarkModeToggle } from '@/components/DarkModeToggle/DarkModeToggle'
import { GitHub, Twitter } from '@/icons'

import { Logo } from './Logo'
import { UserDropdown } from './UserDropdown'
import styles from './styles.module.css'

export const Header: React.FC<{ className?: string }> = ({ className }) => {
  const { data: session } = useSession()

  return (
    <header className={cs(styles.header, className)}>
      <div className={styles.navHeader}>
        <ActiveLink
          href='/'
          className={styles.action}
          activeClassName={styles.active}
          aria-label='Next Movie Logo'
        >
          <Logo />
        </ActiveLink>

        <div className={styles.rhs}>
          {session?.user ? (
            <UserDropdown />
          ) : (
            <>
              <div className={styles.action} onClick={() => signIn()}>
                Login
              </div>

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
            </>
          )}
        </div>
      </div>
    </header>
  )
}
