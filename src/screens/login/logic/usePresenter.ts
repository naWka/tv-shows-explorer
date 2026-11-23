import { useState } from 'react'
import { useNavigate } from 'react-router'
import { texts } from '@locales/index'
import type { ApiErrorKind } from '@contract/apiError'
import { logIn } from './tasks/logIn'

// Email проверяет сервер: сайт шлёт то, что ввели, и показывает причину отказа.
const EMAIL_MAX_LENGTH = 254

export function usePresenter() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiErrorKind | null>(null)
  const canSubmit = email.trim() !== '' && !isLoading
  const errorText = describeError(error)

  return {
    email,
    emailMaxLength: EMAIL_MAX_LENGTH,
    onEmailChange: (value: string) => {
      setEmail(value)
      setError(null)
    },
    isDisabled: !canSubmit,
    submitLabel: isLoading ? texts.login.submitting : texts.login.submit,
    hasError: errorText !== '',
    error: errorText,
    onSubmit: async () => {
      if (!canSubmit) return
      setIsLoading(true)
      const outcome = await logIn(email)
      setIsLoading(false)

      if (outcome.status === 'error') setError(outcome.error)
      else navigate('/')
    },
    onBack: () => navigate('/'),
  }
}

function describeError(error: ApiErrorKind | null) {
  const t = texts.login.errors
  if (error === null) return ''
  // Вход отвечает 400 только на email, который сервер не принял.
  if (error === 'failed') return t.invalidEmail
  if (error === 'network') return t.network
  return t.other
}
