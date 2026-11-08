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

  constructor() {
    makeAutoObservable(this)
  }

  setQuery(query: string) {
    this.query = query
    this.genre = null
    this.page = 1
  }

  setGenre(genre: string | null) {
    this.genre = genre
    this.page = 1
  }

  setPage(page: number) {
    this.page = page
  }

  setSearchResult(result: ShowSearchResult) {
    this.status = result.status
    this.shows = result.shows
    this.error = result.error
  }
}

export const searchStore = new SearchStore()
