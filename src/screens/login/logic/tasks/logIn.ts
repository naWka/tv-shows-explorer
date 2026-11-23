import { ApiError } from '@api/apiError'
import { postSession } from '@api/session/postSession'
import { rememberSession } from '@tasks/session/rememberSession'
import type { LogInOutcome } from '@app-types/session'

// Войти по email: сервер открывает сессию, сайт её запоминает.
export async function logIn(email: string): Promise<LogInOutcome> {
  try {
    rememberSession(await postSession(email))
    return { status: 'success' }
  } catch (error) {
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
