import * as React from 'react'
import { DefaultToastOptions, Toaster } from 'react-hot-toast'

// import { Inter } from '@next/font/google'
// import cs from 'clsx'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { TailwindIndicator } from '@/components/TailwindIndicator/TailwindIndicator'

import { RootLayoutProviders } from './providers'
import styles from './styles.module.css'

// const inter = Inter({ subsets: ['latin'] })

const toastOptions: DefaultToastOptions = {
  duration: 5000,
  success: {
    duration: 4000
  },
  error: {
    duration: 6000
  }
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <div className={cs(styles.container, inter.className)}>
    <div className={styles.container}>
      <RootLayoutProviders>
        <Header className={styles.header} />

        <main className={styles.main}>{children}</main>

        <Toaster position='bottom-right' toastOptions={toastOptions} />
        <TailwindIndicator />

        <Footer className={styles.footer} />
      </RootLayoutProviders>
    </div>
  )
}
