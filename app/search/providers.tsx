'use client'

import * as React from 'react'
import { unstable_serialize, SWRConfig } from 'swr'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { SearchOptions } from '@/lib/hooks/search-options'

export function Providers({
  children,
  fallbackData = []
}: {
  children: React.ReactNode
  fallbackData?: Array<{ key: any; value: any }>
}) {
  const fallback = React.useMemo(
    () => ({
      fallback: Object.fromEntries(
        fallbackData.map((d) => [
          `$inf$${unstable_serialize(d.key)}`,
          [d.value]
        ])
      )
    }),
    [fallbackData]
  )

  // console.log('fallback', Object.keys(fallback.fallback)[0])

  return (
    <YouTubeDialog>
      <SWRConfig value={fallback}>
        <SearchOptions.Provider>{children}</SearchOptions.Provider>
      </SWRConfig>
    </YouTubeDialog>
  )
}
