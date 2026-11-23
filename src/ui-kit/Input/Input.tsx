import type { Ref } from 'react'
import s from './Input.module.css'

type InputProps = {
  type: 'text' | 'search' | 'email'
  label: string
  value: string
  placeholder: string
  maxLength: number
  autoFocus?: boolean
  /** Что браузер подставит из сохранённого. Без значения — ничего. */
  autoComplete?: 'email'
  inputRef?: Ref<HTMLInputElement>
  onChange: (value: string) => void
}

export function Input({
  type,
  label,
  value,
  placeholder,
  maxLength,
  autoFocus,
  autoComplete,
  inputRef,
  onChange,
}: InputProps) {
  return (
    <input
      ref={inputRef}
      className={s.input}
      type={type}
      aria-label={label}
      autoComplete={autoComplete ?? 'off'}
      autoFocus={autoFocus}
      spellCheck={false}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
