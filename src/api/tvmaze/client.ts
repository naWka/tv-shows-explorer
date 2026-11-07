import type { TvmazeSearchItem } from './types'

const BASE_URL = 'https://api.tvmaze.com'

export type TvmazeErrorKind = 'network' | 'http' | 'parse'

export class TvmazeError extends Error {
  readonly kind: TvmazeErrorKind
  readonly status: number | null

  constructor(kind: TvmazeErrorKind, status: number | null = null) {
    super(status === null ? `TVmaze ${kind}` : `TVmaze ${kind} ${status}`)
    this.kind = kind
    this.status = status
  }
}

export async function fetchShowSearch(query: string, signal: AbortSignal): Promise<TvmazeSearchItem[]> {
  const url = `${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`
  const response = await fetch(url, { signal }).catch((error: unknown) => {
    throw signal.aborted ? error : new TvmazeError('network')
  })

  if (!response.ok) {
    throw new TvmazeError('http', response.status)
  }

  const data: unknown = await response.json().catch((error: unknown) => {
    throw signal.aborted ? error : new TvmazeError('parse')
  })

  if (!Array.isArray(data)) {
    throw new TvmazeError('parse')
  }

  return data as TvmazeSearchItem[]
}
