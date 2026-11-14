import { useRef } from 'react'
import { searchStore } from '@stores/searchStore/searchStore'
import { useShowSearch } from './useShowSearch'

const QUERY_MAX_LENGTH = 100

export function usePresenter() {
  const inputRef = useRef<HTMLInputElement>(null)
  const showSearch = useShowSearch()

  return {
    query: searchStore.query,
    queryMaxLength: QUERY_MAX_LENGTH,
    inputRef,
    isLoading: showSearch.isLoading,
    error: showSearch.error,
    onQueryChange: (value: string) => {
      searchStore.setQuery(value)
      showSearch.search(value)
    },
    onRetry: () => {
      showSearch.retry()
      inputRef.current?.focus()
    },
  }
}
