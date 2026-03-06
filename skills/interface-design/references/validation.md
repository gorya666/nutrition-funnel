# Validation

## Purpose

Use this reference to decide whether to update `.interface-design/system.md` and to keep consistency over time.

## When to Save to system.md

Save when at least one is true:

- A component pattern appears in 2+ places
- A measurement/value is reused and stable
- A decision creates clear product identity
- Future tasks benefit from preserving this choice

Do not save one-off experiments.

## What to Validate Against system.md

If `.interface-design/system.md` exists, check:

- Spacing values follow documented base unit and scale
- Depth treatment matches documented strategy
- Tokens stay inside documented palette and semantics
- Reused components match documented pattern structure

## Drift Signals

Treat these as drift requiring correction or deliberate update:

- New random spacing values outside scale
- Mixed depth strategies in same screen
- New accent hues without semantic reason
- Rebuilding existing components from scratch with different structure

## Update Process

1. Compare implementation with `system.md`
2. If mismatch is accidental, align implementation
3. If mismatch is intentional improvement, update `system.md`
4. Keep updates concise and specific
