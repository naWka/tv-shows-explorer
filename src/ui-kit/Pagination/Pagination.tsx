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
      <button type="button" className={s.step} aria-disabled={!canPrev} onClick={onPrev} aria-label="Предыдущая страница">
        ‹
      </button>

      <span className={s.label} aria-hidden="true">
        CH
      </span>

      {pages.map((page) => (
        <button
          key={page.value}
          type="button"
          className={s.page}
          aria-label={page.label}
          aria-current={page.current ? 'page' : undefined}
          onClick={() => onSelect(page.value)}
        >
          {page.value}
        </button>
      ))}

      <button type="button" className={s.step} aria-disabled={!canNext} onClick={onNext} aria-label="Следующая страница">
        ›
      </button>
    </nav>
  )
}
