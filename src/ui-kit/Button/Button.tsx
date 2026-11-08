import type { ReactNode } from 'react'
import s from './Button.module.css'

type ButtonProps = {
  variant: 'round' | 'outline'
  children: ReactNode
  label?: string
  current?: boolean
  disabled?: boolean
  onClick: () => void
}

export function Button({ variant, children, label, current, disabled, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={s.button}
      data-variant={variant}
      aria-label={label}
      aria-current={current || undefined}
      aria-disabled={disabled || undefined}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
