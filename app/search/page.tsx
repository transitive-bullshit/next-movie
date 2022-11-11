'use client'

import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'
import { Search } from '@/lib/hooks/search'

export default function SearchPage() {
  return (
    <YouTubeDialog>
      <Search.Provider>
        <MovieSearchOptions />
      </Search.Provider>
    </YouTubeDialog>
  )
}
