import { userStore } from '@stores/userStore/userStore'
import type { Session } from '@contract/session'
import { SESSION_STORAGE_KEY } from '@tasks/session/storageKey'

// Вернуть вход после перезагрузки: email и ключ лежат в localStorage с последнего входа.
export function restoreSession() {
  const saved = localStorage.getItem(SESSION_STORAGE_KEY)
  if (saved === null) return

  const session = JSON.parse(saved) as Session
  userStore.setEmail(session.email)
  userStore.setToken(session.token)
}
