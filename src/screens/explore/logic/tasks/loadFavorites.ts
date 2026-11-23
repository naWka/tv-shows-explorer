import { ApiError } from '@api/apiError'
import { getFavorites } from '@api/favorites/getFavorites'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { forgetSession } from '@tasks/session/forgetSession'
import type { FavoritesOutcome } from '@app-types/favorites'

// Загрузить избранное с сервера в стор. Сервер забыл ключ — забываем вход и мы.
export async function loadFavorites(): Promise<FavoritesOutcome> {
  try {
    favoritesStore.setShows(await getFavorites())
    return { status: 'success' }
  } catch (error) {
    const kind = error instanceof ApiError ? error.kind : 'unreadable'
    if (kind === 'unauthorized') forgetSession()
    return { status: 'error', error: kind }
  }
}
