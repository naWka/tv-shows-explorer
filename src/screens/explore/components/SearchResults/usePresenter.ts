import { ru } from '@locales/ru'
import { searchStore } from '@stores/searchStore/searchStore'
import type { Show } from '@app-types/show'

const PAGE_SIZE = 3

export function usePresenter() {
  const { status, shows, genre, page } = searchStore

  const hasResults = status === 'success' && shows.length > 0
  const filtered = genre ? shows.filter((show) => show.genres.includes(genre)) : shows
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const canPrev = page > 1
  const canNext = page < pageCount

  return {
    hasResults,
    announcement: hasResults ? ru.searchResults.spoken(filtered.length, page, pageCount) : '',

    genres: countGenres(shows).map((option) => ({ ...option, active: option.name === genre })),
    allCount: shows.length,
    isAllActive: genre === null,
    onGenreSelect: (name: string) => searchStore.setGenre(name === genre ? null : name),
    onGenreReset: () => searchStore.setGenre(null),

    items: filtered.slice(start, start + PAGE_SIZE).map((show, index) => ({
      show,
      number: String(start + index + 1).padStart(2, '0'),
      meta: [show.year ?? ru.showCard.unknownYear, ...show.genres].join(' · '),
    })),

    pages: Array.from({ length: pageCount }, (_, index) => ({
      value: index + 1,
      label: ru.pagination.page(index + 1),
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

function countGenres(shows: Show[]) {
  const counts = new Map<string, number>()

  for (const show of shows) {
    for (const name of show.genres) counts.set(name, (counts.get(name) ?? 0) + 1)
  }

  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}
