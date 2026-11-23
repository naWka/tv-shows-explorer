import { observer } from 'mobx-react-lite'
import { texts } from '@locales/index'
import { Button } from '@ui-kit/Button/Button'
import { Icon } from '@ui-kit/Icon/Icon'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { Text } from '@ui-kit/Text/Text'
import s from './Toast.module.css'
import { usePresenter } from './logic/usePresenter'

// Стоит на экране и в панели избранного. Открытая панель прячет экран от скринридера, поэтому сообщение показывает
// она, а сообщение экрана на это время скрыто стилями: видно и слышно всегда одно. Текст скринридер слышит через
// LiveStatus, поэтому видимый текст от него скрыт; кнопка в сообщении — обычная кнопка, до неё доходят клавиатурой.
export const Toast = observer(function Toast() {
  const p = usePresenter()

  return (
    <>
      <LiveStatus text={p.text ?? ''} />
      {p.text && (
        <div key={p.id} className={s.toast}>
          <div className={s.message} aria-hidden="true">
            <Icon name="star" size="small" tone="accent" />
            <Text variant="body">{p.text}</Text>
          </div>
          {p.hasLogIn && (
            <div className={s.action}>
              <Button variant="outline" onClick={p.onLogIn}>
                {texts.toast.logIn}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
})
