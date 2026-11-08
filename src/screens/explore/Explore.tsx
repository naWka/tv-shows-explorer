import { observer } from 'mobx-react-lite'
import { ru } from '@locales/ru'
import { Brand } from './components/Brand/Brand'
import { SearchInput } from './components/SearchInput/SearchInput'
import { SearchResults } from './components/SearchResults/SearchResults'
import { SearchState } from './components/SearchState/SearchState'
import s from './Explore.module.css'
import { usePresenter } from './usePresenter'

export const Explore = observer(function Explore() {
  const p = usePresenter()

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Brand />
        <SearchInput
          label={ru.explore.searchLabel}
          placeholder={ru.explore.searchPlaceholder}
          value={p.query}
          maxLength={p.queryMaxLength}
          inputRef={p.inputRef}
          onChange={p.onQueryChange}
        />
      </header>

      <main className={s.main}>
        <SearchState onRetry={p.onRetry} />
        <SearchResults />
      </main>
    </div>
  )
})
