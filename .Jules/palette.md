## 2024-05-24 - Accessibility improvements for custom interactive widgets
**Learning:** Because the Figma plugin UIs in this repository are built with vanilla HTML/JS, accessibility attributes (e.g., `aria-expanded`, `aria-selected`, `role="tab"`) must be manually toggled in JavaScript event listeners for custom interactive widgets like accordions and scope toggles.
**Action:** Always ensure that custom interactive components have both the necessary semantic `role` attributes and that stateful ARIA attributes are synced in the event listener code.
