import { Chip } from '../../../../ui-kit/Chip/Chip'
import s from './GenreFilter.module.css'

type GenreOption = {
  name: string
  count: number
  active: boolean
}

type GenreFilterProps = {
  genres: GenreOption[]
  allCount: number
  isAllActive: boolean
  onSelect: (name: string) => void
  onReset: () => void
}

export function GenreFilter({ genres, allCount, isAllActive, onSelect, onReset }: GenreFilterProps) {
  return (
    <div className={s.chips} role="group" aria-label="Фильтр по жанру">
      <Chip label="Все" count={allCount} active={isAllActive} onClick={onReset} />
      {genres.map((genre) => (
        <Chip
          key={genre.name}
          label={genre.name}
          count={genre.count}
          active={genre.active}
          onClick={() => onSelect(genre.name)}
        />
      ))}
    </div>
  )
}
