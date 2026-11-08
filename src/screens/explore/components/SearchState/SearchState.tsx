import { observer } from 'mobx-react-lite'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { TvScreen } from './components/TvScreen/TvScreen'
import { usePresenter } from './usePresenter'

type SearchStateProps = {
  onRetry: () => void
}

export const SearchState = observer(function SearchState({ onRetry }: SearchStateProps) {
  const p = usePresenter()

  return (
    <>
      <LiveStatus text={p.announcement} />
      {p.screen && (
        <TvScreen
          variant={p.screen.variant}
          title={p.screen.title}
          text={p.screen.text}
          actionLabel={p.screen.actionLabel}
          onAction={onRetry}
        />
      )}
    </>
  )
})
