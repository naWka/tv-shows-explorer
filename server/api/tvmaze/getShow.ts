import type { Show } from '../../../contract/show.ts'
import { ApiError } from '../apiError.ts'
import { getJson } from './client.ts'
import { toShow } from './toShow.ts'
import type { TvmazeShow } from './types.ts'

export async function getShow(id: number): Promise<Show> {
  const data = await getJson(`/shows/${id}`)

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ApiError('unreadable')
  }

  return toShow(data as TvmazeShow)
}
