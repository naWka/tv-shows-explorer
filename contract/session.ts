/** Ответ на вход: под каким email вошли и ключ сессии, который сайт присылает в заголовке Authorization. */
export type Session = { email: string; token: string }
