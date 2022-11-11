'use client'

import { MovieSearchOptions } from '@/components/MovieSearchOptions/MovieSearchOptions'
import { YouTubeDialog } from '@/components/YouTubeDialog/YouTubeDialog'

export default function SearchPage() {
  return (
    <YouTubeDialog>
      <MovieSearchOptions />
    </YouTubeDialog>
  )
}
