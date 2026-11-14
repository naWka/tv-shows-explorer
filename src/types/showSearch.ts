import type { ApiErrorKind } from './apiError'

/** Исход таски searchShows. cancelled — запрос оборвали раньше ответа, стор не тронут. */
export type ShowSearchOutcome = { status: 'success' | 'cancelled' } | { status: 'error'; error: ApiErrorKind }
