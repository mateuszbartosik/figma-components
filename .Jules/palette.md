## 2026-05-07 - Vanilla JS A11y Pattern
**Learning:** Because this app uses lightweight vanilla HTML/JS instead of a component library (common in Figma plugins for performance/size), standard interactive states (like tabs or accordions) do not get accessibility attributes managed automatically.
**Action:** When implementing or modifying custom interactive widgets, always manually toggle attributes like `aria-expanded`, `aria-selected`, and `aria-hidden` within the JavaScript event listeners, and ensure native elements like `<button>` are used instead of clickable `<div>`s.
## 2024-05-24 - Accessibility improvements for custom interactive widgets
**Learning:** Because the Figma plugin UIs in this repository are built with vanilla HTML/JS, accessibility attributes (e.g., `aria-expanded`, `aria-selected`, `role="tab"`) must be manually toggled in JavaScript event listeners for custom interactive widgets like accordions and scope toggles.
**Action:** Always ensure that custom interactive components have both the necessary semantic `role` attributes and that stateful ARIA attributes are synced in the event listener code.
