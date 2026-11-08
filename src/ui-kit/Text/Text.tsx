import type { ReactNode } from 'react'
import s from './Text.module.css'

type TextProps = {
  variant: 'display' | 'highlight' | 'title' | 'headline' | 'body' | 'caption' | 'overline' | 'badge'
  as?: 'h1' | 'h2' | 'p' | 'span'
  tone?: 'muted' | 'accent' | 'ink'
  lines?: 1 | 2 | 3
  /** Сколько строк оставить на узком экране (до 720px), если там больше места, чем `lines`. */
  narrowLines?: 5 | 7
  children: ReactNode
}

export function Text({ variant, as: Tag = 'p', tone, lines, narrowLines, children }: TextProps) {
  return (
    <Tag
      className={s.text}
      data-variant={variant}
      data-tone={tone}
      data-lines={lines}
      data-narrow-lines={narrowLines}
    >
      {children}
    </Tag>
  )
}
