import { ApiError } from '@api/apiError'
import { getShowsPage } from '@api/shows/getShowsPage'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ShowSearchOutcome, ShowSearchRequest } from '@app-types/showSearch'
import { clearSearch } from './clearSearch'

// Получить страницу выдачи и положить её в стор. Неудачный поиск выдачу стирает, оборванный стор не трогает.
export async function searchShows(request: ShowSearchRequest, signal: AbortSignal): Promise<ShowSearchOutcome> {
  try {
    const result = await getShowsPage(request.query, request.genre, request.page, signal)
    if (signal.aborted) return { status: 'cancelled' }

    // Новая выдача — та, что пришла по другому запросу. Другая страница или жанр того же запроса — та же выдача.
    const isNew = request.query !== searchStore.shownQuery
    searchStore.setResult(result)
    searchStore.setShownQuery(request.query)
    searchStore.setIsResultNew(isNew)
    if (isNew) searchStore.setResultId(searchStore.resultId + 1)
    return { status: 'success' }
  } catch (error) {
    if (signal.aborted) return { status: 'cancelled' }

    clearSearch()
    return { status: 'error', error: error instanceof ApiError ? error.kind : 'unreadable' }
  }
}
