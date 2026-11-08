# TV Shows Explorer

Поиск сериалов через [TVmaze API](https://www.tvmaze.com/api): выдача по 3 на страницу, фильтр по жанрам, загрузка и ошибки.
Учебный проект на буткемпе Simple Architecture — каждую неделю развивается под тему новой лекции.

React 19 · TypeScript · Vite · MobX · CSS Modules · oxlint

```sh
npm install
npm run dev     # локальный сервер
npm run build   # сборка и проверка типов
npm run lint    # oxlint + проверки размера файлов и тегов вне ui-kit
```

## Структура

```
src/
  ui-kit/                    атомы без логики и предметной области: Text, Button, Input, Link,
                             Image, Icon, Chip, LiveStatus
  screens/
    explore/                 единственный экран — поиск
      Explore.tsx            разметка экрана
      usePresenter.ts        логика экрана
      components/            блоки, нужные только этому экрану
        Brand/
        SearchInput/
        SearchState/         заглушки: пусто, загрузка, ошибка, ничего не найдено
          components/TvScreen/
        SearchResults/       жанры, карточки, пагинация
          components/GenreFilter/ Pagination/ ShowCard/
  stores/searchStore/        глобальный стор MobX: запрос, жанр, страница, результат поиска
  services/showSearch/       пауза во вводе, отмена устаревшего запроса, перевод ответа в Show
  api/tvmaze/                транспорт: URL, fetch, проверка ответа, типы TVmaze
  types/                     наши типы данных (Show, ShowSearchResult)
  locales/ru.ts              все тексты интерфейса
  styles/                    tokens.css (цвета, шрифты, отступы) и global.css
scripts/                     проверки для npm run lint и ux-shots.mjs — снимки экрана для ревью удобства
```

Компонент — папка `<Name>/` с `<Name>.tsx`, рядом `<Name>.module.css`, при логике `usePresenter.ts`, вложенные компоненты в его `components/`.
Компонент лежит рядом с тем, кто его использует; общий для двух экранов переезжает в `src/components/`.

## Как идёт поиск

```
view → usePresenter → сервис showSearch → api/tvmaze → TVmaze
                ↓
          searchStore → view (observer)
```

View — только разметка. Презентер вызывает сервис и пишет результат в стор; стор только хранит, в сеть не ходит. Формат TVmaze виден только в `api/` и сервисе.

Слои импортируются через алиасы: `@ui-kit/`, `@stores/`, `@services/`, `@api/`, `@app-types/`, `@locales/`.

Все правила с объяснениями — в [ARCHITECTURE.md](ARCHITECTURE.md).
