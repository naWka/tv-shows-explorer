import type { ReactNode } from 'react'
import s from './Link.module.css'

type LinkProps = {
  variant: 'pill' | 'stretched'
  href: string
  target?: '_blank'
  children: ReactNode
}

export function Link({ variant, href, target, children }: LinkProps) {
  return (
    <a className={s.link} data-variant={variant} href={href} target={target} rel="noreferrer">
      {children}
    </a>
  )
}
