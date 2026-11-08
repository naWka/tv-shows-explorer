import type { Ref } from 'react'
import s from './Input.module.css'

type InputProps = {
  type: 'text' | 'search'
  label: string
  value: string
  placeholder: string
  maxLength: number
  autoFocus?: boolean
  inputRef?: Ref<HTMLInputElement>
  onChange: (value: string) => void
}

export function Input({ type, label, value, placeholder, maxLength, autoFocus, inputRef, onChange }: InputProps) {
  return (
    <input
      ref={inputRef}
      className={s.input}
      type={type}
      aria-label={label}
      autoComplete="off"
      autoFocus={autoFocus}
      spellCheck={false}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
