import type { Response } from 'express'
import type { ApiErrorBody, ApiErrorKind } from '../../contract/apiError.ts'
import type { Outcome } from '../types/outcome.ts'

// Каким кодом ответить на причину ошибки. 502 — подвёл TVmaze, а не наш сервер. 401 — сервер не знает, кто зовёт.
const STATUS: Record<ApiErrorKind, number> = {
  network: 502,
  serverDown: 502,
  unreadable: 502,
  failed: 502,
  tooManyRequests: 429,
  unauthorized: 401,
}

/** Ответ по исходу таски: данные или причина ошибки с её кодом. */
export function sendOutcome<Data>(res: Response, outcome: Outcome<Data>) {
  if (outcome.status === 'success') {
    res.json(outcome.data)
    return
  }

  const body: ApiErrorBody = { error: outcome.error }
  res.status(STATUS[outcome.error]).json(body)
}

/** Запрос составлен неверно: до таски дело не дошло. */
export function sendBadRequest(res: Response) {
  const body: ApiErrorBody = { error: 'failed' }
  res.status(400).json(body)
}
