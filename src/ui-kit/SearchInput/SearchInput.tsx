import type { Ref } from 'react'
import s from './SearchInput.module.css'

type SearchInputProps = {
  label: string
  placeholder: string
  value: string
  maxLength: number
  inputRef?: Ref<HTMLInputElement>
  onChange: (value: string) => void
}

export function SearchInput({ label, placeholder, value, maxLength, inputRef, onChange }: SearchInputProps) {
  return (
    <label className={s.field}>
      <span className={s.label}>{label}</span>
      <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M15.5 15.5 21 21" />
      </svg>
      <input
        ref={inputRef}
        className={s.input}
        type="search"
        autoComplete="off"
        autoFocus
        spellCheck={false}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className={s.tuner} aria-hidden="true">
        TUNE
      </span>
    </label>
  )
}
