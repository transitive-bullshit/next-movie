'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange defaultTheme='dark'>
      {children}
    </ThemeProvider>
  )
}
