'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'

type ActiveLinkProps = LinkProps & {
  children: React.ReactElement
  className?: string
  style?: React.CSSProperties
}

export const ActiveLink = ({
  children,
  href,
  style,
  onClick,
  ...props
}: ActiveLinkProps) => {
  const pathname = usePathname()
  const [disabled, setDisabled] = React.useState(false)

  React.useEffect(() => {
    const linkPathname = new URL(href as string, location.href).pathname

    setDisabled(linkPathname === pathname)
  }, [pathname, href])

  const styleOverride = React.useMemo<React.CSSProperties>(
    () =>
      disabled
        ? {
            pointerEvents: 'none',
            ...style
          }
        : style ?? {},
    [disabled, style]
  )

  const onClickOverride = React.useCallback(
    (event: React.MouseEvent) => {
      if (disabled) {
        event.preventDefault()
        return false
      }

      if (onClick) {
        return onClick(event)
      }
    },
    [disabled, onClick]
  )

  return (
    <Link
      {...props}
      href={href}
      style={styleOverride}
      onClick={onClickOverride}
    >
      {children}
    </Link>
  )
}
