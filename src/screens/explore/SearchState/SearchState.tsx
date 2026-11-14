import { observer } from 'mobx-react-lite'
import type { ApiErrorKind } from '@contract/apiError'
import { LiveStatus } from '@ui-kit/LiveStatus/LiveStatus'
import { TvScreen } from './TvScreen/TvScreen'
import { usePresenter } from './logic/usePresenter'

type SearchStateProps = {
  isLoading: boolean
  error: ApiErrorKind | null
  onRetry: () => void
}

export const SearchState = observer(function SearchState({ isLoading, error, onRetry }: SearchStateProps) {
  const p = usePresenter(isLoading, error)

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
