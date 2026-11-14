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
      logic/usePresenter.ts  логика экрана
      Brand/                 блоки, нужные только этому экрану
      SearchInput/
      SearchState/           заглушки: пусто, загрузка, ошибка, ничего не найдено
        TvScreen/
      SearchResults/         жанры, карточки, пагинация
        GenreFilter/ Pagination/ ShowCard/
  stores/searchStore/        глобальный стор MobX: запрос, жанр, страница, результат поиска
  services/showSearch/       пауза во вводе, отмена устаревшего запроса, перевод ответа в Show
  api/tvmaze/                транспорт: URL, fetch, проверка ответа, типы TVmaze
  types/                     наши типы данных (Show, ShowSearchResult)
  locales/ru.ts              все тексты интерфейса
  styles/                    tokens.css (цвета, шрифты, отступы) и global.css
scripts/                     проверки для npm run lint и ux-shots.mjs — снимки экрана для ревью удобства
```

Компонент — папка `<Name>/` с `<Name>.tsx`, рядом `<Name>.module.css`, при логике `logic/usePresenter.ts`, дочерние компоненты — папками тут же.
Компонент лежит рядом с тем, кто его использует; нужный двум местам переезжает в `components/` их общей папки, двум экранам — в `src/components/`.

## Как идёт поиск

```
view → usePresenter → сервис showSearch → api/tvmaze → TVmaze
                ↓
          searchStore → view (observer)
```

View — только разметка. Презентер вызывает сервис и пишет результат в стор; стор только хранит, в сеть не ходит. Формат TVmaze виден только в `api/` и сервисе.

Слои импортируются через алиасы: `@ui-kit/`, `@stores/`, `@services/`, `@api/`, `@app-types/`, `@locales/`.

Все правила с объяснениями — в [ARCHITECTURE.md](ARCHITECTURE.md).
