import { ApiError } from '@api/apiError'
import { getFavorites } from '@api/favorites/getFavorites'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import type { FavoritesOutcome } from '@app-types/favorites'

// Загрузить избранное с сервера в стор.
export async function loadFavorites(): Promise<FavoritesOutcome> {
  try {
    favoritesStore.setShows(await getFavorites())
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
