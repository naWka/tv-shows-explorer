import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setAuthToken } from '@api/client'
import { userStore } from '@stores/userStore/userStore'
import { App } from './app/App'
import './styles/global.css'

// Транспорт берёт ключ сессии через эту функцию: он не знает про стор, стор не знает про транспорт.
setAuthToken(() => userStore.token)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
