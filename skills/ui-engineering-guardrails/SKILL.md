---
name: ui-engineering-guardrails
description: Concise rules for building accessible, fast, and delightful user interfaces using MUST/SHOULD/NEVER language. Use when implementing or reviewing frontend UI work (HTML/CSS/JS/TS/React/Next.js), including interactions, forms, navigation, accessibility, animation, layout, performance, theming, and hydration behavior.
---

# UI Engineering Guardrails

Apply these rules when designing, implementing, or reviewing UI.
Prioritize MUST rules first, then SHOULD rules.

## Interactions

### Keyboard
- MUST: Provide full keyboard support per WAI-ARIA APG patterns.
- MUST: Show visible focus rings using `:focus-visible`; use `:focus-within` for grouped contexts.
- MUST: Manage focus (trap, move, return) per APG patterns.
- NEVER: Remove outlines (`outline: none`) without a visible replacement.

### Targets and Input
- MUST: Keep hit targets at least 24px; on mobile at least 44px. Expand hit area when visuals are smaller.
- MUST: Use mobile `<input>` font-size at least 16px to prevent iOS zoom.
- NEVER: Disable browser zoom (`user-scalable=no` or `maximum-scale=1`).
- MUST: Set `touch-action: manipulation` on tappable controls.
- SHOULD: Match `-webkit-tap-highlight-color` to design.

### Forms
- MUST: Keep inputs hydration-safe; never lose focus or value.
- NEVER: Block paste in `<input>` or `<textarea>`.
- MUST: Show loading spinners in submit buttons while preserving original label text.
- MUST: Submit focused input with Enter; submit `<textarea>` with Cmd/Ctrl+Enter.
- MUST: Keep submit enabled until request starts; disable only during in-flight request.
- MUST: Accept free typing, then validate after input.
- MUST: Allow incomplete submit to reveal validation.
- MUST: Render inline field errors and focus first error after submit.
- MUST: Use `autocomplete`, meaningful `name`, and correct `type`/`inputmode`.
- SHOULD: Disable spellcheck for emails, codes, and usernames.
- SHOULD: End placeholders with `…` and show an example pattern.
- MUST: Warn before navigating away with unsaved changes.
- MUST: Stay compatible with password managers and 2FA; allow code paste.
- MUST: Trim values to handle trailing spaces and text expansion.
- MUST: Eliminate dead zones on checkbox/radio controls; make label + control one hit target.

### State and Navigation
- MUST: Keep URL in sync with UI state (filters, tabs, pagination, expanded panels).
- MUST: Restore scroll position on Back/Forward.
- MUST: Use `<a>` or framework `Link` for navigation.
- NEVER: Use clickable `<div>` for navigation.

### Feedback
- SHOULD: Apply optimistic UI, reconcile on server response, and rollback or offer Undo on failure.
- MUST: Confirm destructive actions or provide Undo window.
- MUST: Announce toasts and inline validation with polite `aria-live`.
- SHOULD: Use `…` for follow-up options and loading labels.

### Touch and Drag
- MUST: Use generous targets and clear affordances; avoid finicky interactions.
- MUST: Delay first tooltip and show peer tooltips instantly afterward.
- MUST: Use `overscroll-behavior: contain` in modals and drawers.
- MUST: Disable text selection during drag and set `inert` on dragged elements when appropriate.
- MUST: Make anything that looks clickable actually clickable.

### Autofocus
- SHOULD: Autofocus primary single input on desktop.
- SHOULD: Rarely autofocus on mobile.

## Animation
- MUST: Respect `prefers-reduced-motion`.
- SHOULD: Prefer CSS, then Web Animations API, then JS libraries.
- MUST: Animate only compositor-friendly properties (`transform`, `opacity`).
- NEVER: Animate layout properties (`top`, `left`, `width`, `height`).
- NEVER: Use `transition: all`; list exact properties.
- SHOULD: Animate only for meaning, causality, or deliberate delight.
- SHOULD: Match easing to distance, trigger, and change type.
- MUST: Keep animations interruptible and input-driven.
- MUST: Set correct `transform-origin`.
- MUST: For SVG transforms, use a `<g>` wrapper and `transform-box: fill-box`.

