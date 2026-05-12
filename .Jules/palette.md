## 2026-05-09 - Focus State Accessibility
**Learning:** The plain HTML/CSS UIs for Figma plugins in this repo did not have explicit focus states. When users navigated with a keyboard (e.g., using Tab), there was no visual indicator of what element was currently active.
**Action:** Add `:focus-visible` to the global stylesheet in `ui.html` files to ensure a clear focus outline that matches the theme's accent color, improving keyboard accessibility.

## 2026-05-07 - Vanilla JS A11y Pattern
**Learning:** Because this app uses lightweight vanilla HTML/JS instead of a component library (common in Figma plugins for performance/size), standard interactive states (like tabs or accordions) do not get accessibility attributes managed automatically.
**Action:** When implementing or modifying custom interactive widgets, always manually toggle attributes like `aria-expanded`, `aria-selected`, and `aria-hidden` within the JavaScript event listeners, and ensure native elements like `<button>` are used instead of clickable `<div>`s.

## 2024-05-01 - Add Focus Visible Styles for Keyboard Navigation
**Learning:** Vanilla HTML/JS Figma plugin UIs often lack default focus indicators, making keyboard accessibility poor.
**Action:** Always explicitly add `:focus-visible` styles matching the active theme's accent color (e.g., `var(--accent)`) for all interactive elements to ensure keyboard accessibility.

## 2026-05-12 - Keyboard Nav in Vanilla HTML Plugins
**Learning:** Vanilla HTML/JS Figma plugin UIs often completely lack default focus indicators for interactive elements (buttons, inputs, accordions), significantly hindering keyboard navigation out of the box.
**Action:** When working on plugin UIs, always inject explicit `:focus-visible` styles matching the active theme's accent color for all interactive elements to ensure a base level of keyboard accessibility.
