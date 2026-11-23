import { randomUUID } from 'node:crypto'

// Токен — случайный ключ сессии, а не сам email: выход его отзывает, и по адресу чужой ключ не угадать.
// Ключ → email владельца. Пользователь с этим email уже заведён в users.ts: сессия открывается только при входе.
const sessions: Record<string, string> = {}

/** Открыть сессию: отдаёт её ключ. */
export function openSession(email: string): string {
  const token = randomUUID()
  sessions[token] = email
  return token
}

/** Email владельца сессии. undefined — такой сессии нет: не входили, вышли или сервер её забыл. */
export function findSessionEmail(token: string): string | undefined {
  return sessions[token]
}

export function closeSession(token: string) {
  delete sessions[token]
}
