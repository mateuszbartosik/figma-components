## 2026-05-07 - Vanilla JS A11y Pattern
**Learning:** Because this app uses lightweight vanilla HTML/JS instead of a component library (common in Figma plugins for performance/size), standard interactive states (like tabs or accordions) do not get accessibility attributes managed automatically.
**Action:** When implementing or modifying custom interactive widgets, always manually toggle attributes like `aria-expanded`, `aria-selected`, and `aria-hidden` within the JavaScript event listeners, and ensure native elements like `<button>` are used instead of clickable `<div>`s.

## 2026-05-08 - Keyboard Nav in Vanilla HTML Plugins
**Learning:** Vanilla HTML/JS Figma plugin UIs often completely lack default focus indicators for interactive elements (buttons, inputs, accordions), significantly hindering keyboard navigation out of the box.
**Action:** When working on plugin UIs, always inject explicit `:focus-visible` styles matching the active theme's accent color for all interactive elements to ensure a base level of keyboard accessibility.
