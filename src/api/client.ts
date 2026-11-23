import { ApiError } from '@api/apiError'
import type { ApiErrorBody, ApiErrorKind } from '@contract/apiError'

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  /** Тело запроса: уходит JSON-ом. */
  body?: unknown
  signal?: AbortSignal
}

// Ключ сессии отдаёт функция, которую main.tsx передаёт при запуске. Где ключ хранится, транспорт не знает
// и стор не импортирует. Без этой связки запрос падает сразу, а не уходит тихо от имени гостя.
let readToken: () => string | null = () => {
  throw new Error('setAuthToken was not called at startup')
}

export function setAuthToken(read: () => string | null) {
  readToken = read
}

// Транспорт: один запрос к нашему серверу. Сайт и сервер живут на одном адресе, поэтому путь относительный.
// Что лежит в ответе, знает метод API, который его вызвал.
export async function requestJson(path: string, { method = 'GET', body, signal }: RequestOptions = {}): Promise<unknown> {
  const headers: Record<string, string> = {}
  const token = readToken()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const response = await fetch(`/api${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  }).catch((error: unknown) => {
    throw signal?.aborted ? error : new ApiError('network')
  })

  if (!response.ok) {
    throw new ApiError(await toErrorKind(response))
  }

  // Ответ без тела: так отвечает выход.
  if (response.status === 204) return null

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
