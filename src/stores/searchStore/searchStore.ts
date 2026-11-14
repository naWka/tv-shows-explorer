import { makeAutoObservable } from 'mobx'
import type { ShowsPage } from '@contract/showsPage'

class SearchStore {
  query = ''
  /** Страница выдачи в том виде, как её прислал сервер. null — выдачи нет: ещё не искали, поле очистили или поиск не удался. */
  result: ShowsPage | null = null
  /** Запрос, по которому найдена result. */
  shownQuery: string | null = null
  /** Номер выдачи: растёт с каждой новой выдачей, по нему карточки включаются заново. */
  resultId = 0
  /** Выдача только что пришла, и её ещё не листали и не фильтровали: пока это так, карточки включаются с анимацией. */
  isResultNew = false

  constructor() {
    makeAutoObservable(this)
  }

  setQuery(query: string) {
    this.query = query
  }

  // Новая выдача — та, что пришла по другому запросу. Другая страница или жанр того же запроса — та же выдача.
  setResult(result: ShowsPage, query: string) {
    const isNew = query !== this.shownQuery

    this.result = result
    this.shownQuery = query
    this.isResultNew = isNew
    if (isNew) this.resultId += 1
  }

  clearResult() {
    this.result = null
    this.shownQuery = null
    this.isResultNew = false
  }
}

export const searchStore = new SearchStore()
