import type { Request } from 'express'

/** Ключ сессии из заголовка Authorization: Bearer <ключ>. null — заголовка нет: зовёт гость. */
export function readToken(req: Request): string | null {
  const header = req.get('authorization')
  return header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : null
}
