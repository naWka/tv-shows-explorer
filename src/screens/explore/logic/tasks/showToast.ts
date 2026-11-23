import type { ToastAction } from '@app-types/toast'
import { toastStore } from '@stores/toastStore/toastStore'

// Показать сообщение, с кнопкой действия или без. Номер растёт с каждым показом, чтобы то же сообщение второй раз
// показалось заново.
export function showToast(text: string, action: ToastAction | null = null) {
  toastStore.setText(text)
  toastStore.setAction(action)
  toastStore.setId(toastStore.id + 1)
}
