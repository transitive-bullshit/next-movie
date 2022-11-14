'use client'

import { unstable_serialize, SWRConfig } from 'swr'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { Search } from '@/lib/hooks/search'

export function Providers({
  children,
  fallbackData = []
}: {
  children: React.ReactNode
  fallbackData?: Array<{ key: any; value: any }>
}) {
  const fallback = Object.fromEntries(
    fallbackData.map((d) => [unstable_serialize(d.key), d.value])
  )

  return (
    <YouTubeDialog>
      <SWRConfig value={{ fallback }}>
        <Search.Provider>{children}</Search.Provider>
      </SWRConfig>
    </YouTubeDialog>
  )
}
