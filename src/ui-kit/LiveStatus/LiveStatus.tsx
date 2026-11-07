import s from './LiveStatus.module.css'

type LiveStatusProps = {
  text: string
}

export function LiveStatus({ text }: LiveStatusProps) {
  return (
    <p className={s.status} role="status">
      {text}
    </p>
  )
}
