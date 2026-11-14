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
    error: {
      title: 'Нет сигнала',
      retry: 'Попробовать ещё раз',
      reasons: {
        unreadable: 'TVmaze прислал непонятный ответ. Попробуйте ещё раз.',
        network: 'Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.',
        tooManyRequests: 'TVmaze просит передышку: слишком много запросов. Подождите минуту.',
        serverDown: 'TVmaze сейчас не отвечает. Попробуйте чуть позже.',
        failed: 'TVmaze не смог выполнить поиск. Попробуйте изменить запрос.',
      },
    },
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
    loadingSpoken: 'Ищем шоу…',
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
    untitled: 'Без названия',
    noSummary: 'Описания пока нет.',
    unknownYear: 'Год неизвестен',
    source: 'TVmaze',
    sourceSpoken: '(откроется на TVmaze в новой вкладке)',
  },
  showPoster: {
    noPoster: 'Нет постера',
  },
  favorites: {
    open: 'Избранное',
    openSpoken: (count: number) => `Открыть избранное. Шоу в нём: ${count}`,
    title: 'Избранное',
    close: 'Закрыть избранное',
    empty: { title: 'Пока пусто', text: 'Нажмите звёздочку на карточке — шоу появится здесь' },
    loadFailed: 'Не получилось загрузить избранное. Обновите страницу.',
  },
  favoriteToggle: {
    add: (title: string) => `Добавить «${title}» в избранное`,
    remove: (title: string) => `Убрать «${title}» из избранного`,
    toast: {
      added: (title: string) => `«${title}» — в избранном`,
      removed: (title: string) => `«${title}» убрано из избранного`,
      addFailed: (title: string) => `Не получилось добавить «${title}». Попробуйте ещё раз.`,
      removeFailed: (title: string) => `Не получилось убрать «${title}». Попробуйте ещё раз.`,
    },
  },
}
