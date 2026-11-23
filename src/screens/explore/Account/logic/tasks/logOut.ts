import { deleteSession } from '@api/session/deleteSession'
import { forgetSession } from '@tasks/session/forgetSession'

// Выйти: сервер забывает ключ, сайт забывает вход. Сначала сервер: запросу нужен ключ.
// Если сервер не ответил, сайт всё равно выходит: ключ, который сайт забыл, никто больше не пришлёт.
export async function logOut() {
  await deleteSession().catch(() => undefined)
  forgetSession()
}
