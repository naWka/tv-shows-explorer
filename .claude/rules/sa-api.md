---
paths:
  - "**/api/**"
---
# Simple Architecture — API

Loaded because the API layer is touched. Layers and placement — `sa-core.md`.

- **API method — one request:** calls the transport, returns data with a type, throws an API error
  with a reason. No waiting, no retries, no `AbortController` of its own, no store writes, no texts.
- **Transport — how to talk to the server:** address, the network call, the response check. It knows
  nothing about what the response holds.
- **Who is calling rides with every request, and only the transport attaches it** (a header with a
  token). API methods and tasks do not pass it and know nothing about headers. The transport imports no
  store: it takes a function that returns the token, and the app's entry point hands it over once at
  startup (`setAuthToken(() => userStore.token)`). *Why:* tasks stay free of tokens, and the transport
  depends only on the interface it declares itself: moving from a header to cookies changes the
  transport and the entry point, nothing else.
- **Server addresses and format do not leave the API layer.** *Why:* the server changes — only this
  folder changes.
- **A foreign API's types do not leave the folder that talks to it.**
