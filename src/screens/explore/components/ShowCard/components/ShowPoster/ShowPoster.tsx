import s from './ShowPoster.module.css'

type ShowPosterProps = {
  imageUrl: string | null
  number: string
  rating: number | null
}

export function ShowPoster({ imageUrl, number, rating }: ShowPosterProps) {
  return (
    <div className={s.screen}>
      {imageUrl ? (
        <img className={s.poster} src={imageUrl} alt="" data-fallback="Нет постера" loading="lazy" />
      ) : (
        <div className={s.noImage}>Нет постера</div>
      )}
      <span className={s.number}>№ {number}</span>
      {rating ? <span className={s.rating}>★ {rating}</span> : null}
    </div>
  )
}
