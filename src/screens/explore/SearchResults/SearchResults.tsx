import { observer } from 'mobx-react-lite'
import { texts } from '@locales/index'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { GenreFilter } from './GenreFilter/GenreFilter'
import { Pagination } from './Pagination/Pagination'
import { ShowCard } from './ShowCard/ShowCard'
import s from './SearchResults.module.css'
import { usePresenter } from './logic/usePresenter'

type SearchResultsProps = {
  isLoading: boolean
  onGenreSelect: (genre: string | null) => void
  onPageSelect: (page: number) => void
}

export const SearchResults = observer(function SearchResults({ isLoading, onGenreSelect, onPageSelect }: SearchResultsProps) {
  const p = usePresenter(isLoading, onGenreSelect, onPageSelect)

  return (
    <>
      <LiveStatus text={p.announcement} />
      {p.hasResults && (
        <section className={s.results} aria-label={texts.searchResults.label} aria-busy={p.isStale}>
          <div className={s.toolbar}>
            <GenreFilter
              genres={p.genres}
              allCount={p.allCount}
              isAllActive={p.isAllActive}
              onSelect={p.onGenreSelect}
              onReset={p.onGenreReset}
            />
          </div>

          <ul ref={p.listRef} className={s.grid} data-enter={p.enter}>
            {p.items.map((item) => (
              <li key={item.key} className={s.cell}>
                <ShowCard
                  show={item.show}
                  title={item.title}
                  number={item.number}
                  meta={item.meta}
                  favorite={item.favorite}
                  onFavoriteToggle={() => p.onFavoriteToggle(item.show)}
                />
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
