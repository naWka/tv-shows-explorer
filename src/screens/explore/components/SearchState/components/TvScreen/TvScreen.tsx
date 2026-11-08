import type { ReactNode } from 'react'
import { Button } from '@ui-kit/Button/Button'
import { Text } from '@ui-kit/Text/Text'
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
          <div className={s.title}>
            <Text variant="headline" tone="accent">
              {title}
            </Text>
          </div>
          {text && (
            <Text variant="body" tone="muted">
              {text}
            </Text>
          )}
          {actionLabel && onAction && (
            <div className={s.actions}>
              <Button variant="outline" onClick={onAction}>
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
