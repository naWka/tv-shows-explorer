import { makeAutoObservable } from 'mobx'
import type { ShowsPage } from '@contract/showsPage'

// Только поля и сеттеры: что и когда в них писать, решают таски.
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

  setResult(result: ShowsPage | null) {
    this.result = result
  }

  setShownQuery(query: string | null) {
    this.shownQuery = query
  }

  setResultId(id: number) {
    this.resultId = id
  }

  setIsResultNew(isNew: boolean) {
    this.isResultNew = isNew
  }
}

export const searchStore = new SearchStore()
