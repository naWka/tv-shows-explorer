import { makeAutoObservable } from 'mobx'
import type { Show } from '@app-types/show'
import type { SearchStatus, ShowSearchResult } from '@app-types/showSearch'

class SearchStore {
  query = ''
  genre: string | null = null
  page = 1
  status: SearchStatus = 'idle'
  shows: Show[] = []
  error: string | null = null
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

  // Пока идёт новый запрос, прежняя выдача остаётся на экране. Жанр и страница сбрасываются, когда выдача сменилась.
  setSearchResult(result: ShowSearchResult) {
    this.status = result.status
    this.error = result.error
    if (result.status === 'loading') return

    this.shows = result.shows
    this.genre = null
    this.page = 1
    this.isResultNew = result.status === 'success'
    if (result.status === 'success') this.resultId += 1
  }
}

export const searchStore = new SearchStore()
