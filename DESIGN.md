# Design Direction

## Identity & Personality
- **Identity:** Minimalist, technical, motion-driven portfolio.
- **Personality:** Calm but deliberate. Code as a form of communication. Interfaces that guide rather than shout.

## Palette
The site ships **one theme**: a dark, monochrome canvas. There is no light mode,
so `src/index.css` defines the semantic tokens for that theme directly rather
than remapping them under a `.dark` class.

- **Background:** `neutral-950` — a focused, distraction-free canvas.
- **Text:** White for primary, `neutral-400` for secondary.
- **Borders:** `neutral-800`.
- **Accents:** Reserved for project-specific gradients (stored per record in
  PocketBase) and for a single status colour — `emerald-400` for availability.
  Nothing else in the chrome is coloured.

Because project gradients arrive from the CMS as strings, Tailwind cannot see
them at build time. `@source inline(...)` at the top of `src/index.css`
generates the palette they draw from — extend that line before adding a colour
family to a record.

## Typography
Three families, each with one job:

- **Space Grotesk (sans)** — headings, UI, structure.
- **Lora (serif)** — reading copy. Applied automatically to `<p>`.
- **Space Mono (mono)** — technical labels, eyebrows, step numbers, metadata.

Loaded from `index.html` with `preconnect`, not via CSS `@import`, so the faces
do not sit behind an extra round trip.

## Visual Techniques & Purpose
- **Icons (Lucide, Simple Icons):** thin, consistent stroke weight matching the
  minimalist technical aesthetic.
- **Arrows (→ / ↗):** only on CTAs that trigger external navigation or a major
  context switch. They signify forward momentum.
- **Border radius:** `rounded-xl` on buttons and structural elements — engineered
  rather than the default pill. `rounded-full` is reserved for genuinely
  circular elements (avatars, icon buttons, the cursor).

## Liveliness Dials
- **ENERGY 2 / RHYTHM 2 / MOTION 3**
  - **ENERGY 2:** clean and quiet, with strong contrast and clear focal points.
  - **RHYTHM 2:** structural grids maintained; sections vary to avoid monotony.
  - **MOTION 3:** scroll reveals, typography animation, and page transitions
    carry the eye.

## Motion contract
Motion is the site's signature, so it has an explicit opt-out rather than a
diluted one:

- `<MotionConfig reducedMotion="user">` in `src/main.jsx` disables every
  framer-motion transform and layout animation when the OS asks for less.
- A `prefers-reduced-motion` block in `src/index.css` flattens CSS transitions
  and animations.
- Hand-rolled loops (`ScrollVelocity`, `LogoLoop`, `Magnet`, `FloatingCV`) each
  check the query themselves, since `MotionConfig` cannot reach a raw rAF.
- The intro preloader and the page-transition cover are skipped entirely.

## Cursor contract
The custom cursor replaces the native one only where a precise pointer exists.
`CustomCursor` sets `has-custom-cursor` on `<html>`, and the CSS that hides the
native cursor is scoped to both that class and
`@media (hover: hover) and (pointer: fine)`. If the component never mounts, the
platform cursor stays.

## Link previews
Every route ships its own Open Graph card, generated at build time:

- **Site card** (`/og-cover.jpg`) — the portrait beside the name and role. Used
  for the home page, `/work`, and `/contact`.
- **Project cards** (`/og/<slug>.jpg`) — the project's own accent gradient under
  a dark veil, with its name, tagline, category, year, and top technologies.
  Built by `scripts/build-project-cards.js`, which resolves the CMS gradient
  class names against the compiled stylesheet, so a card always matches the
  colour the site actually renders.

Both are 1200×630. When a project eventually has a real `image` in PocketBase,
that wins over the generated card.
