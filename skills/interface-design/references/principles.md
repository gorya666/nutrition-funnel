# Principles

## Purpose

Use this reference when implementing visual language and interaction details for product interfaces.

## Suggested Token Model

Define primitives first:

- `--fg-primary`, `--fg-secondary`, `--fg-tertiary`, `--fg-muted`
- `--bg-canvas`, `--bg-surface-1`, `--bg-surface-2`, `--bg-surface-3`
- `--border-soft`, `--border-default`, `--border-emphasis`, `--border-focus`
- `--brand-*`
- `--success-*`, `--warning-*`, `--danger-*`
- `--control-bg`, `--control-border`, `--control-focus`

Map all component tokens back to primitives. Avoid orphan hex values.

## Elevation Guidance

Use one strategy per interface:

1. Borders-only (dense, technical)
2. Subtle shadows (approachable)
3. Layered shadows (premium depth)
4. Surface-tone shifts (quiet hierarchy)

Do not mix strategies in one system.

## Typography System

Define separate styles for:

- Display / page headline
- Section heading
- Body text
- Label / UI metadata
- Numeric/data text (monospace + tabular nums)

Vary weight and tracking in addition to size.

## Spacing and Radius

- Choose one base spacing unit (`4px` or `8px` are common)
- Use a multiplier scale for all paddings and gaps
- Keep small controls tighter, containers looser
- Radius progression: small controls -> medium cards -> large overlays

## State Coverage

Require all states:

- Interactive: default, hover, active, focus, disabled
- Data: loading, empty, error

Missing states count as incomplete design.
