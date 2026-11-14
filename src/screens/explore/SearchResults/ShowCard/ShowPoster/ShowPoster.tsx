import { ru } from '@locales/ru'
import type { Show } from '@app-types/show'
import { Icon } from '@ui-kit/Icon/Icon'
import { Image } from '@ui-kit/Image/Image'
import { Text } from '@ui-kit/Text/Text'
import s from './ShowPoster.module.css'

type ShowPosterProps = {
  poster: Show['poster']
  number: string
  rating: number | null
}

// Совпадает с границей раскладки в CSS: шире — постер крупный, и ему нужен исходный файл; уже — хватает маленького.
const WIDE_SCREEN = '(min-width: 721px)'

// Размытая копия берёт маленький файл: он приходит за доли секунды, и пока грузится крупный, экран не пустой.
export function ShowPoster({ poster, number, rating }: ShowPosterProps) {
  return (
    <div className={s.set}>
      <div className={s.screen}>
        {poster && (
          <div className={s.backdrop}>
            <Image src={poster.small} alt="" fit="cover" fallback="" />
          </div>
        )}
        <div className={s.picture}>
          <Image
            src={poster?.small ?? null}
            largeSrc={poster?.large}
            largeMedia={WIDE_SCREEN}
            alt=""
            fit="contain"
            fallback={ru.showPoster.noPoster}
          />
        </div>
      </div>
      <div className={s.panel}>
        <div className={s.led} />
        <Text as="span" variant="caption" tone="muted">
          № {number}
        </Text>
        {rating ? (
          <div className={s.rating}>
            <Icon name="star" size="small" tone="accent" />
            <Text as="span" variant="badge" tone="accent">
              {rating}
            </Text>
          </div>
        ) : null}
      </div>
    </div>
  )
}
