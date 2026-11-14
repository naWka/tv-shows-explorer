import { texts } from '@locales/index'
import type { Show } from '@contract/show'
import { Button } from '@ui-kit/Button/Button'
import { Icon } from '@ui-kit/Icon/Icon'
import { Link } from '@ui-kit/Link/Link'
import { Text } from '@ui-kit/Text/Text'
import { ShowPoster } from './ShowPoster/ShowPoster'
import s from './ShowCard.module.css'

type ShowCardProps = {
  show: Show
  title: string
  number: string
  meta: string
  favorite: { active: boolean; pending: boolean; label: string; icon: 'star' | 'starOutline' }
  onFavoriteToggle: () => void
}

export function ShowCard({ show, title, number, meta, favorite, onFavoriteToggle }: ShowCardProps) {
  return (
    <article className={s.card}>
      <div className={s.body}>
        <div className={s.head}>
          <div className={s.title}>
            <Text as="h2" variant="title" lines={2}>
              <Link variant="stretched" href={show.url} target="_blank" spoken={texts.showCard.sourceSpoken}>
                {title}
              </Link>
            </Text>
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
        </div>
        <Text variant="caption" tone="muted" lines={2}>
          {meta}
        </Text>
        <Text variant="body" tone="muted" lines={3} narrowLines={7}>
          {show.summary || texts.showCard.noSummary}
        </Text>
        <div className={s.source} aria-hidden="true">
          <Text as="span" variant="caption">
            {texts.showCard.source}
          </Text>
          <div className={s.arrow}>
            <Icon name="external" size="small" />
          </div>
        </div>
      </div>

      <ShowPoster poster={show.poster} number={number} rating={show.rating} />
    </article>
  )
}
