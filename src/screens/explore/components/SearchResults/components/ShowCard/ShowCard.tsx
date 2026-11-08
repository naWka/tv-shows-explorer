import { ru } from '@locales/ru'
import type { Show } from '@app-types/show'
import { Link } from '@ui-kit/Link/Link'
import { Text } from '@ui-kit/Text/Text'
import { ShowPoster } from './components/ShowPoster/ShowPoster'
import s from './ShowCard.module.css'

type ShowCardProps = {
  show: Show
  number: string
  meta: string
}

export function ShowCard({ show, number, meta }: ShowCardProps) {
  return (
    <article className={s.card}>
      <div className={s.body}>
        <Text as="h2" variant="title" lines={2}>
          <Link variant="stretched" href={show.url} target="_blank">
            {show.name}
          </Link>
        </Text>
        <Text variant="caption" tone="muted" lines={1}>
          {meta}
        </Text>
        <Text variant="body" tone="muted" lines={3}>
          {show.summary || ru.showCard.noSummary}
        </Text>
      </div>

      <ShowPoster imageUrl={show.imageUrl} number={number} rating={show.rating} />
    </article>
  )
}
