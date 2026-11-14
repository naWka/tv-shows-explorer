import { ApiError } from '@api/apiError'
import { putFavorite } from '@api/favorites/putFavorite'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import type { FavoritesOutcome } from '@app-types/favorites'

// Добавить шоу в избранное: сервер сохраняет его и присылает обновлённый список, список кладём в стор.
export async function addFavorite(id: number): Promise<FavoritesOutcome> {
  try {
    favoritesStore.setShows(await putFavorite(id))
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
