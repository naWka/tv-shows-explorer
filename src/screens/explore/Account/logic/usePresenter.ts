import { useNavigate } from 'react-router'
import { texts } from '@locales/index'
import { userStore } from '@stores/userStore/userStore'
import { logOut } from './tasks/logOut'

export function usePresenter() {
  const navigate = useNavigate()
  const { email } = userStore

  return {
    isGuest: email === null,
    email: email ?? '',
    logOutLabel: texts.account.logOutSpoken(email ?? ''),
    onLogIn: () => navigate('/login'),
    onLogOut: () => void logOut(),
  }
}
