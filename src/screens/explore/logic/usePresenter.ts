import { useEffect, useRef } from 'react'
import { createShowSearch, type ShowSearch } from '@services/showSearch/showSearch'
import { searchStore } from '@stores/searchStore/searchStore'

const QUERY_MAX_LENGTH = 100

export function usePresenter() {
  const serviceRef = useRef<ShowSearch | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const service = createShowSearch((result) => searchStore.setSearchResult(result))
    serviceRef.current = service
    return () => service.dispose()
  }, [])

  return {
    query: searchStore.query,
    queryMaxLength: QUERY_MAX_LENGTH,
    inputRef,
    onQueryChange: (value: string) => {
      searchStore.setQuery(value)
      serviceRef.current?.search(value)
    },
    onRetry: () => {
      serviceRef.current?.retry()
      inputRef.current?.focus()
    },
  }
}
