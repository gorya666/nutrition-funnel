---
name: interface-design
description: Build crafted, consistent interfaces for product software. Use when designing or implementing dashboards, admin panels, SaaS apps, internal tools, settings pages, or data-heavy interfaces. Do not use for landing pages, marketing sites, or campaigns; route those requests to /frontend-design.
---

# Interface Design

Build interface design with craft and consistency.

## Scope

- Use for: Dashboards, admin panels, SaaS apps, tools, settings pages, data interfaces
- Do not use for: Landing pages, marketing sites, campaigns
- Redirect excluded work to: `/frontend-design`

## Core Mandate

Treat every decision as design. Do not classify any choice as "just structural."

Defaults hide in:
- Typography
- Navigation
- Data representation
- Token naming

If rationale is "common," "clean," or "works," consider it a default and iterate.

## Intent First

Before writing code, state explicit intent:

- Who is the human?
- What action must they complete?
- How should this feel?

If answers are not specific, ask the user before proceeding.

## Required Exploration (Before Direction)

Produce all four outputs before proposing direction:

1. Domain: At least 5 concepts, metaphors, or vocabulary items from the product world
2. Color world: At least 5 colors that naturally belong to that world
3. Signature: One unique visual, structural, or interaction element that belongs only to this product
4. Defaults: Three obvious defaults (visual and structural) to avoid

## Proposal Format

Always present a direction that explicitly references:

- Domain concepts explored
- Colors from color world exploration
- The signature element
- Replacements for each named default

Use this structure:

```text
Domain: [...]
Color world: [...]
Signature: [...]
Rejecting: [default 1] -> [alternative], [default 2] -> [alternative], [default 3] -> [alternative]

Direction: [...]
```

Then confirm with the user:

```text
Does that direction feel right?
```

## Build Workflow

1. Check for `.interface-design/system.md`
2. If present, apply it as source of truth
3. If absent, run exploration and proposal flow above
4. Build with explicit rationale for design system choices
5. Run craft checks before presenting
6. Offer to save reusable patterns

## Component Checkpoint (Mandatory)

Before implementing each meaningful component, state:

- Intent: who, action, feel
- Palette: chosen colors and why they fit product world
- Depth: borders/shadows/layering approach and why
- Surfaces: elevation scale and temperature strategy
- Typography: typeface choices and why
- Spacing: base unit

## Craft Foundations

### Subtle Layering

Keep hierarchy perceptible but quiet.

- Use a numbered elevation system
- Keep shifts small between levels
- Keep sidebars on canvas background with separation via subtle border
- Place dropdowns one level above parent surface
- Treat inputs as inset surfaces (often slightly darker than surrounding)

### Border System

Create border intensity levels:

- Soft separation
- Standard separation
- Emphasis
- Max emphasis (for focus)

Prefer low-opacity borders to avoid harsh framing.

### Infinite Expression

Do not output repeated template compositions.

Let architecture emerge from:
- Primary user task
- Data shape
- Product tone

### Color Lives Somewhere

Derive palette from the product world, not abstract style labels.

Use color intentionally for:
- Status
- Action
- Emphasis
- Identity

## Design System Principles

- Use token architecture mapped to primitives (foreground, background, border, brand, semantic)
- Build 4-level text hierarchy (primary, secondary, tertiary, muted)
- Define dedicated control tokens (control background, border, focus)
- Keep spacing on a consistent scale from one base unit
- Keep padding symmetric unless content requires asymmetry
- Choose one depth strategy and apply consistently
- Define radius scale by component role
- Treat typography as a system (size + weight + tracking)
- Give every interactive element full states (default, hover, active, focus, disabled)
- Include data states (loading, empty, error)

## Checks Before Presenting

Run all checks:

1. Swap test: Replace type/layout with defaults; if unchanged, design defaulted
2. Squint test: Hierarchy should remain readable, nothing should shout
3. Signature test: Identify 5 concrete places signature appears
4. Token test: Read token names aloud; they should sound product-specific

If any check fails, iterate before showing.

## Communication Rules

- Do not narrate internal modes or meta-process
- Lead with exploration and recommendation
- Ask for confirmation before final direction lock-in

## Persistence

After completing a task, offer:

```text
Want me to save these patterns for future sessions?
```

If user agrees, update `.interface-design/system.md` with:

- Direction and feel
- Depth strategy
- Spacing base unit
- Reusable component patterns

Save patterns when a component is reused 2+ times, broadly reusable, or has specific measurements worth preserving.

## Commands

- `/interface-design:status` - Show current system state
- `/interface-design:audit` - Check code against system
- `/interface-design:extract` - Extract reusable patterns from code
- `/interface-design:critique` - Critique craft and rebuild weak/defaulted parts

## Deep Dives

Read these only when needed:

- `references/principles.md` for deeper implementation guidance and examples
- `references/validation.md` for memory/update rules for `.interface-design/system.md`
- `references/critique.md` for post-build critique protocol
