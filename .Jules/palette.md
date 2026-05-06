## 2026-05-06 - [A11y: Custom UI Elements Require Manual ARIA State Management]
**Learning:** In vanilla HTML/JS projects without component libraries (like the ones in this repo), ARIA attributes such as `aria-expanded` on accordions and `aria-selected` on tabs aren't automatically updated. They must be explicitly queried and toggled in JavaScript event listeners to provide accurate state to screen readers.
**Action:** Always manually wire up ARIA attribute updates inside click/toggle event handlers when building or modifying custom interactive widgets.
