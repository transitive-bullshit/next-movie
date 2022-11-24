'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import cs from 'clsx'

import { CrossIcon } from '@/icons'

import styles from './styles.module.css'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

type PopoverContentPrimitiveProps = React.ComponentProps<
  typeof PopoverPrimitive.Content
>

export const PopoverContent: React.FC<PopoverContentPrimitiveProps> =
  React.forwardRef(function PopoverContent(
    { children, className, ...props },
    forwardedRef
  ) {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cs(styles.popoverContent, className)}
          sideOffset={5}
          {...props}
          ref={forwardedRef}
        >
          {children}

          <PopoverPrimitive.Close
            className={styles.popoverClose}
            aria-label='Close'
          >
            <CrossIcon />
          </PopoverPrimitive.Close>

          <PopoverPrimitive.Arrow className={styles.popoverArrow} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    )
  })
