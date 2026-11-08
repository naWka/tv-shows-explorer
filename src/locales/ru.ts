export const ru = {
  brand: {
    onAir: 'В эфире · данные TVmaze',
  },
  explore: {
    searchLabel: 'Поиск шоу',
    searchPlaceholder: 'Murder, Office, Lost…',
  },
  searchState: {
    idle: { title: 'Ждём сигнал', text: 'Начните вводить название — эфир включится сам' },
    loading: { title: 'Ловим сигнал…', spoken: 'Ищем шоу…' },
    error: { title: 'Нет сигнала', retry: 'Попробовать ещё раз' },
    empty: {
      title: 'Пустой эфир',
      text: (query: string) => `По запросу «${query}» ничего не нашлось`,
      spoken: 'Ничего не нашлось',
    },
  },
  searchResults: {
    label: 'Результаты поиска',
    spoken: (found: number, page: number, pageCount: number) =>
      `Найдено шоу: ${found}. Страница ${page} из ${pageCount}`,
  },
  genreFilter: {
    label: 'Фильтр по жанру',
    all: 'Все',
  },
  pagination: {
    label: 'Страницы',
    prev: 'Предыдущая страница',
    next: 'Следующая страница',
    page: (page: number) => `Страница ${page}`,
  },
  showCard: {
    noSummary: 'Описания пока нет.',
    unknownYear: 'Год неизвестен',
  },
  showPoster: {
    noPoster: 'Нет постера',
  },
  showSearch: {
    untitled: 'Без названия',
    errors: {
      unreadable: 'TVmaze прислал непонятный ответ. Попробуйте ещё раз.',
      network: 'Нет связи с TVmaze. Проверьте интернет и попробуйте ещё раз.',
      tooManyRequests: 'TVmaze просит передышку: слишком много запросов. Подождите минуту.',
      serverDown: 'TVmaze сейчас не отвечает. Попробуйте чуть позже.',
      failed: 'TVmaze не смог выполнить поиск. Попробуйте изменить запрос.',
    },
  },
}
