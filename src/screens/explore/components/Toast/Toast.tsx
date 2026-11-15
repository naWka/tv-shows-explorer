import { observer } from 'mobx-react-lite'
import { Icon } from '@ui-kit/Icon/Icon'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { Text } from '@ui-kit/Text/Text'
import s from './Toast.module.css'
import { usePresenter } from './logic/usePresenter'

// Стоит на экране и в панели избранного. Открытая панель прячет экран от скринридера, поэтому сообщение показывает
// она, а сообщение экрана на это время скрыто стилями: видно и слышно всегда одно.
export const Toast = observer(function Toast() {
  const p = usePresenter()

  return (
    <>
      <LiveStatus text={p.text ?? ''} />
      {p.text && (
        <div key={p.id} className={s.toast} aria-hidden="true">
          <Icon name="star" size="small" tone="accent" />
          <Text variant="body">{p.text}</Text>
        </div>
      )}
    </>
  )
})
