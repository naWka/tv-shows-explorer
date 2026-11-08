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
    <div className={s.screen}>
      <div className={s.picture}>
        <Image src={imageUrl} alt="" fallback={ru.showPoster.noPoster} />
      </div>
      <div className={s.number}>
        <Text as="span" variant="caption">
          № {number}
        </Text>
      </div>
      {rating ? (
        <div className={s.rating}>
          <Icon name="star" size="small" tone="ink" />
          <Text as="span" variant="badge" tone="ink">
            {rating}
          </Text>
        </div>
      ) : null}
    </div>
  )
}
