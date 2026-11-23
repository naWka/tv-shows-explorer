import type { Show } from '../../contract/show.ts'
import { findSessionEmail } from '../stores/sessions.ts'
import { dropFavorite, listFavorites } from '../stores/users.ts'
import type { Outcome } from '../types/outcome.ts'

// Убрать шоу из избранного того, кто зовёт. Если шоу там нет, список просто не меняется.
export function removeFavorite(token: string | null, id: number): Outcome<Show[]> {
  const email = token && findSessionEmail(token)
  if (!email) return { status: 'error', error: 'unauthorized' }

  dropFavorite(email, id)
  return { status: 'success', data: listFavorites(email) }
}
