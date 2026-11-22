---
paths:
  - "server/**"
  - "contract/**"
---
# Platform — own server

Simple Architecture on a site with its own server in one repository. The core is in `sa-*.md`.

- **Three folders: `src/` — the site, `server/` — the server, `contract/` — the types between them.**
  The site does not import `server/`, the server does not import `src/`; shared types live only in
  `contract/`. *Why:* change a field of a response — the site will not build until it is fixed.
- **The same chain: route → task → API and stores.** A route (`routes/`) parses the request, calls one
  task and picks the response code by its outcome — like a presenter. A task (`tasks/`) knows nothing
  of `req`, `res` and `fetch`. `api/<service>/` hides a foreign API's format. `stores/` — data and the
  functions over it; nobody touches the data directly. *Why:* the same words on the site and on the
  server, and the business logic does not depend on the framework.
