import * as React from 'react'
import { Inter } from '@next/font/google'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { githubRepoUrl } from '@/lib/config'

import { Providers } from './providers'
import styles from './styles.module.css'

import './globals.css'

const inter = Inter()

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={inter.className}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />

        <link rel='icon' href='/favicon.ico' />
      </head>

      <body className={styles.body}>
        <div className={styles.container}>
          <GitHubShareButton repoUrl={githubRepoUrl} />

          <Providers>
            {/* <Header /> */}

            <main className={styles.main}>{children}</main>

            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
