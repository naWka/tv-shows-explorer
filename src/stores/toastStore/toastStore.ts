import { makeAutoObservable } from 'mobx'
import type { ToastAction } from '@app-types/toast'

// Единственное состояние интерфейса в сторе: звёздочка есть и в выдаче, и в панели избранного, а сообщение
// на экране одно, и блокам не нужны props ради уведомления. Показывает его таска showToast: её вызывает презентер
// блока, где нажали звёздочку, когда по исходу действия выбрал текст. Убирает — hideToast. Таски избранного toast
// не показывают.
class ToastStore {
  /** Сообщение на экране. null — сообщения нет. */
  text: string | null = null
  /** Номер сообщения: растёт с каждым показом. */
  id = 0
  /** Кнопка в сообщении. null — сообщение без кнопки. */
  action: ToastAction | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setText(text: string | null) {
    this.text = text
  }

  setId(id: number) {
    this.id = id
  }

  setAction(action: ToastAction | null) {
    this.action = action
  }
}

export const toastStore = new ToastStore()
