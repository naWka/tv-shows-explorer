import type { ApiErrorKind } from '@contract/apiError'

/** Исход таски logIn. При успехе email и ключ сессии лежат в userStore. */
export type LogInOutcome = { status: 'success' } | { status: 'error'; error: ApiErrorKind }
