'use client'

import * as React from 'react'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { ISearchOptionsConfig, SearchOptions } from '@/lib/hooks/search-options'

export function Providers({
  children,
  searchOptionsConfig
}: {
  children: React.ReactNode
  searchOptionsConfig: ISearchOptionsConfig
}) {
  return (
    <YouTubeDialog>
      <SearchOptions.Provider initialState={searchOptionsConfig}>
        {children}
      </SearchOptions.Provider>
    </YouTubeDialog>
  )
}
