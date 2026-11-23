import { closeSession } from '../stores/sessions.ts'

// Выйти: сервер забывает ключ. Незнакомый ключ или его отсутствие — тоже выход: сессии уже нет.
export function logOut(token: string | null) {
  if (token) closeSession(token)
}
