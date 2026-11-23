import type { FormEvent, ReactNode } from 'react'

type FormProps = {
  label: string
  children: ReactNode
  onSubmit: () => void
}

// Форма: Enter в поле отправляет её, как кнопка, и страница не перезагружается. Раскладку делает владелец внутри.
export function Form({ label, children, onSubmit }: FormProps) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form aria-label={label} noValidate onSubmit={submit}>
      {children}
    </form>
  )
}
