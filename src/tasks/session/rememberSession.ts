import { userStore } from '@stores/userStore/userStore'
import type { Session } from '@contract/session'
import { SESSION_STORAGE_KEY } from './storageKey'

// Запомнить вход: email и ключ — в стор и в localStorage, чтобы вход пережил перезагрузку.
export function rememberSession(session: Session) {
  userStore.setEmail(session.email)
  userStore.setToken(session.token)
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}
