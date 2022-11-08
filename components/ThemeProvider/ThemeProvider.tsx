import * as React from 'react'

import {
  ChakraProvider,
  type ThemeConfig,
  extendTheme,
  useColorMode as useChakraColorMode
} from '@chakra-ui/react'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme
} from 'next-themes'

export type UseThemeProps = {
  resolvedTheme?: 'light' | 'dark'
}

/**
 * Syncs next-themes dark mode provider with Chakra UI theme provider.
 *
 * @see https://github.com/pacocoursey/next-themes/issues/59
 */
export const ThemeProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  return (
    <NextThemeProvider>
      <ChakraSyncedThemeProvider>{children}</ChakraSyncedThemeProvider>
    </NextThemeProvider>
  )
}

export const ChakraSyncedThemeProvider = ({
  children
}: React.PropsWithChildren<unknown>) => {
  const { resolvedTheme } = useNextTheme() as UseThemeProps
  const colorModeConfig = React.useMemo<ThemeConfig>(
    () => ({
      initialColorMode: resolvedTheme,
      useSystemColorMode: true
    }),
    [resolvedTheme]
  )
  const theme = extendTheme({ ...colorModeConfig })

  return (
    <ChakraProvider theme={theme}>
      <ChakraColorModeSync />

      {children}
    </ChakraProvider>
  )
}

export const ChakraColorModeSync = () => {
  const { resolvedTheme } = useNextTheme() as UseThemeProps
  const { setColorMode } = useChakraColorMode()

  React.useEffect(() => {
    if (resolvedTheme) {
      setColorMode(resolvedTheme)
    }
  }, [resolvedTheme, setColorMode])

  return null
}
