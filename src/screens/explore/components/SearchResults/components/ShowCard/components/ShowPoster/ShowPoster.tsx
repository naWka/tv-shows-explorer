import { ru } from '@locales/ru'
import { Icon } from '@ui-kit/Icon/Icon'
import { Image } from '@ui-kit/Image/Image'
import { Text } from '@ui-kit/Text/Text'
import s from './ShowPoster.module.css'

type ShowPosterProps = {
  imageUrl: string | null
  number: string
  rating: number | null
}

export function ShowPoster({ imageUrl, number, rating }: ShowPosterProps) {
  return (
    <div className={s.set}>
      <div className={s.screen}>
        {imageUrl && (
          <div className={s.backdrop}>
            <Image src={imageUrl} alt="" fit="cover" fallback="" />
          </div>
        )}
        <div className={s.picture}>
          <Image src={imageUrl} alt="" fit="contain" fallback={ru.showPoster.noPoster} />
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
