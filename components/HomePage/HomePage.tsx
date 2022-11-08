import * as React from 'react'

import { DefaultToastOptions, Toaster } from 'react-hot-toast'

import { Footer } from '@/components/Footer/Footer'
import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { PageHead } from '@/components/PageHead/PageHead'
import { githubRepoUrl } from '@/lib/config'

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

export const HomePage: React.FC = () => {
  return (
    <>
      <PageHead />

      <div className={styles.container}>
        <GitHubShareButton repoUrl={githubRepoUrl} />

        <main className={styles.main}>
          <p>TODO</p>
        </main>

        <Toaster position='top-right' toastOptions={toastOptions} />

        <Footer />
      </div>
    </>
  )
}
