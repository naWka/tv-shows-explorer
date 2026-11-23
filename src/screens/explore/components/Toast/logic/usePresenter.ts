import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toastStore } from '@stores/toastStore/toastStore'
import { hideToast } from '../../../logic/tasks/hideToast'

// Столько сообщение висит на экране: хватает прочитать строку с названием шоу.
const VISIBLE_MS = 3500
// Сообщение с кнопкой висит дольше: прочитать, решить и успеть нажать.
const VISIBLE_WITH_ACTION_MS = 6000

export function usePresenter() {
  const navigate = useNavigate()
  const { text, id, action } = toastStore

  // Новое сообщение (новый id) отсчитывает своё время заново.
  useEffect(() => {
    if (text === null) return

    const timer = setTimeout(hideToast, action === null ? VISIBLE_MS : VISIBLE_WITH_ACTION_MS)
    return () => clearTimeout(timer)
  }, [id, text, action])

  // Ушли с экрана — сообщение уходит вместе с ним: иначе, вернувшись после входа, человек снова увидит «Войдите…».
  useEffect(() => hideToast, [])

  return {
    text,
    id,
    hasLogIn: action === 'logIn',
    onLogIn: () => navigate('/login'),
  }
}
