---
paths:
  - "**/*.tsx"
  - "**/*.css"
---
# Platform — web

Simple Architecture on a React web site. Loaded with views and styles; the core is in `sa-*.md`.

- **Outside `ui-kit/` JSX uses only layout tags:** `div`, `section`, `header`, `main`, `nav`,
  `article`, `ul`, `li`, and `label` as a field wrapper. Everything else goes through atoms
  (`sa-view.md`).
- **The value out of an event in ui-kit:** `(e) => onChange(e.target.value)`.
- **Styles live next to the component; colors and fonts come from tokens.** *Why:* the palette changes
  in one file.
