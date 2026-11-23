import type { Show } from '../../contract/show.ts'
import { findSessionEmail } from '../stores/sessions.ts'
import { listFavorites } from '../stores/users.ts'
import type { Outcome } from '../types/outcome.ts'

export function getFavorites(token: string | null): Outcome<Show[]> {
  const email = token && findSessionEmail(token)
  if (!email) return { status: 'error', error: 'unauthorized' }

  return { status: 'success', data: listFavorites(email) }
}
