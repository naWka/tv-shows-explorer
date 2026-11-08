export type Show = {
  id: number
  name: string
  url: string
  genres: string[]
  /** small — лёгкий файл (~20 КБ), large — исходный, до 1,5 МБ. Если у шоу есть только один, оба адреса одинаковые. */
  poster: { small: string; large: string } | null
  summary: string
  rating: number | null
  year: number | null
}
