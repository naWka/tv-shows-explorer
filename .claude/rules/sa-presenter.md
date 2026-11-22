---
paths:
  - "**/usePresenter.ts"
  - "**/use*.ts"
---
# Simple Architecture — presenter

Loaded because a presenter or a hook is touched. Layers and placement — `sa-core.md`.

- **The presenter serves its view:** calls tasks on events, reads stores, derives data, holds action
  and UI state, drives the environment. No network calls, no server types, no imports from the API.
- **It calls a task and awaits its outcome,** then decides what to do: show an error, stop the loading,
  go to another screen. A text with a substitution, or one chosen by the outcome, is picked here.
- **The environment is the presenter's job:** focus, scrolling, navigation, a pause while typing. A big
  piece of it goes to a hook next to the presenter (`use<Name>.ts`).
- **Action state (`isLoading`, `error`) and UI state (is a dialog open) are `useState` in the
  presenter, not a store.** *Why:* it is the state of one run on one screen; the store does not grow a
  flag for every request.
- **UI state that components in different branches need goes to a small store with only that field**
  (a button in the header opens a panel elsewhere: `drawerStore.isOpen`), not up to a common parent and
  down through props. *Why:* a small store is easy to extend, and only the components that read it
  re-render, while forwarding re-renders the whole chain and ties every link to a detail far below.
