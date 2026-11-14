import { ApiError } from '@api/apiError'
import type { Show } from '@app-types/show'
import { getJson } from './client'
import { toShows } from './toShow'
import type { TvmazeSearchItem } from './types'

export async function getShows(query: string, signal: AbortSignal): Promise<Show[]> {
  const data = await getJson(`/search/shows?q=${encodeURIComponent(query)}`, signal)

  if (!Array.isArray(data)) {
    throw new ApiError('unreadable')
  }

  return toShows(data as TvmazeSearchItem[])
}
