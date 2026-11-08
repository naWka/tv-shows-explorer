import { fetchShowSearch } from '@api/tvmaze/client'
import type { ShowSearchResult } from '@app-types/showSearch'
import { toErrorMessage } from './toErrorMessage'
import { toShows } from './toShow'

// Столько ждём после последней буквы. Хватает, чтобы рукой стереть букву и вернуть её без лишнего запроса.
const TYPING_PAUSE_MS = 700

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
  // Запрос, чья выдача сейчас на экране. Вернулись к нему, пока новый запрос ждал паузы, — прежняя выдача и есть ответ.
  let shown: string | null = null
  // Запрос, который ждёт паузы во вводе или уже в пути: повторять его незачем.
  let pending: string | null = null
  let inFlight = false

  const cancel = () => {
    clearTimeout(timer)
    controller?.abort()
    pending = null
    inFlight = false
  }

  const finish = (query: string | null, result: ShowSearchResult) => {
    pending = null
    inFlight = false
    shown = query
    onChange(result)
  }

  const run = async (query: string) => {
    cancel()
    controller = new AbortController()
    const { signal } = controller
    lastQuery = query
    pending = query
    inFlight = true
    onChange(LOADING)

    try {
      const items = await fetchShowSearch(query, signal)
      if (signal.aborted) return
      finish(query, { status: 'success', shows: toShows(items), error: null })
    } catch (error) {
      if (signal.aborted) return
      finish(null, { status: 'error', shows: [], error: toErrorMessage(error) })
    }
  }

  return {
    search(query) {
      const trimmed = query.trim()
      if (trimmed === pending) return

      if (!trimmed) {
        cancel()
        finish(null, IDLE)
        return
      }

      // Стёрли букву и вернули её до конца паузы: запрос ещё не ушёл, на экране выдача по этому же запросу —
      // отменяем ожидание и оставляем всё как есть, вместе с жанром и страницей. Если запрос уже в пути, экран
      // приглушён, и вернуть его можно только новой выдачей.
      if (trimmed === shown && !inFlight) {
        cancel()
        return
      }

      cancel()
      pending = trimmed
      timer = setTimeout(() => void run(trimmed), TYPING_PAUSE_MS)
    },
    retry() {
      if (lastQuery) void run(lastQuery)
    },
    dispose: cancel,
  }
}
