import { observer } from 'mobx-react-lite'
import { texts } from '@locales/index'
import { Button } from '@ui-kit/Button/Button'
import { Text } from '@ui-kit/Text/Text'
import s from './Account.module.css'
import { usePresenter } from './logic/usePresenter'

// Кто смотрит: гостю — вход, вошедшему — его email и выход.
export const Account = observer(function Account() {
  const p = usePresenter()

  return (
    <div className={s.account}>
      {p.isGuest ? (
        <Button variant="outline" onClick={p.onLogIn}>
          {texts.account.logIn}
        </Button>
      ) : (
        <>
          <div className={s.email}>
            <Text as="span" variant="badge" lines={1}>
              {p.email}
            </Text>
          </div>
          <Button variant="outline" label={p.logOutLabel} onClick={p.onLogOut}>
            {texts.account.logOut}
          </Button>
        </>
      )}
    </div>
  )
})
