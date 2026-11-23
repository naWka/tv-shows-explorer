export const ru = {
  brand: {
    onAir: 'В эфире · данные TVmaze',
  },
  explore: {
    searchLabel: 'Поиск шоу',
    searchPlaceholder: 'Murder, Office, Lost…',
  },
  // title и text видны на экране, spoken слышит скринридер. Лежат рядом: меняя экран, сразу видишь, что прозвучит.
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
        unauthorized: 'Сервер вас не узнал. Войдите ещё раз.',
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
    guest: { title: 'Нужен вход', text: 'Войдите, чтобы собирать избранное: оно хранится под вашим email' },
    logIn: 'Войти',
    loadFailed: 'Не получилось загрузить избранное. Обновите страницу.',
    expired: 'Вход истёк: сервер вас забыл. Войдите снова, чтобы увидеть своё избранное.',
  },
  account: {
    logIn: 'Войти',
    logOut: 'Выйти',
    logOutSpoken: (email: string) => `Выйти из аккаунта ${email}`,
  },
  login: {
    back: 'К поиску',
    title: 'Вход',
    lead: 'Избранное живёт под вашим email',
    text: 'Без пароля и регистрации: введите email, и сервер вспомнит ваш список.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    submit: 'Войти',
    submitting: 'Входим…',
    errors: {
      invalidEmail: 'Похоже, в адресе опечатка. Проверьте email.',
      network: 'Нет связи с сервером. Проверьте интернет и попробуйте ещё раз.',
      other: 'Не получилось войти. Попробуйте ещё раз.',
    },
  },
  toast: {
    logIn: 'Войти',
  },
  favoriteToggle: {
    add: (title: string) => `Добавить «${title}» в избранное`,
    remove: (title: string) => `Убрать «${title}» из избранного`,
    toast: {
      added: (title: string) => `«${title}» — в избранном`,
      removed: (title: string) => `«${title}» убрано из избранного`,
      addFailed: (title: string) => `Не получилось добавить «${title}». Попробуйте ещё раз.`,
      removeFailed: (title: string) => `Не получилось убрать «${title}». Попробуйте ещё раз.`,
      expired: 'Вход истёк: сервер вас забыл. Войдите снова, чтобы менять избранное.',
      guest: 'Избранное — после входа',
    },
  },
}
