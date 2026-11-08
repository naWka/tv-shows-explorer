import type { ReactNode } from 'react'
import s from './Icon.module.css'

type IconName = 'search' | 'prev' | 'next' | 'star' | 'external'

type IconProps = {
  name: IconName
  size: 'small' | 'medium' | 'large'
  tone?: 'accent' | 'ink'
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
  external: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  star: (
    <path
      fill="currentColor"
      d="M12 3.5l2.6 5.3 5.8.84-4.2 4.1 1 5.8L12 16.8l-5.2 2.74 1-5.8-4.2-4.1 5.8-.84z"
    />
  ),
}

export function Icon({ name, size, tone }: IconProps) {
  return (
    <svg className={s.icon} data-size={size} data-tone={tone} viewBox="0 0 24 24" aria-hidden="true">
      {shapes[name]}
    </svg>
  )
}
