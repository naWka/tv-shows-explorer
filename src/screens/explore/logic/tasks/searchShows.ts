import { ApiError } from '@api/apiError'
import { getShows } from '@api/tvmaze/getShows'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ShowSearchOutcome } from '@app-types/showSearch'

// Найти шоу по запросу и положить выдачу в стор. Неудачный поиск выдачу стирает, оборванный стор не трогает.
export async function searchShows(query: string, signal: AbortSignal): Promise<ShowSearchOutcome> {
  try {
    const shows = await getShows(query, signal)
    if (signal.aborted) return { status: 'cancelled' }

    searchStore.setShows(shows, query)
    return { status: 'success' }
  } catch (error) {
    if (signal.aborted) return { status: 'cancelled' }

    searchStore.clearShows()
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
