import { observer } from 'mobx-react-lite'
import { ru } from '@locales/ru'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { GenreFilter } from './components/GenreFilter/GenreFilter'
import { Pagination } from './components/Pagination/Pagination'
import { ShowCard } from './components/ShowCard/ShowCard'
import s from './SearchResults.module.css'
import { usePresenter } from './usePresenter'

export const SearchResults = observer(function SearchResults() {
  const p = usePresenter()

  return (
    <>
      <LiveStatus text={p.announcement} />
      {p.hasResults && (
        <section className={s.results} aria-label={ru.searchResults.label} aria-busy={p.isStale}>
          <div className={s.toolbar}>
            <GenreFilter
              genres={p.genres}
              allCount={p.allCount}
              isAllActive={p.isAllActive}
              onSelect={p.onGenreSelect}
              onReset={p.onGenreReset}
            />
          </div>

          <ul className={s.grid}>
            {p.items.map((item) => (
              <li key={item.key} className={s.cell}>
                <ShowCard show={item.show} number={item.number} meta={item.meta} />
              </li>
            ))}
          </ul>

          {p.hasPages && (
            <div className={s.pager}>
              <Pagination
                pages={p.pages}
                canPrev={p.canPrev}
                canNext={p.canNext}
                onPrev={p.onPrev}
                onNext={p.onNext}
                onSelect={p.onPageSelect}
              />
            </div>
          )}
        </section>
      )}
    </>
  )
})
