import { DefaultToastOptions, Toaster } from 'react-hot-toast'

import { Footer } from '@/components/Footer/Footer'
import { PageHead } from '@/components/PageHead/PageHead'

import './globals.css'
import styles from './styles.module.css'

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  success: {
    duration: 4000
  },
  error: {
    duration: 6000
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <PageHead />

        <link rel='icon' href='/favicon.ico' />
      </head>

      <body className={styles.body}>
        <div className={styles.container}>
          <main className={styles.main}>{children}</main>

          <Toaster position='top-right' toastOptions={toastOptions} />

          <Footer />
        </div>
      </body>
    </html>
  )
}
