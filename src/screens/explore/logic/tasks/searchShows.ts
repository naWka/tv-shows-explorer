import { ApiError } from '@api/apiError'
import { getShowsPage } from '@api/shows/getShowsPage'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ShowSearchOutcome, ShowSearchRequest } from '@app-types/showSearch'

// Получить страницу выдачи и положить её в стор. Неудачный поиск выдачу стирает, оборванный стор не трогает.
export async function searchShows(request: ShowSearchRequest, signal: AbortSignal): Promise<ShowSearchOutcome> {
  try {
    const result = await getShowsPage(request.query, request.genre, request.page, signal)
    if (signal.aborted) return { status: 'cancelled' }

    searchStore.setResult(result, request.query)
    return { status: 'success' }
  } catch (error) {
    if (signal.aborted) return { status: 'cancelled' }

    searchStore.clearResult()
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
