import type { Show } from '../../contract/show.ts'
import { ApiError } from '../api/apiError.ts'
import { getShow } from '../api/tvmaze/getShow.ts'
import { readCache, writeCache } from '../stores/cache.ts'
import { findSessionEmail } from '../stores/sessions.ts'
import { listFavorites, putFavorite } from '../stores/users.ts'
import type { Outcome } from '../types/outcome.ts'

// Добавить шоу в избранное того, кто зовёт. Само шоу берём из кеша или из TVmaze, а не от сайта:
// в избранном только настоящие данные. Сессию проверяем до TVmaze: гостю незачем ждать его ответа.
export async function addFavorite(token: string | null, id: number): Promise<Outcome<Show[]>> {
  const email = token && findSessionEmail(token)
  if (!email) return { status: 'error', error: 'unauthorized' }

  const key = `show:${id}`
  let show = readCache<Show>(key)

  if (!show) {
    try {
      show = await getShow(id)
    } catch (error) {
      if (error instanceof ApiError) return { status: 'error', error: error.kind }
      throw error
    }
    writeCache(key, show)
  }

  putFavorite(email, show)
  return { status: 'success', data: listFavorites(email) }
}
