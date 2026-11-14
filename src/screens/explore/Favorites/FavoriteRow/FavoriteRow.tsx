import { texts } from '@locales/index'
import type { Show } from '@contract/show'
import { Button } from '@ui-kit/Button/Button'
import { Icon } from '@ui-kit/Icon/Icon'
import { Image } from '@ui-kit/Image/Image'
import { Link } from '@ui-kit/Link/Link'
import { Text } from '@ui-kit/Text/Text'
import s from './FavoriteRow.module.css'

type FavoriteRowProps = {
  show: Show
  title: string
  meta: string
  favorite: { active: boolean; pending: boolean; label: string; icon: 'star' | 'starOutline' }
  onFavoriteToggle: () => void
}

// Строка избранного: маленький постер, название-ссылка на TVmaze и звёздочка, которая убирает шоу из списка.
// Подпись «TVmaze ↗» та же, что на карточке: по ней видно, что строка нажимается и уводит на другой сайт.
export function FavoriteRow({ show, title, meta, favorite, onFavoriteToggle }: FavoriteRowProps) {
  return (
    <article className={s.row}>
      <div className={s.poster}>
        <Image src={show.poster?.small ?? null} alt="" fit="cover" fallback="" />
      </div>
      <div className={s.text}>
        <Text as="h3" variant="subtitle" lines={2}>
          <Link variant="stretched" href={show.url} target="_blank" spoken={texts.showCard.sourceSpoken}>
            {title}
          </Link>
        </Text>
        <Text variant="caption" tone="muted" lines={2}>
          {meta}
        </Text>
        <div className={s.source} aria-hidden="true">
          <Text as="span" variant="caption">
            {texts.showCard.source}
          </Text>
          <Icon name="external" size="small" />
        </div>
      </div>
      <div className={s.favorite}>
        <Button
          variant="ghost"
          label={favorite.label}
          pressed={favorite.active}
          disabled={favorite.pending}
          onClick={onFavoriteToggle}
        >
          <Icon name={favorite.icon} size="medium" />
        </Button>
      </div>
    </article>
  )
}
