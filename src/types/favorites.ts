import type { ApiErrorKind } from '@contract/apiError'

/** Исход тасок избранного. При успехе в сторе лежит список, который прислал сервер. */
export type FavoritesOutcome = { status: 'success' } | { status: 'error'; error: ApiErrorKind }
