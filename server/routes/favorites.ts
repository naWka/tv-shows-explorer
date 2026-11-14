import { Router } from 'express'
import { addFavorite } from '../tasks/addFavorite.ts'
import { getFavorites } from '../tasks/getFavorites.ts'
import { removeFavorite } from '../tasks/removeFavorite.ts'
import { sendBadRequest, sendOutcome } from './send.ts'

export const favoritesRouter = Router()

// Все три маршрута отдают список избранного: сайт показывает то, что прислал сервер.
favoritesRouter.get('/favorites', (_req, res) => {
  sendOutcome(res, getFavorites())
})

favoritesRouter.put('/favorites/:id', async (req, res) => {
  const id = toShowId(req.params.id)
  if (id === null) {
    sendBadRequest(res)
    return
  }

  sendOutcome(res, await addFavorite(id))
})

favoritesRouter.delete('/favorites/:id', (req, res) => {
  const id = toShowId(req.params.id)
  if (id === null) {
    sendBadRequest(res)
    return
  }

  sendOutcome(res, removeFavorite(id))
})

function toShowId(value: string): number | null {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}
