import { toastStore } from '@stores/toastStore/toastStore'

// Убрать сообщение: время вышло или человек ушёл с экрана.
export function hideToast() {
  toastStore.setText(null)
  toastStore.setAction(null)
}
