import type { Show } from '../../contract/show.ts'
import type { ShowsPage } from '../../contract/showsPage.ts'
import { ApiError } from '../api/apiError.ts'
import { getShows } from '../api/tvmaze/getShows.ts'
import { readCache, writeCache } from '../stores/cache.ts'
import type { Outcome } from '../types/outcome.ts'

const PAGE_SIZE = 3

// Найти шоу по запросу и отдать одну страницу: выдачу берём из кеша или из TVmaze, оставляем шоу жанра, режем по три.
export async function searchShows(query: string, genre: string | null, page: number): Promise<Outcome<ShowsPage>> {
  const key = `search:${query.toLowerCase()}`
  let shows = readCache<Show[]>(key)

  if (!shows) {
    try {
      shows = await getShows(query)
    } catch (error) {
      if (error instanceof ApiError) return { status: 'error', error: error.kind }
      throw error
    }
    writeCache(key, shows)
  }

  const found = genre ? shows.filter((show) => show.genres.includes(genre)) : shows
  const pageCount = Math.ceil(found.length / PAGE_SIZE)
  // Страницы с таким номером уже нет (выдача в TVmaze сменилась) — отдаём последнюю.
  const current = Math.min(page, Math.max(pageCount, 1))
  const offset = (current - 1) * PAGE_SIZE

  return {
    status: 'success',
    data: {
      shows: found.slice(offset, offset + PAGE_SIZE),
      page: current,
      pageCount,
      offset,
      found: found.length,
      total: shows.length,
      genre,
      genres: countGenres(shows),
    },
  }
}

function countGenres(shows: Show[]): ShowsPage['genres'] {
  const counts = new Map<string, number>()

  for (const show of shows) {
    for (const name of show.genres) counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
