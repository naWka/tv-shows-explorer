import { ApiError } from '@api/apiError'
import { deleteFavorite } from '@api/favorites/deleteFavorite'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { forgetSession } from '@tasks/session/forgetSession'
import type { FavoritesOutcome } from '@app-types/favorites'

// Убрать шоу из избранного: сервер присылает обновлённый список, список кладём в стор.
// Сервер забыл ключ — забываем вход и мы.
export async function removeFavorite(id: number): Promise<FavoritesOutcome> {
  try {
    favoritesStore.setShows(await deleteFavorite(id))
    return { status: 'success' }
  } catch (error) {
    const kind = error instanceof ApiError ? error.kind : 'unreadable'
    if (kind === 'unauthorized') forgetSession()
    return { status: 'error', error: kind }
  }
}
