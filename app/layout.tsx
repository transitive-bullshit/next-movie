import { Footer } from '@/components/Footer/Footer'
import { Toaster } from '@/components/Toaster/Toaster'
import { Providers } from './providers'

import './globals.css'
import styles from './styles.module.css'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
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
          <Providers>
            <main className={styles.main}>{children}</main>

            <Toaster />

            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}
