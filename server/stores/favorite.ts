import type { Show } from '../../contract/show.ts'

// Избранное одно на всех посетителей: так написано в задании, а входа на сайте нет. Ключ — id шоу.
// Понадобится своё у каждого браузера — сервер выдаёт cookie с идентификатором, и он проходит через маршрут,
// таску и стор; сайт не меняется.
const favorite: Record<number, { show: Show; addedAt: number }> = {}

export function putFavorite(show: Show) {
  if (favorite[show.id]) return
  favorite[show.id] = { show, addedAt: Date.now() }
}

export function dropFavorite(id: number) {
  delete favorite[id]
}

/** Сначала то, что добавили последним. */
export function listFavorites(): Show[] {
  return Object.values(favorite)
    .sort((a, b) => b.addedAt - a.addedAt)
    .map((entry) => entry.show)
}
