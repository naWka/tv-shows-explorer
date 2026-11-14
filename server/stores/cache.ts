// Столько живёт ответ TVmaze: такой же запрос за это время в TVmaze не уходит.
const LIFETIME_MS = 5 * 60 * 1000

const cache: Record<string, { savedAt: number; value: unknown }> = {}

/** Свежее значение по ключу. Устаревшее стирается, и его как будто нет. */
export function readCache<Value>(key: string): Value | undefined {
  const entry = cache[key]
  if (!entry) return undefined

  if (Date.now() - entry.savedAt > LIFETIME_MS) {
    delete cache[key]
    return undefined
  }

  return entry.value as Value
}

export function writeCache(key: string, value: unknown) {
  cache[key] = { savedAt: Date.now(), value }
}
