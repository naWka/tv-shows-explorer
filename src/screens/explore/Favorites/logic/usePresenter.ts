import { useEffect, useState } from 'react'
import { texts } from '@locales/index'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { toastStore } from '@stores/toastStore/toastStore'
import type { Show } from '@contract/show'
import { loadFavorites } from '../../logic/tasks/loadFavorites'
import { useFavoriteToggle } from '../../logic/useFavoriteToggle'

export function usePresenter() {
  const [isOpen, setIsOpen] = useState(false)
  const favorite = useFavoriteToggle()
  const { shows } = favoritesStore

  // Избранное живёт на сервере: забираем его, когда блок появился на экране.
  useEffect(() => {
    void loadFavorites().then((outcome) => {
      if (outcome.status === 'error') toastStore.show(texts.favorites.loadFailed)
    })
  }, [])

  return {
    count: shows.length,
    openLabel: texts.favorites.openSpoken(shows.length),
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),

    isEmpty: shows.length === 0,
    items: shows.map((show) => ({
      show,
      title: show.name || texts.showCard.untitled,
      meta: [show.year ?? texts.showCard.unknownYear, ...show.genres].join(' · '),
      favorite: favorite.describe(show),
    })),
    onFavoriteToggle: (show: Show) => void favorite.toggle(show),
  }
}