## Layout
- SHOULD: Adjust optical alignment by around 1px where perception beats geometry.
- MUST: Align deliberately to grid, baseline, and edges.
- SHOULD: Balance icon/text lockups for weight, spacing, and color.
- MUST: Verify layout on mobile, laptop, and ultra-wide (simulate at 50% zoom).
- MUST: Respect safe areas using `env(safe-area-inset-*)`.
- MUST: Prevent accidental scrollbars and overflow bugs.
- SHOULD: Prefer flex/grid over JS measurements.

## Content and Accessibility
- SHOULD: Prefer inline help; use tooltips last.
- MUST: Match skeleton shape to final content to avoid layout shift.
- MUST: Keep `<title>` aligned with current page context.
- MUST: Avoid dead ends; always offer next action or recovery.
- MUST: Design empty, sparse, dense, and error states.
- SHOULD: Use curly quotes where appropriate; prevent widows/orphans with `text-wrap: balance`.
- MUST: Use `font-variant-numeric: tabular-nums` for numeric comparison.
- MUST: Provide redundant status cues, not color-only communication.
- MUST: Ensure accessible names exist even without visible labels.
- MUST: Use the `…` character, not three periods.
- MUST: Add `scroll-margin-top` on headings, include a "Skip to content" link, and preserve heading hierarchy.
- MUST: Handle short, average, and very long user-generated content robustly.
- MUST: Format locale-aware dates, times, and numbers via `Intl.DateTimeFormat` and `Intl.NumberFormat`.
- MUST: Keep `aria-label` accurate; mark decorative elements `aria-hidden`.
- MUST: Add descriptive `aria-label` for icon-only buttons.
- MUST: Prefer native semantic elements before ARIA.
- MUST: Use non-breaking spaces in coupled tokens like `10&nbsp;MB` and `⌘&nbsp;K`.

## Content Handling
- MUST: Support long text via truncation, clamping, or wrapping.
- MUST: Set `min-w-0` on flex children where truncation is expected.
- MUST: Render valid empty states for empty strings and arrays.

## Performance
- SHOULD: Test on iOS Low Power Mode and macOS Safari.
- MUST: Measure performance with extensions disabled.
- MUST: Track and reduce unnecessary re-renders.
- MUST: Profile under CPU and network throttling.
- MUST: Batch layout reads/writes to avoid reflow/repaint thrash.
- MUST: Keep mutation interactions (`POST`/`PATCH`/`DELETE`) under 500ms where feasible.
- SHOULD: Prefer uncontrolled inputs when controlled input cost is non-trivial.
- MUST: Virtualize lists over 50 items.
- MUST: Preload above-the-fold images and lazy-load remaining images.
- MUST: Prevent CLS by specifying media dimensions.
- SHOULD: Add `preconnect` for critical CDN domains.
- SHOULD: Preload critical fonts with `font-display: swap`.

## Dark Mode and Theming
- MUST: Set `color-scheme: dark` on `<html>` for dark themes.
- SHOULD: Align `<meta name="theme-color">` with background.
- MUST: Set explicit `background-color` and `color` on native `<select>` controls.

## Hydration
- MUST: Pair controlled `value` inputs with `onChange`, or use `defaultValue`.
- SHOULD: Guard date/time rendering against hydration mismatch.

## Visual Design
- SHOULD: Use layered shadows (ambient + direct).
- SHOULD: Combine semi-transparent borders with shadows for crisp edges.
- SHOULD: Keep nested radii concentric (child radius <= parent radius).
- SHOULD: Keep hue relationships consistent between background, borders, shadows, and text.
- MUST: Use color-blind-safe chart palettes.
- MUST: Meet contrast targets, preferring APCA over WCAG 2 where possible.
- MUST: Increase contrast on hover, active, and focus states.
- SHOULD: Match browser chrome to background where platform allows.
- SHOULD: Avoid dark gradient banding using subtle textured images when needed.
