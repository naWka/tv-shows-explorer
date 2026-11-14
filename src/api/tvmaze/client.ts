import { ApiError } from '@api/apiError'
import type { ApiErrorKind } from '@app-types/apiError'

const BASE_URL = 'https://api.tvmaze.com'

// Транспорт: один GET к TVmaze. Что лежит в ответе, знает метод API, который его вызвал.
export async function getJson(path: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${path}`, { signal }).catch((error: unknown) => {
    throw signal.aborted ? error : new ApiError('network')
  })

  if (!response.ok) {
    throw new ApiError(toErrorKind(response.status))
  }

  return response.json().catch((error: unknown) => {
    throw signal.aborted ? error : new ApiError('unreadable')
  })
}

function toErrorKind(status: number): ApiErrorKind {
  if (status === 429) return 'tooManyRequests'
  if (status >= 500) return 'serverDown'
  return 'failed'
}
