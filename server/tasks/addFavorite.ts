import type { Show } from '../../contract/show.ts'
import { ApiError } from '../api/apiError.ts'
import { getShow } from '../api/tvmaze/getShow.ts'
import { readCache, writeCache } from '../stores/cache.ts'
import { listFavorites, putFavorite } from '../stores/favorite.ts'
import type { Outcome } from '../types/outcome.ts'

// Добавить шоу в избранное по id. Само шоу берём из кеша или из TVmaze, а не от сайта: в избранном только настоящие данные.
export async function addFavorite(id: number): Promise<Outcome<Show[]>> {
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

  putFavorite(show)
  return { status: 'success', data: listFavorites() }
}
