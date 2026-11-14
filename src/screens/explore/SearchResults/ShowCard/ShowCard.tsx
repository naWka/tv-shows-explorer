import { texts } from '@locales/index'
import type { Show } from '@contract/show'
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
}

export function ShowCard({ show, title, number, meta }: ShowCardProps) {
  return (
    <article className={s.card}>
      <div className={s.body}>
        <Text as="h2" variant="title" lines={2}>
          <Link variant="stretched" href={show.url} target="_blank" spoken={texts.showCard.sourceSpoken}>
            {title}
          </Link>
        </Text>
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
