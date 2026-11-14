import type { Show } from '../../contract/show.ts'

// Избранное одно на всех посетителей (двадцать восьмое правило). Ключ — id шоу.
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
