'use client'

import { unstable_serialize, SWRConfig } from 'swr'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { Search } from '@/lib/hooks/search'
import { defaultSearchOptions } from '@/lib/config'

export function Providers({
  children,
  fallbackData
}: {
  children: React.ReactNode
  fallbackData?: any
}) {
  const fallback = {
    [unstable_serialize({
      url: '/api/search',
      key: 'search',
      body: defaultSearchOptions
    })]: fallbackData
  }

  return (
    <YouTubeDialog>
      <SWRConfig value={{ fallback }}>
        <Search.Provider>{children}</Search.Provider>
      </SWRConfig>
    </YouTubeDialog>
  )
}
