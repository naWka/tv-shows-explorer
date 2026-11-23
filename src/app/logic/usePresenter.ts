import { useLayoutEffect, useState } from 'react'
import { restoreSession } from './tasks/restoreSession'

// Запуск приложения — такое же событие, как клик: презентер корня зовёт стартовые таски, и только потом рисуются экраны.
// useLayoutEffect успевает до первого кадра: шапка не мигает «Войти», блок избранного не просит список от имени гостя.
export function usePresenter() {
  const [isReady, setIsReady] = useState(false)

  useLayoutEffect(() => {
    restoreSession()
    // Намеренно: вход читается из localStorage до первого кадра, и только потом рисуются экраны.
    // oxlint-disable-next-line react/set-state-in-effect
    setIsReady(true)
  }, [])

  return { isReady }
}
