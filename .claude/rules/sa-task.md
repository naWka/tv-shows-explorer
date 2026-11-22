---
paths:
  - "**/tasks/**"
---
# Simple Architecture — task

Loaded because a task is touched. Layers and placement — `sa-core.md`.

A task is one use case end to end: it calls API methods, decides what to put into which stores (it
may work with any of them) and returns an outcome. No React, no network calls, no server response
format, no UI texts.

- **Design a task from its call:** first write how the presenter calls it and what it gets back
  (`const outcome = await loadOrders({ query })`), then the implementation. *Why:* the interface is
  expensive to change, the implementation is cheap.
- **Data several places need goes to a store; data only the caller needs comes back in the outcome**
  (`{ status: 'success'; orders: Order[] }`), and the presenter keeps it. *Why:* every store field is
  global state that anyone may read.
- **A task writes to a store only through its setters,** one setter per field
  (`ordersStore.setList(list)`; never `ordersStore.list = …`) — see `sa-store.md`.

## Outcome

```ts
type CreateOrderOutcome = { status: 'success' } | { status: 'cancelled' } | { status: 'error'; error: ApiErrorKind }
```

- **A task returns an outcome and throws nothing; the presenter awaits it** and decides what to do:
  show an error, stop the loading, go to another screen. *Why:* different screens show the same use
  case differently.
- **A task without a server request returns nothing** (clear a list, show a message). *Why:* it has
  nothing to fail at, and an outcome nobody reads is noise.
- **A task's name is a verb:** `createOrder` — "place an order". Inside it may be split into parts and
  call other tasks; from outside it is one call.
