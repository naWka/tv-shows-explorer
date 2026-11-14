import { ru } from '@locales/ru'
import { Link } from '@ui-kit/Link/Link'
import { Text } from '@ui-kit/Text/Text'
import s from './Brand.module.css'

export function Brand() {
  return (
    <div className={s.brand}>
      <Link variant="pill" href="https://www.tvmaze.com" target="_blank">
        <div className={s.dot} aria-hidden="true" />
        {ru.brand.onAir}
      </Link>
      <Text as="h1" variant="display">
        TV Shows{' '}
        <Text as="span" variant="highlight" tone="accent">
          Explorer
        </Text>
      </Text>
    </div>
  )
}
