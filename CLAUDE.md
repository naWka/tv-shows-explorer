# TV Shows Explorer

Учебный проект Павла на буткемпе Simple Architecture: 7 недель, раз в неделю лекция и домашка.
Проект один на весь курс и каждую неделю развивается под тему новой лекции.

Стек: сайт — React 19 + TypeScript + Vite + MobX; сервер — Express на Node 24; хостинг обоих — Vercel. Проверки: `npm run build`, `npm run lint` (oxlint). Запуск: `npm run dev` поднимает сайт и сервер вместе.

## API

В TVmaze ходит только сервер, сайт ходит только на наш сервер.

TVmaze:
- Поиск: `GET https://api.tvmaze.com/search/shows?q=<запрос>`. Отдаёт до 10 элементов `{ score, show }`, страниц нет.
- Одно шоу: `GET https://api.tvmaze.com/shows/<id>`. Отдаёт `show`.
- У `show`: `name`, `genres` (может быть пустым), `image` (может быть `null`), `summary` (HTML-строка), `rating.average`, `premiered`.

Наш сервер (типы ответов — в `contract/`):
- `GET /api/shows?q=<запрос>&genre=<жанр>&page=<номер>` — страница выдачи: до 3 шоу, число страниц, жанры всей выдачи со счётчиками.
- `GET /api/favorites` — список избранного.
- `PUT /api/favorites/<id>` и `DELETE /api/favorites/<id>` — добавить и убрать; оба отдают обновлённый список.
- `POST /api/session` с телом `{ email }` — вход: отдаёт `{ email, token }`, token — случайный ключ сессии.
- `DELETE /api/session` — выход: сервер забывает ключ из заголовка.
- Кто зовёт, сайт сообщает заголовком `Authorization: Bearer <token>`.

## Неделя 1 — задание

1. Поиск через API. На старте только поле поиска и пустой список.
2. Список шоу по 3 на страницу, переключение страниц.
3. Над списком чипсы со всеми уникальными жанрами текущей выдачи; клик оставляет шоу этого жанра; фильтр сбрасывается.
4. Не слать запрос на каждую букву, отменять устаревший запрос, показывать загрузку и ошибку. Запросы руками, без `useQuery` и библиотек.
5. Дизайн свободный, задача — удивить.

## Неделя 2 — задание

1. Обновить правила с учётом второй лекции (бизнес-логика, таски).
2. Свой сервер. На него переезжают пагинация, фильтр по жанрам и разговор с TVmaze.
3. Кеш на сервере в обычном объекте `const cache = {}`: такой же запрос к TVmaze за последние 5 минут отдаётся из кеша.
4. Избранное: звёздочка на каждом шоу, toast при добавлении и удалении, кнопка со счётчиком, по ней — список. Вся логика избранного на сервере, хранение в обычном объекте `const favorite = {}`, без базы данных.
5. Бонус: сервер задеплоен.

## Неделя 3 — задание

1. Вход по одному полю `email`, без пароля, регистрации и восстановления доступа. Отдельная страница логина, вход через сервер, после входа виден email, есть выход.
2. Избранное у каждого пользователя своё. Гость ищет и смотрит шоу, но в избранное не добавляет. Вышел и вошёл под тем же email — прежний список на месте. Хранение на сервере, по-прежнему в обычных объектах в памяти, без базы данных.
3. Обновить правила под третью лекцию (направление зависимостей, инверсия, контракты): где живёт логика входа, как сайт говорит с сервером, кто за что отвечает.

## Как работаем

- Код и правила пишет Claude. Павел принимает архитектурные решения и ревьюит.
- Нужно архитектурное решение, которого нет в правилах (`.claude/rules/` и раздел «Project» ниже) → сначала спросить Павла: один вопрос, 2–3 варианта и цена каждого на примере этого проекта. Свою рекомендацию не давать, пока он не попросит.
- Каждое решение Павла записываем в одно из четырёх мест, коротко, проверяемо и с «почему»; правила — по-английски:
  - верно для любого проекта (кто кого вызывает, где что лежит) → ядро, `.claude/rules/sa-*.md` того слоя, без имён этого проекта и библиотек;
  - верно для любого проекта на этой платформе (веб, свой сервер) → `.claude/rules/platform-*.md`;
  - чем правило исполнено здесь (библиотека, папка, алиас, деплой) → раздел «Project» ниже;
  - решение по фиче (пауза во вводе 0,7 с, избранное одно на всех) → комментарий у кода, который его исполняет.

  *Почему:* в одном файле правила росли с каждой домашкой: за две недели набралось 31 правило на 169 строк. Теперь новая фича не удлиняет правила. 22.11: ядро и файл платформы копируются в insense-mobile и insense-mobile-client без правок, поэтому они по-английски и по файлу на слой — каждый грузится только к своим файлам.
