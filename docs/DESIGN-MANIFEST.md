# Design Manifest — PerfectBike (SYN-FE-DESIGN-001)

Original fictional brand, created for this assessment. Not affiliated with any real company.

## Brand

**Name:** PerfectBike — an urban bicycle rental and guided-tour company.
**Personality:** sophisticated, energetic, urban, adventurous, friendly, trustworthy.
**One line:** "The city, at your pace." (used sparingly — not on every page)

## Design plan

**Colour** — colourful but professional; blue/gold pairing avoids both the common
AI-generated warm-terracotta-on-cream look and the near-black-plus-neon look.

| Token | Light hex | Role |
|---|---|---|
| `--color-primary` | `#1F3F8C` (PerfectBike Ultramarine) | primary actions, links, brand marks |
| `--color-primary-soft` | `#EAF0FE` | primary tints, selected states |
| `--color-secondary` | `#E8A93B` (Marigold) | secondary actions, highlights |
| `--color-accent` | `#E15B4B` (Ember Coral) | sparing accent — badges, active markers |
| `--color-bg` | `#F7F5F0` (warm paper) | page background |
| `--color-surface` | `#FFFFFF` | card/panel surfaces |
| `--color-surface-elevated` | `#FFFFFF` w/ shadow | raised cards, modals |
| `--color-text` | `#1B2130` (ink) | body text |
| `--color-text-muted` | `#5B6478` | secondary text |
| `--color-border` | `#DCD7CC` | hairlines, dividers |
| `--color-success` | `#2F8F5B` | success states |
| `--color-warning` | `#B8791A` | warning states |
| `--color-danger` | `#C23B3B` | error/danger states |

Dark theme is a deliberate re-composition, not an inversion: near-charcoal surfaces
(`#14171F` / `#1B1F2A`), desaturated-but-still-present ultramarine/marigold, and a warmer
off-white text (`#EDEEF2`) rather than pure white. Full token set lives in `css/tokens.css`.

**Type**
- Display / headings: **Fraunces** (variable, optical-size + weight axis) — an expressive
  serif with editorial warmth, carries the "sophisticated/adventurous" personality. Headings
  compute to weight 600.
- Body / UI: **Inter** (variable, weight axis) — a highly legible humanist sans for body copy,
  forms, and dashboard density. Body computes to weight 400.
- Both are SIL Open Font License, sourced from the Google Fonts open-source repository
  (see `docs/ASSET-LICENCE-REGISTER.md`), packaged locally as variable fonts.

**Layout**
- Public marketing pages: asymmetrical editorial compositions — off-centre headline blocks
  against full-bleed cropped photography, alternating with centred, measure-constrained
  content sections (per the ~900px intro / 30ch heading / 78ch body rule).
- Dashboard: dense, left-aligned, grid-based utility layout — sidebar + content, no
  editorial asymmetry there; clarity over personality in the utility surface.
- Avoided by deliberate choice: all-caps eyebrow labels, single-word colour-accented
  headline words, numbered 01/02/03 markers outside genuinely sequential content (used only
  in "How it works" and tour itineraries), middle-dot meta strings, arrow-suffixed buttons.

**Principles**
1. One bold gesture per page — an oversized cropped photograph, an editorial pull-quote, or
   a large data readout — with everything else quiet and disciplined around it.
2. Sections read as answers to a specific visitor question (W13) — never restate the same
   point in new words to pad toward ten sections.
3. Motion supports meaning: entrance patterns vary deliberately per section (see
   `docs/MOTION-MANIFEST.md`), and interactive motion (hover, open, confirm) always shows
   what changed.
4. Numbers are real and traceable: 18/26/38 daily rates, 75 deposit, 150/210 tour prices,
   1–14 day / 1–7 day-extension rules — sourced once in `js/data.js`, never restated with
   different values elsewhere.
