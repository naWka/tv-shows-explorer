import { ApiError } from '@api/apiError'
import type { ApiErrorBody, ApiErrorKind } from '@contract/apiError'

type RequestOptions = {
  method?: 'GET' | 'PUT' | 'DELETE'
  signal?: AbortSignal
}

// Транспорт: один запрос к нашему серверу. Сайт и сервер живут на одном адресе, поэтому путь относительный.
// Что лежит в ответе, знает метод API, который его вызвал.
export async function requestJson(path: string, { method = 'GET', signal }: RequestOptions = {}): Promise<unknown> {
  const response = await fetch(`/api${path}`, { method, signal }).catch((error: unknown) => {
    throw signal?.aborted ? error : new ApiError('network')
  })

  if (!response.ok) {
    throw new ApiError(await toErrorKind(response))
  }

  return response.json().catch((error: unknown) => {
    throw signal?.aborted ? error : new ApiError('unreadable')
  })
}

// Причину ошибки называет сервер. Если ответил не он, а хостинг, тела с причиной нет — судим по коду ответа.
async function toErrorKind(response: Response): Promise<ApiErrorKind> {
  const body = (await response.json().catch(() => null)) as ApiErrorBody | null

  if (body?.error) return body.error
  if (response.status === 429) return 'tooManyRequests'
  if (response.status >= 500) return 'serverDown'
  return 'failed'
}
