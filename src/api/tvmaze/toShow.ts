import type { Show } from '@app-types/show'
import type { TvmazeSearchItem, TvmazeShow } from './types'

export function toShows(items: TvmazeSearchItem[]): Show[] {
  const seen = new Set<number>()

  return items.flatMap(({ show }) => {
    if (seen.has(show.id)) return []
    seen.add(show.id)
    return [toShow(show)]
  })
}

function toShow(raw: TvmazeShow): Show {
  return {
    id: raw.id,
    name: raw.name || '',
    url: raw.url,
    genres: Array.isArray(raw.genres) ? raw.genres : [],
    poster: toPoster(raw.image),
    summary: htmlToText(raw.summary ?? ''),
    rating: raw.rating?.average ?? null,
    year: raw.premiered ? Number(raw.premiered.slice(0, 4)) : null,
  }
}

function toPoster(image: TvmazeShow['image']): Show['poster'] {
  const small = image?.medium || image?.original
  const large = image?.original || image?.medium
  return small && large ? { small, large } : null
}

function htmlToText(html: string): string {
  const text = new DOMParser().parseFromString(html, 'text/html').body.textContent
  return text?.trim() ?? ''
}
