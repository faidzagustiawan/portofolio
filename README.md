# faidzagustiawan.com

Personal portfolio of Faidz Agustiawan — a full-stack developer in Malang,
Indonesia. React SPA with a motion-led interface, backed by a PocketBase
instance that serves the project case studies.

**Live:** https://faidzagustiawan.com

## Stack

| Layer | Choice |
| --- | --- |
| Build | Vite 7, React 19 (React Compiler enabled) |
| Styling | Tailwind CSS v4, CSS custom properties for the token layer |
| Motion | Framer Motion, plus hand-rolled rAF loops for the marquees |
| Routing | React Router 7, lazy routes |
| Content | PocketBase REST (`/api/collections/projects/records`) |
| Media | Cloudflare R2 |
| Mail | EmailJS |
| Hosting | Vercel |

## Getting started

```bash
pnpm install
cp .env.example .env   # then fill in the values
pnpm dev
```

The app reads its configuration from `.env`. Only `VITE_`-prefixed variables
reach the browser bundle — never put a secret behind that prefix. The R2 keys
are used solely by `pnpm r2:sync`, which runs on your machine.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server |
| `pnpm build` | Regenerates `public/sitemap.xml` from PocketBase, then builds |
| `pnpm build:analyze` | Same, plus a rollup bundle treemap in `stats.html` |
| `pnpm preview` | Serves the production build locally |
| `pnpm lint` | ESLint over `src/` and the Node scripts |
| `pnpm sitemap` | Regenerates the sitemap only |
| `pnpm hero:build` | Re-derives the hero portrait from `scripts/source/` |
| `pnpm r2:sync` | Uploads local media to the R2 bucket |

## Content model

Projects live in the `projects` collection in PocketBase. PocketBase lowercases
column names, so the API returns `liveurl`, `nextprojectslug`, and
`visualdetails`; `src/lib/pb.js` is the single place that maps those onto the
camelCase shape the components use. Add new fields there, not in the components.

Fields the UI reads:

`slug`, `name`, `tagline`, `category`, `year`, `featured`, `image`, `video`,
`visualdetails`, `technologies`, `team`, `overview`, `challenge`, `approach`,
`solution`, `contribution`, `outcome`, `role`, `client`, `duration`, `color`,
`liveurl`, `githuburl`, `nextprojectslug`.

Every one of them is optional. A record with gaps renders as a shorter page
rather than a broken one — the case-study section numbers are derived from
whichever fields are filled in, and a project with no `image` or `video` gets a
generated placeholder built from its `color` and initials.

## Hero image

`public/hero/` holds the LCP portrait as AVIF and WebP at two widths. It is
generated from `scripts/source/FotoFaidz.svg` — a 3.3 MB wrapper around a photo
and a luminance mask — by `pnpm hero:build`, which composites the mask into a
real alpha channel and crops to the region the original SVG showed. Do not ship
the SVG itself; it was the single largest asset on the site.

## Conventions

- Design rules and the motion/cursor contracts live in [DESIGN.md](DESIGN.md).
- Tailwind classes that only exist in CMS data must be listed in the
  `@source inline(...)` line in `src/index.css`, or they will not be generated.
- Context files are split in two: `*-context.js` holds the context and its hook,
  `*Context.jsx` holds the provider. That keeps Fast Refresh working.
