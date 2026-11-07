import s from './Chip.module.css'

type ChipProps = {
  label: string
  count: number
  active: boolean
  onClick: () => void
}

export function Chip({ label, count, active, onClick }: ChipProps) {
  return (
    <button type="button" className={s.chip} aria-pressed={active} onClick={onClick}>
      {label}
      <span className={s.count}>{count}</span>
    </button>
  )
}
