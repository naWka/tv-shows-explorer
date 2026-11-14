import { requestJson } from '@api/client'
import type { ShowsPage } from '@contract/showsPage'

export async function getShowsPage(
  query: string,
  genre: string | null,
  page: number,
  signal: AbortSignal,
): Promise<ShowsPage> {
  const params = new URLSearchParams({ q: query, page: String(page) })
  if (genre) params.set('genre', genre)

  return (await requestJson(`/shows?${params}`, { signal })) as ShowsPage
}
