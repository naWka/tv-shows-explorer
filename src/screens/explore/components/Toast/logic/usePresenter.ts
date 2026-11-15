import { useEffect } from 'react'
import { toastStore } from '@stores/toastStore/toastStore'

// Столько сообщение висит на экране: хватает прочитать строку с названием шоу.
const VISIBLE_MS = 3500

export function usePresenter() {
  const { text, id } = toastStore

  // Новое сообщение (новый id) отсчитывает своё время заново.
  useEffect(() => {
    if (text === null) return

    const timer = setTimeout(() => toastStore.setText(null), VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [id, text])

  return { text, id }
}
