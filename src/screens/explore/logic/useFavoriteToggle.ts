import { useState } from 'react'
import { texts } from '@locales/index'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { toastStore } from '@stores/toastStore/toastStore'
import type { Show } from '@contract/show'
import { addFavorite } from './tasks/addFavorite'
import { removeFavorite } from './tasks/removeFavorite'

// Звёздочка шоу для презентеров выдачи и панели избранного: горит ли она, идёт ли запрос и что сделать по нажатию.
export function useFavoriteToggle() {
  const [pendingIds, setPendingIds] = useState<number[]>([])
  const favoriteIds = new Set(favoritesStore.shows.map((show) => show.id))

  return {
    describe(show: Show) {
      const title = show.name || texts.showCard.untitled
      const active = favoriteIds.has(show.id)

      return {
        active,
        pending: pendingIds.includes(show.id),
        label: active ? texts.favoriteToggle.remove(title) : texts.favoriteToggle.add(title),
        icon: active ? ('star' as const) : ('starOutline' as const),
      }
    },
    async toggle(show: Show) {
      if (pendingIds.includes(show.id)) return
      setPendingIds((ids) => [...ids, show.id])

      const wasFavorite = favoriteIds.has(show.id)
      const outcome = wasFavorite ? await removeFavorite(show.id) : await addFavorite(show.id)
      setPendingIds((ids) => ids.filter((id) => id !== show.id))

      const title = show.name || texts.showCard.untitled
      const toast = texts.favoriteToggle.toast
      if (outcome.status === 'error') toastStore.show(wasFavorite ? toast.removeFailed(title) : toast.addFailed(title))
      else toastStore.show(wasFavorite ? toast.removed(title) : toast.added(title))
    },
  }
}
