'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { unstable_serialize, SWRConfig } from 'swr'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { SearchOptions } from '@/lib/hooks/search-options'
import { bootstrap } from '@/lib/bootstrap'

bootstrap()

export function RootLayoutProviders({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider disableTransitionOnChange defaultTheme='dark'>
      <YouTubeDialog>{children}</YouTubeDialog>
    </ThemeProvider>
  )
}

export function RootPageProviders({
  children,
  fallbackData = []
}: {
  children: React.ReactNode
  fallbackData?: Array<{ key: any; value: any }>
}) {
  // TODO: https://github.com/vercel/swr/issues/2234
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
    <SWRConfig value={fallback}>
      <SearchOptions.Provider>{children}</SearchOptions.Provider>
    </SWRConfig>
  )
}
