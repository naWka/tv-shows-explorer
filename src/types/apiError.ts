/** Почему запрос к серверу не удался. Текст для каждой причины выбирает презентер. */
export type ApiErrorKind = 'network' | 'tooManyRequests' | 'serverDown' | 'unreadable' | 'failed'
