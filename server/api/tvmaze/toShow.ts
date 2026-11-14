import { parse } from 'node-html-parser'
import type { Show } from '../../../contract/show.ts'
import type { TvmazeSearchItem, TvmazeShow } from './types.ts'

export function toShows(items: TvmazeSearchItem[]): Show[] {
  const seen = new Set<number>()

  return items.flatMap(({ show }) => {
    if (seen.has(show.id)) return []
    seen.add(show.id)
    return [toShow(show)]
  })
}

export function toShow(raw: TvmazeShow): Show {
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
  return parse(html).text.trim()
}
