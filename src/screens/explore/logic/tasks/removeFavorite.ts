import { ApiError } from '@api/apiError'
import { deleteFavorite } from '@api/favorites/deleteFavorite'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import type { FavoritesOutcome } from '@app-types/favorites'

// Убрать шоу из избранного: сервер присылает обновлённый список, список кладём в стор.
export async function removeFavorite(id: number): Promise<FavoritesOutcome> {
  try {
    favoritesStore.setShows(await deleteFavorite(id))
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
