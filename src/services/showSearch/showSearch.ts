import { fetchShowSearch } from '../../api/tvmaze/client'
import type { ShowSearchResult } from '../../types/showSearch'
import { toErrorMessage } from './toErrorMessage'
import { toShows } from './toShow'

const TYPING_PAUSE_MS = 400

const IDLE: ShowSearchResult = { status: 'idle', shows: [], error: null }
const LOADING: ShowSearchResult = { status: 'loading', shows: [], error: null }

export type ShowSearch = {
  search: (query: string) => void
  retry: () => void
  dispose: () => void
}

export function createShowSearch(onChange: (result: ShowSearchResult) => void): ShowSearch {
  let timer: ReturnType<typeof setTimeout> | undefined
  let controller: AbortController | undefined
  let lastQuery = ''
  // Запрос, чей результат сейчас на экране или ещё в пути: повторять его незачем.
  let current: string | null = null

  const cancel = () => {
    clearTimeout(timer)
    controller?.abort()
  }

  const run = async (query: string) => {
    cancel()
    controller = new AbortController()
    const { signal } = controller
    lastQuery = query
    current = query
    onChange(LOADING)

    try {
      const items = await fetchShowSearch(query, signal)
      if (signal.aborted) return
      onChange({ status: 'success', shows: toShows(items), error: null })
    } catch (error) {
      if (signal.aborted) return
      current = null
      onChange({ status: 'error', shows: [], error: toErrorMessage(error) })
    }
  }

  return {
    search(query) {
      const trimmed = query.trim()
      clearTimeout(timer)
      if (trimmed && trimmed === current) return

      cancel()
      current = null

      if (!trimmed) {
        onChange(IDLE)
        return
      }

      timer = setTimeout(() => void run(trimmed), TYPING_PAUSE_MS)
    },
    retry() {
      if (lastQuery) void run(lastQuery)
    },
    dispose: cancel,
  }
}
