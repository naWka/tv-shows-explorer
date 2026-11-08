import type { ReactNode } from 'react'
import s from './Icon.module.css'

type IconName = 'search' | 'prev' | 'next'

type IconProps = {
  name: IconName
  size: 'medium' | 'large'
  tone?: 'accent'
}

const shapes: Record<IconName, ReactNode> = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  prev: <path d="M14.5 6 8.5 12l6 6" />,
  next: <path d="M9.5 6l6 6-6 6" />,
}

export function Icon({ name, size, tone }: IconProps) {
  return (
    <svg className={s.icon} data-size={size} data-tone={tone} viewBox="0 0 24 24" aria-hidden="true">
      {shapes[name]}
    </svg>
  )
}
