import { makeAutoObservable } from 'mobx'
import type { Show } from '@contract/show'

class FavoritesStore {
  /** Избранное в том виде, как его прислал сервер: сначала то, что добавили последним. */
  shows: Show[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setShows(shows: Show[]) {
    this.shows = shows
  }
}

export const favoritesStore = new FavoritesStore()
