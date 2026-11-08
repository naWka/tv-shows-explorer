import type { Ref } from 'react'
import { Icon } from '../../../../ui-kit/Icon/Icon'
import { Input } from '../../../../ui-kit/Input/Input'
import { Text } from '../../../../ui-kit/Text/Text'
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
      <Icon name="search" size="large" tone="accent" />
      <Input
        type="search"
        label={label}
        autoFocus
        inputRef={inputRef}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className={s.tuner} aria-hidden="true">
        <Text as="span" variant="overline" tone="muted">
          TUNE
        </Text>
      </div>
    </label>
  )
}
