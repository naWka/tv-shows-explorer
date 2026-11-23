import type { Session } from '../../contract/session.ts'
import { openSession } from '../stores/sessions.ts'
import { ensureUser } from '../stores/users.ts'
import type { Outcome } from '../types/outcome.ts'

// Войти по email: пароля нет, первый вход заводит пользователя, каждый вход открывает новую сессию.
export function logIn(email: string): Outcome<Session> {
  ensureUser(email)
  return { status: 'success', data: { email, token: openSession(email) } }
}
