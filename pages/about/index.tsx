import { Layout } from '@/components/Layout/Layout'
import { About } from '@/components/About/About'
import * as config from '@/lib/config'

import styles from './styles.module.css'

export default function AboutPage() {
  return (
    <Layout>
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
    </Layout>
  )
}
