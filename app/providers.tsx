'use client'

import { ThemeProvider } from 'next-themes'

import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { bootstrap } from '@/lib/bootstrap'

bootstrap()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange defaultTheme='dark'>
      <YouTubeDialog>{children}</YouTubeDialog>
    </ThemeProvider>
  )
}