- Правило мешает, неясно или противоречит коду → не обходить молча, сказать Павлу.
- После каждого куска кода: что сделано, какие правила применены, где правил не хватило.
- После каждой правки интерфейса, до коммита — агент `ux-reviewer` (`.claude/agents/ux-reviewer.md`): снимает экран на десяти размерах окна (`scripts/ux-shots.mjs`) и пишет замечания по удобству. Блокеры и «мешает» исправляем и снимаем заново; коммитим, когда осталась только косметика или ничего.
  *Почему:* правка, проверенная на одном размере окна, ломала другой: на ноутбуке переключатель страниц ушёл за край экрана.
- Новые зависимости для запросов и состояния (TanStack Query, SWR, Redux и т. п.) — только с согласия Павла.

## Project: how Simple Architecture is carried out here

The project level of the rules (core — `.claude/rules/sa-*.md`, platform — `.claude/rules/platform-*.md`).

- **Folders.** Screens — `src/screens/<name>/`. A component's logic sits in its `logic/`: `usePresenter.ts`, hooks `use<Name>.ts`, tasks `tasks/<verb>.ts`; `logic/` appears with the first logic file. Stores — `src/stores/<name>/<name>.ts`; API methods — `src/api/<entity>/<method>.ts`, transport — `src/api/client.ts`, the API error — `ApiError`; own types — `src/types/`; types shared with the server — `contract/`.
- **Pages — react-router.** `src/app/App.tsx` maps addresses to screens: `/` — search, `/login` — login. A presenter moves between them with `useNavigate`. Vercel answers every address outside `/api` with `index.html` (`vercel.json`), otherwise reloading `/login` gives 404.
- **The session survives a reload in `localStorage`.** Only session tasks touch it: `rememberSession` and `forgetSession` in `src/tasks/session/`, `restoreSession` — the root's startup task in `src/app/logic/tasks/`.
- **Who is calling — `Authorization: Bearer <token>`.** The token lives in `userStore` next to the email; `src/main.tsx` passes `() => userStore.token` to `setAuthToken` from `src/api/client.ts` once at startup.
- **Texts** — `src/locales/<language>.ts`, code takes them through `texts` from `locales/index.ts`.
- **Temporary: the presenter aborts a stale request.** It creates an `AbortController` and passes `signal` to the task, the task passes it to the API method. Who should abort is to be decided after homework 2.
- **Stores — MobX:** a class with `makeAutoObservable(this)` in the constructor, no decorators. A view that calls `usePresenter()` is wrapped in `observer` from `mobx-react-lite`, otherwise it does not learn about store changes.
- **Styles — CSS Modules:** `<Name>/<Name>.module.css`, imported as `import s from './<Name>.module.css'`. Global ones — `src/styles/tokens.css` (tokens) and `global.css` (reset).
- **Aliases:** `@ui-kit/`, `@components/`, `@tasks/`, `@stores/`, `@api/`, `@app-types/` (the `types/` folder: the name `@types` is taken by npm packages), `@locales/`, `@contract/`. Set in `paths` in `tsconfig.app.json`, Vite reads them from there (`resolve.tsconfigPaths`); a new layer in `src/` is a new line in `paths`.
- **Server code imports only by relative paths with the `.ts` extension.** Vercel does not resolve `tsconfig` aliases in server code: a function with an alias fails on its first request.
- **The server is one Express app;** Vercel runs it as one function through `api/index.ts`, which holds only a re-export. No separate function files per route: one function has one memory, so search, sessions and favorites see the same `cache`, `sessions` and `users`.
- **Site and server are one Vercel project with one address.** The site calls the server by the relative path `/api/…`; no full address and no CORS settings in code; a push to `main` deploys both. Locally Node runs the server (`node --watch`), and the site reaches it through the Vite proxy.
- **No Russian words in code outside `locales/`,** except comments, the app name and symbols (`№`, `★`, `CH`).
- **`npm run lint` checks:** 120 lines in `.ts`/`.tsx` (`max-lines` in oxlint), in `.css` and in `.claude/rules/*.md` (`scripts/check-lines.mjs`); tags outside ui-kit (`scripts/check-raw-tags.mjs`).
