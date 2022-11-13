'use client'

import { ThemeProvider } from 'next-themes'

import { bootstrap } from '@/lib/bootstrap'

bootstrap()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange defaultTheme='dark'>
      {children}
    </ThemeProvider>
  )
}
