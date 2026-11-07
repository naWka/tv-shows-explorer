import type { Show } from './show'

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

export type ShowSearchResult = {
  status: SearchStatus
  shows: Show[]
  error: string | null
}
