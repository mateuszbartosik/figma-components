## 2026-05-06 - [A11y: Custom UI Elements Require Manual ARIA State Management]
**Learning:** In vanilla HTML/JS projects without component libraries (like the ones in this repo), ARIA attributes such as `aria-expanded` on accordions and `aria-selected` on tabs aren't automatically updated. They must be explicitly queried and toggled in JavaScript event listeners to provide accurate state to screen readers.
**Action:** Always manually wire up ARIA attribute updates inside click/toggle event handlers when building or modifying custom interactive widgets.

## 2026-05-07 - Vanilla JS A11y Pattern
**Learning:** Because this app uses lightweight vanilla HTML/JS instead of a component library (common in Figma plugins for performance/size), standard interactive states (like tabs or accordions) do not get accessibility attributes managed automatically.
**Action:** When implementing or modifying custom interactive widgets, always manually toggle attributes like `aria-expanded`, `aria-selected`, and `aria-hidden` within the JavaScript event listeners, and ensure native elements like `<button>` are used instead of clickable `<div>`s.