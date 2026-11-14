import app from './app.ts'

// Локальный запуск. Порт тот же, что в прокси Vite (vite.config.ts). На Vercel приложение запускает api/index.ts.
const PORT = 3001

app.listen(PORT, () => console.log(`Сервер слушает http://localhost:${PORT}`))
