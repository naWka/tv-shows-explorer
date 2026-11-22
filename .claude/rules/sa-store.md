---
paths:
  - "**/stores/**"
  - "**/store/**"
---
# Simple Architecture — store

Loaded because a store is touched. Layers and placement — `sa-core.md`.

- **A store is a database: fields and setters, one setter writes one field**
  (`ordersStore.setList(list)`; nobody writes `ordersStore.list = …`). What to write and when is
  decided by a task, and a task may work with any stores. *Why:* an action on several stores (logging
  out clears the user, the cart and the notifications) belongs to none of them: as a store method it
  pulls in imports of other stores, and sooner or later two stores import each other.
- **A store holds only source data that several places need** (the current user). Data one component
  needs stays in its presenter: the task returns it in the outcome. No logic, no imports of tasks, the
  API or other stores, no derived data, no loading flags.
- **Action state (`isLoading`, `error`) and UI state stay in the presenter,** not in a store — see
  `sa-presenter.md`. The exception is UI state components in different branches need: a small store
  with only that field.
