'use client'

import * as React from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'

import styles from './styles.module.css'

// TODO: work with forwardRef

export const Tooltip: React.FC<{
  content: React.ReactNode
  children: React.ReactNode
}> = ({ content, children }) => {
  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
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
}
