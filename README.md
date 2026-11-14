# TV Shows Explorer

Поиск сериалов через [TVmaze API](https://www.tvmaze.com/api): выдача по 3 на страницу, фильтр по жанрам, избранное, загрузка и ошибки.
Учебный проект на буткемпе Simple Architecture — каждую неделю развивается под тему новой лекции.

Открыть: https://tv-shows-explorer-nine.vercel.app

Сайт: React 19 · TypeScript · Vite · MobX · CSS Modules. Сервер: Express на Node 24. Хостинг обоих: Vercel. Проверки: oxlint.

```sh
npm install
npm run dev     # сайт (Vite) и сервер (Express, порт 3001) вместе
npm run build   # сборка и проверка типов сайта и сервера
npm run lint    # oxlint + проверки размера файлов и тегов вне ui-kit
```

## Кто что делает

Сайт показывает и спрашивает, сервер решает. В TVmaze ходит только сервер.

- **Сервер**: разговор с TVmaze и кеш его ответов на 5 минут, фильтр по жанру, нарезка страниц по три, счётчики жанров, избранное (одно на всех посетителей).
- **Сайт**: ввод запроса с паузой, обрыв устаревшего запроса, загрузка и ошибки, показ пришедшей страницы, звёздочки, панель избранного и toast.

Кеш и избранное лежат в памяти сервера, в обычных объектах: Vercel выключает сервер примерно через 5 минут без запросов, и они обнуляются.

## Структура

```
api/index.ts                 вход сервера для Vercel: одна строка
contract/                    типы данных, которыми обмениваются сайт и сервер: Show, ShowsPage, ApiErrorKind
server/
  app.ts                     приложение Express, одно на все маршруты
  listen.ts                  локальный запуск
  routes/                    маршруты: разбирают запрос, вызывают таску, выбирают код ответа
  tasks/                     таски: searchShows, addFavorite, removeFavorite, getFavorites
  api/tvmaze/                транспорт и методы API TVmaze, перевод ответа в Show
  stores/                    данные в памяти: cache.ts и favorite.ts
src/
  ui-kit/                    атомы без логики и предметной области: Text, Button, Input, Link,
                             Image, Icon, Chip, Dialog, LiveStatus
  screens/
    explore/                 единственный экран — поиск
      Explore.tsx            разметка экрана
      logic/                 логика экрана: usePresenter.ts, useShowSearch.ts (все запросы поиска),
                             useFavoriteToggle.ts (звёздочка), tasks/ (таски экрана)
      Brand/ SearchInput/    блоки, нужные только этому экрану
      SearchState/           заглушки: пусто, загрузка, ошибка, ничего не найдено
      SearchResults/         жанры, карточки, пагинация
      Favorites/             кнопка со счётчиком и боковая панель со списком
      components/Toast/      сообщение, нужное и экрану, и панели избранного
  stores/                    сторы MobX: searchStore, favoritesStore, toastStore
  api/                       транспорт (client.ts) и методы API нашего сервера
  types/                     свои типы сайта: исходы тасок
  locales/                   все тексты интерфейса: ru.ts, а index.ts отдаёт выбранный язык
  styles/                    tokens.css (цвета, шрифты, отступы) и global.css
scripts/                     проверки для npm run lint и ux-shots.mjs — снимки экрана для ревью удобства
```

Компонент — папка `<Name>/` с `<Name>.tsx`, рядом `<Name>.module.css`, при логике `logic/usePresenter.ts`, дочерние компоненты — папками тут же.
Компонент лежит рядом с тем, кто его использует; нужный двум местам переезжает в `components/` их общей папки, двум экранам — в `src/components/`.

## Как идёт поиск

```
сайт:    view → usePresenter → таска → src/api ──────┐
              ↑ исход          ↓ страница выдачи     │  GET /api/shows?q=…&genre=…&page=…
              └────────── searchStore → view         │
                                                     ▼
сервер:  маршрут → таска → server/api/tvmaze → TVmaze
                     ↓↑
              stores/cache (5 минут)
```

View — только разметка. Презентер вызывает таску и ждёт её исход: загрузку и ошибку он держит у себя. Таска кладёт пришедшую страницу в стор; стор только хранит, в сеть не ходит. На сервере цепочка та же: маршрут вызывает таску, таска берёт выдачу из кеша или из TVmaze, фильтрует и режет на страницы. Формат TVmaze виден только в `server/api/tvmaze/`.

Избранное идёт тем же путём: звёздочка → презентер блока → таска → `PUT` или `DELETE /api/favorites/<id>` → сервер сохраняет шоу и отдаёт обновлённый список → `favoritesStore`.

Слои сайта импортируются через алиасы: `@ui-kit/`, `@stores/`, `@api/`, `@app-types/`, `@locales/`, `@contract/`. В коде сервера импорты только относительные.

Все правила с объяснениями — в [ARCHITECTURE.md](ARCHITECTURE.md).
