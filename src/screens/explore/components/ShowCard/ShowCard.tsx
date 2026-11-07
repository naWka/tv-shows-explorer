import type { Show } from '../../../../types/show'
import { ShowPoster } from './components/ShowPoster/ShowPoster'
import s from './ShowCard.module.css'

type ShowCardProps = {
  show: Show
  number: string
}

export function ShowCard({ show, number }: ShowCardProps) {
  return (
    <article className={s.card}>
      <div className={s.body}>
        <h2 className={s.name}>
          <a className={s.link} href={show.url} target="_blank" rel="noreferrer">
            {show.name}
          </a>
        </h2>
        <p className={s.meta}>
          <span>{show.year ?? 'Год неизвестен'}</span>
          {show.genres.map((genre) => (
            <span key={genre} className={s.genre}>
              {genre}
            </span>
          ))}
        </p>
        <p className={s.summary}>{show.summary || 'Описания пока нет.'}</p>
      </div>

      <ShowPoster imageUrl={show.imageUrl} number={number} rating={show.rating} />
    </article>
  )
}
