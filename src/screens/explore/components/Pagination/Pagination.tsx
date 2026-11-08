import { Button } from '../../../../ui-kit/Button/Button'
import { Icon } from '../../../../ui-kit/Icon/Icon'
import { Text } from '../../../../ui-kit/Text/Text'
import s from './Pagination.module.css'

type PageOption = {
  value: number
  label: string
  current: boolean
}

type PaginationProps = {
  pages: PageOption[]
  canPrev: boolean
  canNext: boolean
  onPrev: () => void
  onNext: () => void
  onSelect: (page: number) => void
}

export function Pagination({ pages, canPrev, canNext, onPrev, onNext, onSelect }: PaginationProps) {
  return (
    <nav className={s.remote} aria-label="Страницы">
      <Button variant="round" label="Предыдущая страница" disabled={!canPrev} onClick={onPrev}>
        <Icon name="prev" size="medium" />
      </Button>

      <div className={s.label} aria-hidden="true">
        <Text as="span" variant="overline" tone="muted">
          CH
        </Text>
      </div>

      {pages.map((page) => (
        <Button
          key={page.value}
          variant="round"
          label={page.label}
          current={page.current}
          onClick={() => onSelect(page.value)}
        >
          {page.value}
        </Button>
      ))}

      <Button variant="round" label="Следующая страница" disabled={!canNext} onClick={onNext}>
        <Icon name="next" size="medium" />
      </Button>
    </nav>
  )
}
