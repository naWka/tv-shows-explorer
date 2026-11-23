import { Router } from 'express'
import { logIn } from '../tasks/logIn.ts'
import { logOut } from '../tasks/logOut.ts'
import { readToken } from './readToken.ts'
import { sendBadRequest, sendOutcome } from './send.ts'

export const sessionRouter = Router()

// POST /api/session { email } — вход: отдаёт email и ключ сессии.
sessionRouter.post('/session', (req, res) => {
  const email = toEmail(req.body?.email)
  if (email === null) {
    sendBadRequest(res)
    return
  }

  sendOutcome(res, logIn(email))
})

// DELETE /api/session — выход по ключу из заголовка. Отвечает 204 всегда: выйти можно и из забытой сессии.
sessionRouter.delete('/session', (req, res) => {
  logOut(readToken(req))
  res.status(204).end()
})

// Email без пробелов по краям и в нижнем регистре: Pavel@Mail.ru и pavel@mail.ru — один пользователь.
// Проверка простая, есть @ и точка в домене: писем не шлём, большего не нужно.
function toEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const email = value.trim().toLowerCase()
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null
}
