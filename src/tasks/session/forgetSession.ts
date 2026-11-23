import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { userStore } from '@stores/userStore/userStore'
import { SESSION_STORAGE_KEY } from './storageKey'

// Забыть вход: пользователя, его ключ и его избранное — в сторах и в localStorage. Поиск остаётся: он открыт и гостю.
export function forgetSession() {
  userStore.setEmail(null)
  userStore.setToken(null)
  favoritesStore.setShows([])
  localStorage.removeItem(SESSION_STORAGE_KEY)
}
