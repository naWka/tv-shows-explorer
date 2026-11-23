import { observer } from 'mobx-react-lite'
import { Brand } from '@components/Brand/Brand'
import { texts } from '@locales/index'
import { Button } from '@ui-kit/Button/Button'
import { Form } from '@ui-kit/Form/Form'
import { Input } from '@ui-kit/Input/Input'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { Text } from '@ui-kit/Text/Text'
import s from './Login.module.css'
import { usePresenter } from './logic/usePresenter'

export const Login = observer(function Login() {
  const p = usePresenter()

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Brand />
        <Button variant="outline" onClick={p.onBack}>
          {texts.login.back}
        </Button>
      </header>

      <main className={s.main}>
        <section className={s.card}>
          <Text as="h2" variant="headline" tone="accent">
            {texts.login.title}
          </Text>
          <Text variant="title">{texts.login.lead}</Text>
          <Text variant="body" tone="muted">
            {texts.login.text}
          </Text>

          <Form label={texts.login.title} onSubmit={p.onSubmit}>
            <div className={s.row}>
              <label className={s.field}>
                <Input
                  type="email"
                  autoComplete="email"
                  autoFocus
                  label={texts.login.emailLabel}
                  placeholder={texts.login.emailPlaceholder}
                  value={p.email}
                  maxLength={p.emailMaxLength}
                  onChange={p.onEmailChange}
                />
              </label>
              <Button variant="outline" disabled={p.isDisabled} onClick={p.onSubmit}>
                {p.submitLabel}
              </Button>
            </div>
          </Form>

          <LiveStatus text={p.error} />
          {p.hasError && (
            <Text variant="body" tone="accent">
              {p.error}
            </Text>
          )}
        </section>
      </main>
    </div>
  )
})
