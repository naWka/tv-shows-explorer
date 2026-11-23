import { Router } from 'express'
import { addFavorite } from '../tasks/addFavorite.ts'
import { getFavorites } from '../tasks/getFavorites.ts'
import { removeFavorite } from '../tasks/removeFavorite.ts'
import { readToken } from './readToken.ts'
import { sendBadRequest, sendOutcome } from './send.ts'

export const favoritesRouter = Router()

// Все три маршрута отдают список избранного того, кто зовёт: сайт показывает то, что прислал сервер.
// Без ключа сессии в заголовке — 401: у гостя избранного нет.
favoritesRouter.get('/favorites', (req, res) => {
  sendOutcome(res, getFavorites(readToken(req)))
})

favoritesRouter.put('/favorites/:id', async (req, res) => {
  const id = toShowId(req.params.id)
  if (id === null) {
    sendBadRequest(res)
    return
  }

  sendOutcome(res, await addFavorite(readToken(req), id))
})

favoritesRouter.delete('/favorites/:id', (req, res) => {
  const id = toShowId(req.params.id)
  if (id === null) {
    sendBadRequest(res)
    return
  }

  sendOutcome(res, removeFavorite(readToken(req), id))
})

function toShowId(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}
