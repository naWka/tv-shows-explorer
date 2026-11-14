import { requestJson } from '@api/client'
import type { Show } from '@contract/show'

export async function getFavorites(): Promise<Show[]> {
  return (await requestJson('/favorites')) as Show[]
}
