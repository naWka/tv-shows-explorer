import type { ReactNode } from 'react'
import s from './Link.module.css'

type LinkProps = {
  variant: 'pill' | 'stretched'
  href: string
  target?: '_blank'
  /** Слышит только скринридер, после видимого текста: например, что ссылка откроется в новой вкладке. */
  spoken?: string
  children: ReactNode
}

export function Link({ variant, href, target, spoken, children }: LinkProps) {
  return (
    <a className={s.link} data-variant={variant} href={href} target={target} rel="noreferrer">
      {children}
      {spoken ? <span className={s.spoken}> {spoken}</span> : null}
    </a>
  )
}
