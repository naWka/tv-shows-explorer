---
paths:
  - "**/*.tsx"
---
# Simple Architecture — view and ui-kit

Loaded because a `.tsx` file is touched. Layers and placement — `sa-core.md`.

## View

```tsx
export function OrderList({ isLoading }: OrderListProps) {
  const p = usePresenter(isLoading)

  return (
    <ul>
      {p.orders.map((order) => (
        <li key={order.id}>
          <Button onClick={() => p.onSelect(order.id)}>{order.title}</Button>
        </li>
      ))}
      {p.isEmpty && <Text>{texts.orderList.empty}</Text>}
    </ul>
  )
}
```

- **Allowed in JSX:** `&&`, `? :`, `??`, `||`, `.map` and an arrow that passes the list item to a
  callback. In ui-kit also an arrow that takes the value out of an event (example — platform file).
- **Comparisons, formatting and counts are done by the presenter,** which hands over ready values:
  `p.isEmpty`, not `p.orders.length === 0`. *Why:* the view reads as markup, and the logic of the piece
  sits in one file next to it.
- **A component with its own presenter reads the store itself.** Props bring only what the store does
  not hold: action state and the owner presenter's actions; its own presenter gets them as arguments.
  A component without a presenter gets everything through props. *Why:* a screen's view does not
  forward store data in transit.
- **A block of a screen that decides by itself whether to show is a component with its own presenter.**

## ui-kit

- **ui-kit holds only atoms:** text, button, link, input, image, icon. An atom takes props and returns
  JSX: no hooks, no imports from `ui-kit/` or other layers, no texts, no domain. *Why:* an atom fits
  any place and any app.
- **An atom's look is its variants** (`variant`, `size`, `tone`). The owner does not pass style
  overrides (`style`, or `className` on the web); spacing comes from the owner's own wrapper. *Why:*
  identical elements look identical, and a new look is a deliberate change of the atom.
- **Outside `ui-kit/` markup only lays out:** text, buttons, inputs, links, images and icons go through
  atoms. Which raw elements count as layout — platform file. *Why:* a new composition cannot draw its
  own variant past the atom.
- **Styles live next to the component; colors and fonts come from tokens.** *Why:* the palette changes
  in one file.
