'use client'

import * as React from 'react'
import { unstable_serialize, SWRConfig } from 'swr'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { ISearchOptionsConfig, SearchOptions } from '@/lib/hooks/search-options'
import { Search } from '@/lib/hooks/search'

export function Providers({
  children,
  fallbackData = [],
  searchOptionsConfig
}: {
  children: React.ReactNode
  fallbackData?: Array<{ key: any; value: any }>
  searchOptionsConfig: ISearchOptionsConfig
}) {
  const fallback = React.useMemo(
    () => ({
      fallback: Object.fromEntries(
        fallbackData.map((d) => [unstable_serialize(d.key), d.value])
      )
    }),
    [fallbackData]
  )

  return (
    <YouTubeDialog>
      <SWRConfig value={fallback}>
        <SearchOptions.Provider initialState={searchOptionsConfig}>
          <Search.Provider>{children}</Search.Provider>
        </SearchOptions.Provider>
      </SWRConfig>
    </YouTubeDialog>
  )
}
