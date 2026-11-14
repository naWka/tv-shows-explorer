import type { ApiErrorKind } from '@app-types/apiError'

export class ApiError extends Error {
  readonly kind: ApiErrorKind

  constructor(kind: ApiErrorKind) {
    super(`API ${kind}`)
    this.kind = kind
  }
}
