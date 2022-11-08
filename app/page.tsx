import { GitHubShareButton } from '@/components/GitHubShareButton/GitHubShareButton'
import { githubRepoUrl } from '@/lib/config'

// import styles from './styles.module.css'

export default function HomePage() {
  return (
    <>
      <GitHubShareButton repoUrl={githubRepoUrl} />

      <p>TODO</p>
    </>
  )
}
