import { useEffect, useRef, useState } from 'react'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ApiErrorKind } from '@app-types/apiError'
import { searchShows } from './tasks/searchShows'

// Столько ждём после последней буквы. Хватает, чтобы рукой стереть букву и вернуть её без лишнего запроса.
const TYPING_PAUSE_MS = 700

// Запускает поиск по мере ввода: ждёт паузу, обрывает устаревший запрос, помнит, идёт ли поиск и чем он закончился.
export function useShowSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiErrorKind | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const controller = useRef<AbortController>(undefined)
  // Запрос, который ждёт паузы во вводе или уже в пути: повторять его незачем.
  const pending = useRef<string | null>(null)

  const cancel = () => {
    clearTimeout(timer.current)
    controller.current?.abort()
    pending.current = null
  }

  const run = async (query: string) => {
    cancel()
    controller.current = new AbortController()
    pending.current = query
    setIsLoading(true)
    setError(null)

    const outcome = await searchShows(query, controller.current.signal)
    if (outcome.status === 'cancelled') return

    pending.current = null
    setIsLoading(false)
    if (outcome.status === 'error') setError(outcome.error)
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
      if (query === pending.current) return
      cancel()

      if (!query) {
        searchStore.clearShows()
        setIsLoading(false)
        setError(null)
        return
      }

      // Стёрли букву и вернули её до конца паузы: запрос ещё не ушёл, на экране выдача по этому же запросу —
      // оставляем всё как есть, вместе с жанром и страницей. Если экран уже приглушён, вернуть его может
      // только новая выдача.
      if (query === searchStore.shownQuery && !isLoading) return

      pending.current = query
      timer.current = setTimeout(() => void run(query), TYPING_PAUSE_MS)
    },
    retry() {
      void run(searchStore.query.trim())
    },
  }
}
