import { useEffect, useRef } from 'react'
import { createShowSearch, type ShowSearch } from '../../services/showSearch/showSearch'
import { searchStore } from '../../stores/searchStore/searchStore'
import type { SearchStatus } from '../../types/showSearch'
import type { Show } from '../../types/show'

const PAGE_SIZE = 3
const QUERY_MAX_LENGTH = 100

export function usePresenter() {
  const serviceRef = useRef<ShowSearch | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const service = createShowSearch((result) => searchStore.setSearchResult(result))
    serviceRef.current = service
    return () => service.dispose()
  }, [])

  const { query, genre, page, status, shows, error } = searchStore

  const filtered = genre ? shows.filter((show) => show.genres.includes(genre)) : shows
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const items = filtered.slice(start, start + PAGE_SIZE).map((show, index) => ({
    show,
    number: String(start + index + 1).padStart(2, '0'),
    meta: [show.year ?? 'Год неизвестен', ...show.genres].join(' · '),
  }))
  const canPrev = page > 1
  const canNext = page < pageCount

  return {
    query,
    queryMaxLength: QUERY_MAX_LENGTH,
    inputRef,
    onQueryChange: (value: string) => {
      searchStore.setQuery(value)
      serviceRef.current?.search(value)
    },

    announcement: describeStatus({ status, error, found: filtered.length, page, pageCount }),
    isIdle: status === 'idle',
    isLoading: status === 'loading',
    isError: status === 'error',
    isEmpty: status === 'success' && shows.length === 0,
    hasResults: status === 'success' && shows.length > 0,
    error,
    onRetry: () => {
      serviceRef.current?.retry()
      inputRef.current?.focus()
    },

    genres: countGenres(shows).map((option) => ({ ...option, active: option.name === genre })),
    allCount: shows.length,
    isAllActive: genre === null,
    onGenreSelect: (name: string) => searchStore.setGenre(name === genre ? null : name),
    onGenreReset: () => searchStore.setGenre(null),

    items,

    pages: Array.from({ length: pageCount }, (_, index) => ({
      value: index + 1,
      label: `Страница ${index + 1}`,
      current: index + 1 === page,
    })),
    hasPages: pageCount > 1,
    canPrev,
    canNext,
    onPrev: () => canPrev && searchStore.setPage(page - 1),
    onNext: () => canNext && searchStore.setPage(page + 1),
    onPageSelect: (value: number) => searchStore.setPage(value),
  }
}

type StatusFacts = {
  status: SearchStatus
  error: string | null
  found: number
  page: number
  pageCount: number
}

function describeStatus({ status, error, found, page, pageCount }: StatusFacts): string {
  if (status === 'loading') return 'Ищем шоу…'
  if (status === 'error') return error ?? ''
  if (status === 'idle') return ''
  if (found === 0) return 'Ничего не нашлось'
  return `Найдено шоу: ${found}. Страница ${page} из ${pageCount}`
}

function countGenres(shows: Show[]) {
  const counts = new Map<string, number>()

  for (const show of shows) {
    for (const name of show.genres) counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
