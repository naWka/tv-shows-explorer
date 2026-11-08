import { ru } from '@locales/ru'
import { searchStore } from '@stores/searchStore/searchStore'
import type { SearchStatus } from '@app-types/showSearch'

type Screen = {
  variant: 'idle' | 'static' | 'bars'
  title: string
  text?: string
  actionLabel?: string
  spoken: string
}

export function usePresenter() {
  const { query, status, shows, error } = searchStore
  const screen = describeScreen({ status, query, found: shows.length, error })

  return {
    screen,
    announcement: screen?.spoken ?? '',
  }
}

type ScreenFacts = {
  status: SearchStatus
  query: string
  found: number
  error: string | null
}

function describeScreen({ status, query, found, error }: ScreenFacts): Screen | null {
  const t = ru.searchState

  if (status === 'idle') return { variant: 'idle', title: t.idle.title, text: t.idle.text, spoken: '' }
  if (status === 'loading') return { variant: 'static', title: t.loading.title, spoken: t.loading.spoken }
  if (status === 'error') {
    return { variant: 'bars', title: t.error.title, text: error ?? '', actionLabel: t.error.retry, spoken: error ?? '' }
  }
  if (found === 0) return { variant: 'idle', title: t.empty.title, text: t.empty.text(query), spoken: t.empty.spoken }
  return null
}
