import express from 'express'
import { favoritesRouter } from './routes/favorites.ts'
import { sessionRouter } from './routes/session.ts'
import { showsRouter } from './routes/shows.ts'

// Одно приложение на все маршруты: у поиска, входа и избранного общая память.
// Живёт она, пока Vercel держит экземпляр функции: по замеру он выбрасывает его примерно через 5 минут без запросов,
// и каждый пуш в main тоже начинает с чистой памяти. Кеш, сессии и пользователи с их избранным обнуляются:
// сайт покажет «Вход истёк», человек войдёт снова, но список будет пустой. Локально всё живёт, пока работает сервер.
// Принято осознанно: база в ДЗ запрещена, а пинг по расписанию не даёт гарантии (GitHub опаздывает, деплой всё равно чистит).
const app = express()

app.use(express.json())
app.use('/api', showsRouter, sessionRouter, favoritesRouter)

export default app
