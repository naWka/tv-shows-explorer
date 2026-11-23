import { ApiError } from '@api/apiError'
import { putFavorite } from '@api/favorites/putFavorite'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { forgetSession } from '@tasks/session/forgetSession'
import type { FavoritesOutcome } from '@app-types/favorites'

// Добавить шоу в избранное: сервер сохраняет его и присылает обновлённый список, список кладём в стор.
// Сервер забыл ключ — забываем вход и мы.
export async function addFavorite(id: number): Promise<FavoritesOutcome> {
  try {
    favoritesStore.setShows(await putFavorite(id))
    return { status: 'success' }
  } catch (error) {
    const kind = error instanceof ApiError ? error.kind : 'unreadable'
    if (kind === 'unauthorized') forgetSession()
    return { status: 'error', error: kind }
  }
}
