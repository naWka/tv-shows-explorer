import { toastStore } from '@stores/toastStore/toastStore'

// Показать сообщение. Номер растёт с каждым показом, чтобы то же сообщение второй раз показалось заново.
export function showToast(text: string) {
  toastStore.setText(text)
  toastStore.setId(toastStore.id + 1)
}
