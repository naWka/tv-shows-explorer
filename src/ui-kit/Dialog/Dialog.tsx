import type { ReactNode } from 'react'
import s from './Dialog.module.css'

type DialogProps = {
  variant: 'side'
  open: boolean
  /** Название окна для скринридера. */
  label: string
  /** Окно закрыли клавишей Esc или кликом мимо него. */
  onClose: () => void
  children: ReactNode
}

// Окно поверх страницы: пока оно открыто, страница под ним не нажимается, а фокус не выходит за окно.
// Открывает и закрывает его сам браузер (showModal и close), ref только передаёт ему значение open.
export function Dialog({ variant, open, label, onClose, children }: DialogProps) {
  return (
    <dialog
      ref={(node) => {
        if (open && !node?.open) node?.showModal()
        if (!open && node?.open) node.close()
      }}
      className={s.dialog}
      data-variant={variant}
      aria-label={label}
      closedby="any"
      onClose={onClose}
    >
      {children}
    </dialog>
  )
}
