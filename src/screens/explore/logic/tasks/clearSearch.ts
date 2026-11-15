import { searchStore } from '@stores/searchStore/searchStore'

// Убрать выдачу: поле поиска очистили или поиск не удался.
export function clearSearch() {
  searchStore.setResult(null)
  searchStore.setShownQuery(null)
  searchStore.setIsResultNew(false)
}
