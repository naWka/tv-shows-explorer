import { makeAutoObservable } from 'mobx'

// Единственное состояние интерфейса в сторе (тридцать первое правило).
class ToastStore {
  /** Сообщение на экране. null — сообщения нет. */
  text: string | null = null
  /** Номер сообщения: растёт с каждым показом, чтобы то же сообщение второй раз показалось заново. */
  id = 0

  constructor() {
    makeAutoObservable(this)
  }

  show(text: string) {
    this.text = text
    this.id += 1
  }

  hide() {
    this.text = null
  }
}

export const toastStore = new ToastStore()
