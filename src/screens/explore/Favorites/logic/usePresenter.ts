import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { texts } from '@locales/index'
import { favoritesStore } from '@stores/favoritesStore/favoritesStore'
import { userStore } from '@stores/userStore/userStore'
import type { Show } from '@contract/show'
import { loadFavorites } from '../../logic/tasks/loadFavorites'
import { showToast } from '../../logic/tasks/showToast'
import { useFavoriteToggle } from '../../logic/useFavoriteToggle'

export function usePresenter() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const favorite = useFavoriteToggle()
  const { shows } = favoritesStore

  const isGuest = userStore.email === null
  const empty = isGuest ? texts.favorites.guest : texts.favorites.empty

  // Избранное живёт на сервере: забираем его, когда блок появился на экране. У гостя избранного нет — и запроса нет.
  // Вход и выход проходят на другом экране или стирают список сами, поэтому хватает одного запроса при появлении.
  useEffect(() => {
    if (userStore.email === null) return
    void loadFavorites().then((outcome) => {
      if (outcome.status === 'error') {
        showToast(outcome.error === 'unauthorized' ? texts.favorites.expired : texts.favorites.loadFailed)
      }
    })
  }, [])

  return {
    count: shows.length,
    openLabel: texts.favorites.openSpoken(shows.length),
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),

    isEmpty: shows.length === 0,
    // Гостю панель сразу предлагает войти: иначе ему пришлось бы закрыть её и искать «Войти» в шапке.
    isGuest,
    onLogIn: () => navigate('/login'),
    emptyTitle: empty.title,
    emptyText: empty.text,
    items: shows.map((show) => ({
      show,
      title: show.name || texts.showCard.untitled,
      meta: [show.year ?? texts.showCard.unknownYear, ...show.genres].join(' · '),
      favorite: favorite.describe(show),
    })),
    onFavoriteToggle: (show: Show) => void favorite.toggle(show),
  }
}
