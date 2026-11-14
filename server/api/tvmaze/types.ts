export type TvmazeShow = {
  id: number
  name: string
  url: string
  genres: string[]
  image: { medium: string; original: string } | null
  summary: string | null
  rating: { average: number | null } | null
  premiered: string | null
}

export type TvmazeSearchItem = {
  score: number
  show: TvmazeShow
}
