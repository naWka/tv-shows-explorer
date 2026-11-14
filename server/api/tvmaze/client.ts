import type { ApiErrorKind } from '../../../contract/apiError.ts'
import { ApiError } from '../apiError.ts'

const BASE_URL = 'https://api.tvmaze.com'

// Транспорт: один GET к TVmaze. Что лежит в ответе, знает метод API, который его вызвал.
export async function getJson(path: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${path}`).catch(() => {
    throw new ApiError('serverDown')
  })

  if (!response.ok) {
    throw new ApiError(toErrorKind(response.status))
  }

  return response.json().catch(() => {
    throw new ApiError('unreadable')
  })
}

function toErrorKind(status: number): ApiErrorKind {
  if (status === 429) return 'tooManyRequests'
  if (status >= 500) return 'serverDown'
  return 'failed'
}
