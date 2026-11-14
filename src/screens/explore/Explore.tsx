import { observer } from 'mobx-react-lite'
import { texts } from '@locales/index'
import { Brand } from './Brand/Brand'
import { SearchInput } from './SearchInput/SearchInput'
import { SearchResults } from './SearchResults/SearchResults'
import { SearchState } from './SearchState/SearchState'
import s from './Explore.module.css'
import { usePresenter } from './logic/usePresenter'

export const Explore = observer(function Explore() {
  const p = usePresenter()

  return (
    <div className={s.page}>
      <header className={s.header}>
        <Brand />
        <SearchInput
          label={texts.explore.searchLabel}
          placeholder={texts.explore.searchPlaceholder}
          value={p.query}
          maxLength={p.queryMaxLength}
          inputRef={p.inputRef}
          onChange={p.onQueryChange}
        />
      </header>

      <main className={s.main}>
        <SearchState isLoading={p.isLoading} error={p.error} onRetry={p.onRetry} />
        <SearchResults isLoading={p.isLoading} />
      </main>
    </div>
  )
})
