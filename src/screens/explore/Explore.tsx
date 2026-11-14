import { observer } from 'mobx-react-lite'
import { texts } from '@locales/index'
import { Brand } from './Brand/Brand'
import { Favorites } from './Favorites/Favorites'
import { SearchInput } from './SearchInput/SearchInput'
import { SearchResults } from './SearchResults/SearchResults'
import { SearchState } from './SearchState/SearchState'
import { Toast } from './components/Toast/Toast'
import s from './Explore.module.css'
import { usePresenter } from './logic/usePresenter'

export const Explore = observer(function Explore() {
  const p = usePresenter()

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Brand />
        <div className={s.tools}>
          <div className={s.search}>
            <SearchInput
              label={texts.explore.searchLabel}
              placeholder={texts.explore.searchPlaceholder}
              value={p.query}
              maxLength={p.queryMaxLength}
              inputRef={p.inputRef}
              onChange={p.onQueryChange}
            />
          </div>
          <Favorites />
        </div>
      </header>

      <main className={s.main}>
        <SearchState isLoading={p.isLoading} error={p.error} onRetry={p.onRetry} />
        <SearchResults isLoading={p.isLoading} onGenreSelect={p.onGenreSelect} onPageSelect={p.onPageSelect} />
      </main>

      <Toast />
    </div>
  )
})
