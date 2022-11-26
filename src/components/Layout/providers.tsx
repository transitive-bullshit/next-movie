'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'

export function RootLayoutProviders({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      <YouTubeDialog>{children}</YouTubeDialog>
    </ThemeProvider>
  )
}
