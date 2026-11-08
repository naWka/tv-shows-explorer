import { TvmazeError } from '@api/tvmaze/client'
import { ru } from '@locales/ru'

export function toErrorMessage(error: unknown): string {
  const t = ru.showSearch.errors

  if (!(error instanceof TvmazeError) || error.kind === 'parse') return t.unreadable
  if (error.kind === 'network') return t.network
  if (error.status === 429) return t.tooManyRequests
  if (error.status !== null && error.status >= 500) return t.serverDown
  return t.failed
}
