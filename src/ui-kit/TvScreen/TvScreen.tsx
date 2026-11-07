import type { ReactNode } from 'react'
import s from './TvScreen.module.css'

type TvScreenProps = {
  variant: 'idle' | 'static' | 'bars'
  title: string
  text?: ReactNode
  actionLabel?: string
  onAction?: () => void
}

export function TvScreen({ variant, title, text, actionLabel, onAction }: TvScreenProps) {
  return (
    <div className={s.tv}>
      <div className={s.screen} data-variant={variant}>
        <div className={s.overlay}>
          <p className={s.title}>{title}</p>
          {text && <p className={s.text}>{text}</p>}
          {actionLabel && (
            <button type="button" className={s.action} onClick={onAction}>
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
