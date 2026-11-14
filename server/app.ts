import express from 'express'
import { favoritesRouter } from './routes/favorites.ts'
import { showsRouter } from './routes/shows.ts'

// Одно приложение на все маршруты: у поиска и избранного общая память (двадцать пятое правило).
const app = express()

app.use('/api', showsRouter, favoritesRouter)

export default app
