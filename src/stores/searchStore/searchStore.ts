import { makeAutoObservable } from 'mobx'
import type { Show } from '@app-types/show'

class SearchStore {
  query = ''
  genre: string | null = null
  page = 1
  shows: Show[] = []
  /** Запрос, по которому найдены shows. null — выдачи нет: ещё не искали, поле очистили или поиск не удался. */
  shownQuery: string | null = null
  /** Номер выдачи: растёт с каждой пришедшей выдачей, по нему карточки новой выдачи включаются заново. */
  resultId = 0
  /** Выдача только что пришла, и её ещё не листали и не фильтровали: пока это так, карточки включаются с анимацией. */
  isResultNew = false

  constructor() {
    makeAutoObservable(this)
  }

  setQuery(query: string) {
    this.query = query
  }

  setGenre(genre: string | null) {
    this.genre = genre
    this.page = 1
    this.isResultNew = false
  }

  setPage(page: number) {
    this.page = page
    this.isResultNew = false
  }

  // Жанр и страница сбрасываются, когда выдача сменилась.
  setShows(shows: Show[], query: string) {
    this.shows = shows
    this.shownQuery = query
    this.genre = null
    this.page = 1
    this.isResultNew = true
    this.resultId += 1
  }

  clearShows() {
    this.shows = []
    this.shownQuery = null
    this.genre = null
    this.page = 1
    this.isResultNew = false
  }
}

export const searchStore = new SearchStore()
