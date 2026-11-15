import express from 'express'
import { favoritesRouter } from './routes/favorites.ts'
import { showsRouter } from './routes/shows.ts'

// Одно приложение на все маршруты: у поиска и избранного общая память.
// Живёт она, пока Vercel держит экземпляр функции: по замеру он выбрасывает его примерно через 5 минут без запросов,
// и кеш с избранным обнуляются. Для учебного проекта это принято.
const app = express()

app.use('/api', showsRouter, favoritesRouter)

export default app
