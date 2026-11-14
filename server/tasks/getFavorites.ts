import type { Show } from '../../contract/show.ts'
import { listFavorites } from '../stores/favorite.ts'
import type { Outcome } from '../types/outcome.ts'

export function getFavorites(): Outcome<Show[]> {
  return { status: 'success', data: listFavorites() }
}
