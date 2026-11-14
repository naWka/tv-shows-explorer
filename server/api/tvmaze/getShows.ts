import type { Show } from '../../../contract/show.ts'
import { ApiError } from '../apiError.ts'
import { getJson } from './client.ts'
import { toShows } from './toShow.ts'
import type { TvmazeSearchItem } from './types.ts'

export async function getShows(query: string): Promise<Show[]> {
  const data = await getJson(`/search/shows?q=${encodeURIComponent(query)}`)

  if (!Array.isArray(data)) {
    throw new ApiError('unreadable')
  }

  return toShows(data as TvmazeSearchItem[])
}
