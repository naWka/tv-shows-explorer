import type { ApiErrorKind } from '@contract/apiError'

export class ApiError extends Error {
  readonly kind: ApiErrorKind

  constructor(kind: ApiErrorKind) {
    super(`API ${kind}`)
    this.kind = kind
  }
}
