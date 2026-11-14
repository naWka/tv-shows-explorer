import type { ApiErrorKind } from '@contract/apiError'

/** Что просим у сервера: выдачу по запросу, один жанр из неё (null — все) и номер страницы. */
export type ShowSearchRequest = { query: string; genre: string | null; page: number }

/** Исход таски searchShows. cancelled — запрос оборвали раньше ответа, стор не тронут. */
export type ShowSearchOutcome = { status: 'success' | 'cancelled' } | { status: 'error'; error: ApiErrorKind }
