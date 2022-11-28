'use client'

import * as React from 'react'
import { signOut, useSession } from 'next-auth/react'

import * as config from '@/lib/config'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/Popover/Popover'
import {
  GitHub,
  InfoIcon,
  LogoutIcon,
  Moon,
  Sun,
  Twitter,
  WatchlistIcon
} from '@/icons'
import { useTheme } from '@/lib/hooks/use-theme'

import { ActiveLink } from '../ActiveLink/ActiveLink'
import { IconMenuItem } from './IconMenuItem'

export function UserDropdown() {
  const { data: session } = useSession()
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className='relative inline-block text-left'>
      <Popover>
        <PopoverTrigger>
          <button className='flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-10 sm:w-10'>
            {session && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={session?.user?.email || 'Avatar for logged in user'}
                src={`https://avatars.dicebear.com/api/identicon/${session?.user?.email}.svg?scale=50`}
              />
            )}
          </button>
        </PopoverTrigger>

        <PopoverContent align='end'>
          <div className='w-full rounded-md bg-white p-1 sm:w-56 flex flex-col gap-0'>
            <ActiveLink
              href='/watchlist'
              className='relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              activeClassName='opacity-50 transition-none hover:bg-transparent'
            >
              <IconMenuItem
                text='Watchlist'
                icon={<WatchlistIcon className='h-4 w-4' />}
              />
            </ActiveLink>

            <ActiveLink
              href='/about'
              className='relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              activeClassName='opacity-50 transition-none hover:bg-transparent'
            >
              <IconMenuItem
                text='About'
                icon={<InfoIcon className='h-4 w-4' />}
              />
            </ActiveLink>

            <button
              className='relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              aria-label='Toggle dark mode'
              onClick={toggleDarkMode}
            >
              <IconMenuItem
                text='Toggle dark mode'
                icon={
                  isDarkMode ? (
                    <Moon className='h-4 w-4' />
                  ) : (
                    <Sun className='h-4 w-4' />
                  )
                }
              />
            </button>

            <a
              className='relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              href={config.twitterUrl}
              title={`Twitter ${config.twitter}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconMenuItem
                text='Twitter'
                icon={<Twitter className='h-4 w-4' />}
              />
            </a>

            <a
              className='relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              href={config.githubRepoUrl}
              title='View source on GitHub'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconMenuItem
                text='GitHub'
                icon={<GitHub className='h-4 w-4' />}
              />
            </a>

            <button
              className='relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
              onClick={() => signOut()}
            >
              <IconMenuItem
                text='Logout'
                icon={<LogoutIcon className='h-4 w-4' />}
              />
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
