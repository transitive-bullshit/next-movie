'use client'

import * as React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

import styles from './styles.module.css'

type TooltipPrimitiveProps = React.ComponentProps<typeof RadixTooltip.Root>

export const Tooltip: React.FC<
  {
    content: React.ReactNode
    children: React.ReactNode
  } & TooltipPrimitiveProps
> = React.forwardRef(function Tooltip({ content, children, ...props }) {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root {...props}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>

        <RadixTooltip.Portal className={styles.tooltipPortal}>
          <RadixTooltip.Content
            className={styles.tooltipContent}
            sideOffset={5}
          >
            {content}
            <RadixTooltip.Arrow className={styles.tooltipArrow} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
})

// export const TooltipProvider = RadixTooltip.Provider
