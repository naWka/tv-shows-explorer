import { TvmazeError } from '../../api/tvmaze/client'

const UNREADABLE = 'TVmaze прислал непонятный ответ. Попробуйте ещё раз.'

export function toErrorMessage(error: unknown): string {
  if (!(error instanceof TvmazeError) || error.kind === 'parse') return UNREADABLE
  if (error.kind === 'network') return 'Нет связи с TVmaze. Проверьте интернет и попробуйте ещё раз.'
  if (error.status === 429) return 'TVmaze просит передышку: слишком много запросов. Подождите минуту.'
  if (error.status !== null && error.status >= 500) return 'TVmaze сейчас не отвечает. Попробуйте чуть позже.'
  return 'TVmaze не смог выполнить поиск. Попробуйте изменить запрос.'
}
