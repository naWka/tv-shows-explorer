import { requestJson } from '@api/client'
import type { Show } from '@contract/show'

export async function deleteFavorite(id: number): Promise<Show[]> {
  return (await requestJson(`/favorites/${id}`, { method: 'DELETE' })) as Show[]
}
