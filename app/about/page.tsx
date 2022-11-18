import styles from './styles.module.css'

import * as config from '@/lib/config'
import { About } from '@/components/About/About'

export default async function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.meta}>
        <h1 className={styles.title}>Next Movie</h1>
        <p className={styles.detail}>
          By{' '}
          <a
            href={config.twitterUrl}
            title={`Twitter ${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            Travis Fischer
          </a>
        </p>
      </div>

      <About />
    </div>
  )
}
