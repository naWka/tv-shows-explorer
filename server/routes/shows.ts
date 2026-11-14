import { Router } from 'express'
import { searchShows } from '../tasks/searchShows.ts'
import { sendBadRequest, sendOutcome } from './send.ts'

export const showsRouter = Router()

// GET /api/shows?q=office&genre=Comedy&page=2 — страница выдачи. Без page отдаём первую, без genre — все жанры.
showsRouter.get('/shows', async (req, res) => {
  const { q, genre, page } = req.query
  const query = typeof q === 'string' ? q.trim() : ''
  const pageNumber = page === undefined ? 1 : Number(page)

  if (!query || !Number.isInteger(pageNumber) || pageNumber < 1) {
    sendBadRequest(res)
    return
  }

  sendOutcome(res, await searchShows(query, typeof genre === 'string' && genre ? genre : null, pageNumber))
})
