## 2026-05-07 - Vanilla JS A11y Pattern
**Learning:** Because this app uses lightweight vanilla HTML/JS instead of a component library (common in Figma plugins for performance/size), standard interactive states (like tabs or accordions) do not get accessibility attributes managed automatically.
**Action:** When implementing or modifying custom interactive widgets, always manually toggle attributes like `aria-expanded`, `aria-selected`, and `aria-hidden` within the JavaScript event listeners, and ensure native elements like `<button>` are used instead of clickable `<div>`s.

## 2024-05-01 - Add Focus Visible Styles for Keyboard Navigation
**Learning:** Vanilla HTML/JS Figma plugin UIs often lack default focus indicators, making keyboard accessibility poor.
**Action:** Always explicitly add `:focus-visible` styles matching the active theme's accent color (e.g., `var(--accent)`) for all interactive elements to ensure keyboard accessibility.
