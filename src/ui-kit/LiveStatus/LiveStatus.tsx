import s from './LiveStatus.module.css'

type LiveStatusProps = {
  text: string
}

// Текст для скринридера. Владелец ставит его в разметку всегда, вне условий показа:
// скринридер читает только изменения элемента, который уже стоит на странице.
export function LiveStatus({ text }: LiveStatusProps) {
  return (
    <p className={s.status} role="status">
      {text}
    </p>
  )
}
