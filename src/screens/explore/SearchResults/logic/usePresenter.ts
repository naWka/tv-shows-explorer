import { useEffect, useRef } from 'react'
import { texts } from '@locales/index'
import { searchStore } from '@stores/searchStore/searchStore'
import type { ShowsPage } from '@contract/showsPage'

const NO_RESULT: ShowsPage = { shows: [], page: 1, pageCount: 0, offset: 0, found: 0, total: 0, genre: null, genres: [] }

// Жанры, фильтр и страницы считает сервер: блок показывает пришедшую страницу и сообщает владельцу о кликах.
export function usePresenter(
  isLoading: boolean,
  onGenreSelect: (genre: string | null) => void,
  onPageSelect: (page: number) => void,
) {
  const { resultId, isResultNew } = searchStore
  const { shows, page, pageCount, offset, found, total, genre, genres } = searchStore.result ?? NO_RESULT
  const listRef = useRef<HTMLUListElement>(null)

  // Страницу переключили внизу длинного списка (на телефоне): показываем начало новой страницы, а не её конец.
  useEffect(() => {
    const list = listRef.current
    if (list && list.getBoundingClientRect().top < 0) list.scrollIntoView({ block: 'start' })
  }, [page])

  // Пока ищется уточнённый запрос, жанр или страница, прежние карточки остаются на экране приглушёнными.
  const hasResults = total > 0
  const isStale = isLoading
  const canPrev = page > 1
  const canNext = page < pageCount

  return {
    hasResults,
    isStale,
    announcement: describeAnnouncement(hasResults, isStale, found, page, pageCount),

    genres: genres.map((option) => ({ ...option, active: option.name === genre })),
    allCount: total,
    isAllActive: genre === null,
    onGenreSelect: (name: string) => onGenreSelect(name === genre ? null : name),
    onGenreReset: () => onGenreSelect(null),

    // Ключ — номер выдачи и место на странице, а не шоу: при смене страницы карточки остаются и меняют содержимое,
    // поэтому анимация включения не повторяется. Она играет, только когда приходит новая выдача:
    // карточки, которые появились на пустом месте после смены страницы или жанра, тоже не включаются (enter: 'off').
    enter: isResultNew ? 'on' : 'off',
    listRef,
    // Точка переносится вместе со следующим жанром (неразрывный пробел после неё), а не висит в конце строки.
    items: shows.map((show, index) => ({
      key: `${resultId}-${index}`,
      show,
      title: show.name || texts.showCard.untitled,
      number: String(offset + index + 1).padStart(2, '0'),
      meta: [show.year ?? texts.showCard.unknownYear, ...show.genres].join(' · '),
    })),

    pages: Array.from({ length: pageCount }, (_, index) => ({
      value: index + 1,
      label: texts.pagination.page(index + 1),
      current: index + 1 === page,
    })),
    hasPages: pageCount > 1,
    canPrev,
    canNext,
    onPrev: () => canPrev && onPageSelect(page - 1),
    onNext: () => canNext && onPageSelect(page + 1),
    onPageSelect,
  }
}

function describeAnnouncement(hasResults: boolean, isStale: boolean, found: number, page: number, pageCount: number) {
  if (!hasResults) return ''
  if (isStale) return texts.searchResults.loadingSpoken
  return texts.searchResults.spoken(found, page, pageCount)
}
