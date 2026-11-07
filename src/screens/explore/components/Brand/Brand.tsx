import s from './Brand.module.css'

export function Brand() {
  return (
    <div className={s.brand}>
      <a className={s.onAir} href="https://www.tvmaze.com" target="_blank" rel="noreferrer">
        <span className={s.dot} aria-hidden="true" />
        В эфире · данные TVmaze
      </a>
      <h1 className={s.title}>
        TV Shows <em className={s.titleAccent}>Explorer</em>
      </h1>
    </div>
  )
}
