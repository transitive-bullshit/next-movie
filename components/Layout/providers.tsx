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
    <ThemeProvider disableTransitionOnChange defaultTheme='dark'>
      <YouTubeDialog>{children}</YouTubeDialog>
    </ThemeProvider>
  )
}
