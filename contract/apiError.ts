/** Почему запрос не удался. Текст для каждой причины выбирает презентер на сайте. */
export type ApiErrorKind = 'network' | 'tooManyRequests' | 'serverDown' | 'unreadable' | 'failed'

/** Тело ответа сервера, когда запрос не удался. */
export type ApiErrorBody = { error: ApiErrorKind }
