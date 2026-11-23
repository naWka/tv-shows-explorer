/**
 * Почему запрос не удался. Текст для каждой причины выбирает презентер на сайте.
 * unauthorized — сервер не знает ключа сессии: не входили, вышли или сервер его забыл.
 */
export type ApiErrorKind = 'network' | 'tooManyRequests' | 'serverDown' | 'unreadable' | 'failed' | 'unauthorized'

/** Тело ответа сервера, когда запрос не удался. */
export type ApiErrorBody = { error: ApiErrorKind }
