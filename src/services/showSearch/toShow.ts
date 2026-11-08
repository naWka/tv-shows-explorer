import type { TvmazeSearchItem, TvmazeShow } from '@api/tvmaze/types'
import { ru } from '@locales/ru'
import type { Show } from '@app-types/show'

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
    name: raw.name || ru.showSearch.untitled,
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
