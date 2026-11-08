import { Image } from '../../../../../../ui-kit/Image/Image'
import { Text } from '../../../../../../ui-kit/Text/Text'
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
        <Image src={imageUrl} alt="" fallback="Нет постера" />
      </div>
      <div className={s.number}>
        <Text as="span" variant="caption">
          № {number}
        </Text>
      </div>
      {rating ? (
        <div className={s.rating}>
          <Text as="span" variant="caption" tone="accent">
            ★ {rating}
          </Text>
        </div>
      ) : null}
    </div>
  )
}
