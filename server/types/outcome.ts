import type { ApiErrorKind } from '../../contract/apiError.ts'

/** Исход таски сервера: данные для ответа или причина, по которой действие не удалось. */
export type Outcome<Data> = { status: 'success'; data: Data } | { status: 'error'; error: ApiErrorKind }
