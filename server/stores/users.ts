import type { Show } from '../../contract/show.ts'

// Пользователь — это его email и его избранное: пароля и других данных нет. Избранное лежит внутри пользователя,
// поэтому вышел и вошёл под тем же email — список на месте. Ключ — email.
type User = { email: string; favorites: Record<number, { show: Show; addedAt: number }> }

const users: Record<string, User> = {}

/** Завести пользователя при первом входе. Если он уже есть, ничего не меняется. */
export function ensureUser(email: string) {
  users[email] ??= { email, favorites: {} }
}

export function putFavorite(email: string, show: Show) {
  const { favorites } = users[email]
  if (favorites[show.id]) return
  favorites[show.id] = { show, addedAt: Date.now() }
}

export function dropFavorite(email: string, id: number) {
  delete users[email].favorites[id]
}

/** Сначала то, что добавили последним. */
export function listFavorites(email: string): Show[] {
  return Object.values(users[email].favorites)
    .sort((a, b) => b.addedAt - a.addedAt)
    .map((entry) => entry.show)
}
