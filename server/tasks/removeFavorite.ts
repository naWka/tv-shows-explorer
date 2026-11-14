import type { Show } from '../../contract/show.ts'
import { dropFavorite, listFavorites } from '../stores/favorite.ts'
import type { Outcome } from '../types/outcome.ts'

// Убрать шоу из избранного. Если его там нет, список просто не меняется.
export function removeFavorite(id: number): Outcome<Show[]> {
  dropFavorite(id)
  return { status: 'success', data: listFavorites() }
}
