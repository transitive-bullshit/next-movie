'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'
import cs from 'clsx'

type ActiveLinkProps = LinkProps & {
  children?: React.ReactNode
  className?: string
  activeClassName?: string
  style?: React.CSSProperties
}

/**
 * Link that will be disabled if the target `href` is the same as the current
 * route's pathname.
 */
export const ActiveLink = ({
  children,
  href,
  style,
  className,
  activeClassName,
  onClick,
  prefetch,
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
            ...style,
            pointerEvents: 'none'
          }
        : style ?? {},
    [disabled, style]
  )

  const onClickOverride = React.useCallback(
    (event: any): void => {
      if (disabled) {
        event.preventDefault()
        return
      }

      if (onClick) {
        onClick(event)
        return
      }
    },
    [disabled, onClick]
  )

  return (
    <Link
      {...props}
      className={cs(className, disabled && activeClassName)}
      href={href}
      prefetch={disabled ? false : prefetch}
      style={styleOverride}
      onClick={onClickOverride}
    >
      {children}
    </Link>
  )
}
