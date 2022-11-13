import { PageHead } from '@/components/PageHead/PageHead'

export default function Head() {
  const pathname = `/search`
  return (
    <PageHead
      title='Movie Search'
      description='Search tens of thousands of the best movies ever made.'
      pathname={pathname}
    />
  )
}
