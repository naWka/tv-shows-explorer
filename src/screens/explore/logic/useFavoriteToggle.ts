import { useState } from 'react'
import { texts } from '@locales/index'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { userStore } from '@stores/userStore/userStore'
import type { Show } from '@contract/show'
import { addFavorite } from './tasks/addFavorite'
import { removeFavorite } from './tasks/removeFavorite'
import { showToast } from './tasks/showToast'

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
      // Гость видит звёздочку, но нажатие только подсказывает войти: так он узнаёт, что избранное есть и что для него нужно.
      // Человек остаётся на месте, а кнопка «Войти» — в самом сообщении: шапка к этому времени бывает прокручена за край.
      if (userStore.email === null) {
        showToast(texts.favoriteToggle.toast.guest, 'logIn')
        return
      }
      if (pendingIds.includes(show.id)) return
      setPendingIds((ids) => [...ids, show.id])

      const wasFavorite = favoriteIds.has(show.id)
      const outcome = wasFavorite ? await removeFavorite(show.id) : await addFavorite(show.id)
      setPendingIds((ids) => ids.filter((id) => id !== show.id))

      const title = show.name || texts.showCard.untitled
      const toast = texts.favoriteToggle.toast
      if (outcome.status === 'success') showToast(wasFavorite ? toast.removed(title) : toast.added(title))
      else if (outcome.error === 'unauthorized') showToast(toast.expired)
      else showToast(wasFavorite ? toast.removeFailed(title) : toast.addFailed(title))
    },
  }
}
