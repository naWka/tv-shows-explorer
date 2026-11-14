import type { ReactNode } from 'react'
import s from './Button.module.css'

type ButtonProps = {
  variant: 'round' | 'outline' | 'ghost'
  children: ReactNode
  label?: string
  current?: boolean
  /** Кнопка-переключатель: включена или выключена. Без значения кнопка обычная. */
  pressed?: boolean
  disabled?: boolean
  onClick: () => void
}

export function Button({ variant, children, label, current, pressed, disabled, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={s.button}
      data-variant={variant}
      aria-label={label}
      aria-current={current || undefined}
      aria-pressed={pressed}
      aria-disabled={disabled || undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
