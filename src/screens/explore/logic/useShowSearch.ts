import { useEffect, useRef, useState } from 'react'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ApiErrorKind } from '@contract/apiError'
import type { ShowSearchRequest } from '@app-types/showSearch'
import { searchShows } from './tasks/searchShows'

// Столько ждём после последней буквы. Хватает, чтобы рукой стереть букву и вернуть её без лишнего запроса.
const TYPING_PAUSE_MS = 700

// Единственный хозяин запросов поиска: ввод, жанр, страница, повтор. Ждёт паузу во вводе, обрывает устаревший запрос,
// помнит, идёт ли поиск и чем он закончился.
export function useShowSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiErrorKind | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const controller = useRef<AbortController>(undefined)
  // Запрос, который ждёт паузы во вводе или уже в пути: повторять его незачем.
  const pending = useRef<ShowSearchRequest | null>(null)
  // Последний ушедший запрос: его повторяет retry.
  const last = useRef<ShowSearchRequest | null>(null)

  const cancel = () => {
    clearTimeout(timer.current)
    controller.current?.abort()
    pending.current = null
  }

  const run = async (request: ShowSearchRequest) => {
    cancel()
    controller.current = new AbortController()
    pending.current = request
    last.current = request
    setIsLoading(true)
    setError(null)

    const outcome = await searchShows(request, controller.current.signal)
    if (outcome.status === 'cancelled') return

    pending.current = null
    setIsLoading(false)
    if (outcome.status === 'error') setError(outcome.error)
  }

  // Жанр и страницу меняют у выдачи, которая на экране. Если уже ждём выдачу по другому запросу, клик опоздал:
  // эти карточки вот-вот сменятся.
  const refine = (genre: string | null, page: number) => {
    const query = searchStore.shownQuery
    if (query === null || (pending.current && pending.current.query !== query)) return

    void run({ query, genre, page })
  }

  // Экран закрыли: сбрасываем таймер и обрываем запрос.
  useEffect(
    () => () => {
      clearTimeout(timer.current)
      controller.current?.abort()
    },
    [],
  )

  return {
    isLoading,
    error,
    search(value: string) {
      const query = value.trim()
      if (query === pending.current?.query) return
      cancel()

      if (!query) {
        searchStore.clearResult()
        setIsLoading(false)
        setError(null)
        return
      }

      // Стёрли букву и вернули её до конца паузы: запрос ещё не ушёл, на экране выдача по этому же запросу —
      // оставляем всё как есть, вместе с жанром и страницей. Если экран уже приглушён, вернуть его может
      // только новая выдача.
      if (query === searchStore.shownQuery && !isLoading) return

      const request = { query, genre: null, page: 1 }
      pending.current = request
      timer.current = setTimeout(() => void run(request), TYPING_PAUSE_MS)
    },
    // Новый жанр — с первой страницы.
    selectGenre(genre: string | null) {
      refine(genre, 1)
    },
    selectPage(page: number) {
      refine(searchStore.result?.genre ?? null, page)
    },
    retry() {
      if (last.current) void run(last.current)
    },
  }
}
