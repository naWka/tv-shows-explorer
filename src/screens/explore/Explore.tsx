import { observer } from 'mobx-react-lite'
import { LiveStatus } from '../../ui-kit/LiveStatus/LiveStatus'
import { Pagination } from '../../ui-kit/Pagination/Pagination'
import { SearchInput } from '../../ui-kit/SearchInput/SearchInput'
import { TvScreen } from '../../ui-kit/TvScreen/TvScreen'
import { Brand } from './components/Brand/Brand'
import { GenreFilter } from './components/GenreFilter/GenreFilter'
import { ShowCard } from './components/ShowCard/ShowCard'
import s from './Explore.module.css'
import { usePresenter } from './usePresenter'

export const Explore = observer(function Explore() {
  const p = usePresenter()

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Brand />
        <SearchInput
          label="Поиск шоу"
          placeholder="Murder, Office, Lost…"
          value={p.query}
          maxLength={p.queryMaxLength}
          inputRef={p.inputRef}
          onChange={p.onQueryChange}
        />
      </header>

      <main className={s.main}>
        <LiveStatus text={p.announcement} />

        {p.isIdle && <TvScreen variant="idle" title="Ждём сигнал" text="Начните вводить название — эфир включится сам" />}
        {p.isLoading && <TvScreen variant="static" title="Ловим сигнал…" />}
        {p.isError && (
          <TvScreen
            variant="bars"
            title="Нет сигнала"
            text={p.error}
            actionLabel="Попробовать ещё раз"
            onAction={p.onRetry}
          />
        )}
        {p.isEmpty && <TvScreen variant="idle" title="Пустой эфир" text={<>По запросу «{p.query}» ничего не нашлось</>} />}

        {p.hasResults && (
          <section className={s.results} aria-label="Результаты поиска">
            <div className={s.toolbar}>
              <GenreFilter
                genres={p.genres}
                allCount={p.allCount}
                isAllActive={p.isAllActive}
                onSelect={p.onGenreSelect}
                onReset={p.onGenreReset}
              />

              {p.hasPages && (
                <Pagination
                  pages={p.pages}
                  canPrev={p.canPrev}
                  canNext={p.canNext}
                  onPrev={p.onPrev}
                  onNext={p.onNext}
                  onSelect={p.onPageSelect}
                />
              )}
            </div>

            <ul className={s.grid}>
              {p.items.map((item) => (
                <li key={item.show.id} className={s.cell}>
                  <ShowCard show={item.show} number={item.number} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
})
