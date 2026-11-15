import { observer } from 'mobx-react-lite'
import { texts } from '@locales/index'
import { Button } from '@ui-kit/Button/Button'
import { Dialog } from '@ui-kit/Dialog/Dialog'
import { Icon } from '@ui-kit/Icon/Icon'
import { Text } from '@ui-kit/Text/Text'
import { Toast } from '../components/Toast/Toast'
import { FavoriteRow } from './FavoriteRow/FavoriteRow'
import s from './Favorites.module.css'
import { usePresenter } from './logic/usePresenter'

// Кнопка со счётчиком избранного и панель со списком, которую она открывает.
// Панель поверх экрана, а не отдельный экран с роутером: закрыл — вернулся к той же выдаче, жанру и странице.
export const Favorites = observer(function Favorites() {
  const p = usePresenter()

  return (
    <>
      <Button variant="outline" label={p.openLabel} onClick={p.onOpen}>
        <div className={s.counter}>
          <Icon name="star" size="small" />
          <div className={s.word}>
            <Text as="span" variant="caption">
              {texts.favorites.open}
            </Text>
          </div>
          <Text as="span" variant="badge">
            {p.count}
          </Text>
        </div>
      </Button>

      <Dialog variant="side" open={p.isOpen} label={texts.favorites.title} onClose={p.onClose}>
        <div className={s.panel}>
          <header className={s.head}>
            <Text as="h2" variant="headline" tone="accent">
              {texts.favorites.title}
            </Text>
            <Button variant="round" label={texts.favorites.close} onClick={p.onClose}>
              <Icon name="close" size="medium" />
            </Button>
          </header>

          {p.isEmpty ? (
            <div className={s.empty}>
              <Text variant="headline" tone="muted">
                {texts.favorites.empty.title}
              </Text>
              <Text variant="body" tone="muted">
                {texts.favorites.empty.text}
              </Text>
            </div>
          ) : (
            <ul className={s.list}>
              {p.items.map((item) => (
                <li key={item.show.id}>
                  <FavoriteRow
                    show={item.show}
                    title={item.title}
                    meta={item.meta}
                    favorite={item.favorite}
                    onFavoriteToggle={() => p.onFavoriteToggle(item.show)}
                  />
                </li>
              ))}
            </ul>
          )}
          <Toast />
        </div>
      </Dialog>
    </>
  )
})
