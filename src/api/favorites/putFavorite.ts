import { requestJson } from '@api/client'
import type { Show } from '@contract/show'

export async function putFavorite(id: number): Promise<Show[]> {
  return (await requestJson(`/favorites/${id}`, { method: 'PUT' })) as Show[]
}
