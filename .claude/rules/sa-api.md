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
- **Server addresses and format do not leave the API layer.** *Why:* the server changes — only this
  folder changes.
- **A foreign API's types do not leave the folder that talks to it.**
