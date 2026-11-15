import { makeAutoObservable } from 'mobx'

// Единственное состояние интерфейса в сторе: звёздочка есть и в выдаче, и в панели избранного, а сообщение
// на экране одно, и блокам не нужны props ради уведомления. Показывает его таска showToast: её вызывает презентер
// блока, где нажали звёздочку, когда по исходу действия выбрал текст. Таски избранного toast не показывают.
class ToastStore {
  /** Сообщение на экране. null — сообщения нет. */
  text: string | null = null
  /** Номер сообщения: растёт с каждым показом. */
  id = 0

  constructor() {
    makeAutoObservable(this)
  }

  setText(text: string | null) {
    this.text = text
  }

  setId(id: number) {
    this.id = id
  }
}

export const toastStore = new ToastStore()
