import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { Explore } from '../screens/explore/Explore'
import { Login } from '../screens/login/Login'
import { usePresenter } from './logic/usePresenter'

// Адреса экранов. Незнакомый адрес ведёт на поиск.
export function App() {
  const p = usePresenter()

  return (
    p.isReady && (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    )
  )
}
