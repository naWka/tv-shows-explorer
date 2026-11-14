import { ru } from '@locales/ru'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ApiErrorKind } from '@app-types/apiError'

type Screen = {
  variant: 'idle' | 'static' | 'bars'
  title: string
  text?: string
  actionLabel?: string
  spoken: string
}

export function usePresenter(isLoading: boolean, error: ApiErrorKind | null) {
  const { query, shows, shownQuery } = searchStore
  const screen = describeScreen({ isLoading, error, query, found: shows.length, hasResult: shownQuery !== null })

  return {
    screen,
    announcement: screen?.spoken ?? '',
  }
}

type ScreenFacts = {
  isLoading: boolean
  error: ApiErrorKind | null
  query: string
  found: number
  hasResult: boolean
}

function describeScreen({ isLoading, error, query, found, hasResult }: ScreenFacts): Screen | null {
  const t = ru.searchState

  // Если на экране прежняя выдача, загрузку показывает она сама, приглушаясь.
  if (isLoading) {
    return found > 0 ? null : { variant: 'static', title: t.loading.title, spoken: t.loading.spoken }
  }
  if (error) {
    const text = t.error.reasons[error]
    return { variant: 'bars', title: t.error.title, text, actionLabel: t.error.retry, spoken: text }
  }
  if (!hasResult) return { variant: 'idle', title: t.idle.title, text: t.idle.text, spoken: '' }
  if (found === 0) return { variant: 'idle', title: t.empty.title, text: t.empty.text(query), spoken: t.empty.spoken }
  return null
}
