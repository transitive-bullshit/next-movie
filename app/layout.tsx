import * as React from 'react'
import { Inter } from '@next/font/google'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'

import { RootLayoutProviders } from './providers'
import styles from './styles.module.css'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const htmlStyle: React.CSSProperties = {
  colorScheme: 'dark'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={inter.className}
      data-theme='dark'
      style={htmlStyle}
    >
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
          <RootLayoutProviders>
            {/* <React.Suspense> */}
            <Header className={styles.header} />
            {/* </React.Suspense> */}

            {/* <React.Suspense> */}
            <main className={styles.main}>{children}</main>
            {/* </React.Suspense> */}

            {/* <React.Suspense> */}
            <Footer className={styles.footer} />
            {/* </React.Suspense> */}
          </RootLayoutProviders>
        </div>
      </body>
    </html>
  )
}
