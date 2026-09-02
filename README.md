# faidzagustiawan.com

Personal portfolio of Faidz Agustiawan — a full-stack developer in Malang,
Indonesia. A motion-led React app, prerendered to static HTML at build time and
backed by a PocketBase instance that holds the project case studies.

**Live:** https://faidzagustiawan.com

## Stack

| Layer | Choice |
| --- | --- |
| Build | Vite 7, React 19 (React Compiler enabled) |
| Rendering | Static prerender per route via `react-dom/static`, hydrated in the browser |
| Styling | Tailwind CSS v4, CSS custom properties for the token layer |
| Motion | Framer Motion, plus hand-rolled rAF loops for the marquees |
| Routing | React Router 7, lazy routes |
| Content | PocketBase REST (`/api/collections/projects/records`) |
| Media | Cloudflare R2 |
| Mail | EmailJS |
| Hosting | Cloudflare Workers (static assets), via wrangler |

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
| `pnpm build` | Sitemap → client bundle → project OG cards → SSR bundle → prerender |
| `pnpm build:analyze` | Same, plus a rollup bundle treemap in `stats.html` |
| `pnpm preview` | Serves `dist/` with the host's file-resolution rules |
| `pnpm deploy` | `wrangler deploy` (CI runs this; needs Cloudflare credentials) |
| `pnpm lint` | ESLint over `src/` and the Node scripts |
| `pnpm sitemap` | Regenerates the sitemap only |
| `pnpm prerender` | Re-runs the prerender step against an existing build |
| `pnpm assets:build` | Rebuilds the hero portrait and the site OG card |
| `pnpm og:projects` | Rebuilds the per-project OG cards (needs a built `dist/`) |
| `pnpm r2:sync` | Uploads local media to the R2 bucket |

## Rendering

The site used to be a plain SPA, which meant link unfurlers — Twitter, Slack,
WhatsApp, LinkedIn — saw one generic head for every URL, because none of them
run JavaScript. `pnpm build` now prerenders every known route:

1. `scripts/generate-sitemap.js` writes `public/sitemap.xml` from PocketBase.
2. `vite build` produces the client bundle.
3. `scripts/build-project-cards.js` renders a 1200×630 OG card per project into
   `dist/og/`, reading the gradient colours back out of the compiled CSS
   because the class names live in the CMS.
4. `vite build --ssr` produces `dist-ssr/entry-server.js`.
5. `scripts/prerender.js` renders each route with `prerenderToNodeStream` and
   writes a real HTML file per URL, with its own title, description, canonical,
   Open Graph tags, and JSON-LD.

Notes on the pieces that are easy to break:

- **Head tags.** React 19 hoists `<title>`, `<meta>` and `<link>` itself and
  emits them at the head of the stream. Only the `#root` subtree is rendered,
  so `entry-server.jsx` lifts that leading run into `<head>`. The JSON-LD stays
  in the body on purpose — moving it would break hydration.
- **Data.** The feed is fetched once during the build and embedded as
  `<script type="application/json" id="__PROJECTS__">`. Prerendered pages make
  no PocketBase request at all; `ProjectsProvider` only fetches when that
  payload is missing or a retry is requested.
- **The fallback.** Each page stamps `data-route` on `<html>`. `main.jsx`
  hydrates only when that matches `location.pathname`; otherwise it clears the
  container and does a full client render. This matters because Cloudflare
  answers unknown paths with the prerendered *home page*, and hydrating that
  against another URL would mismatch every node. `dist/spa.html` is the same
  document with no prerendered markup, used when the host can be pointed at a
  dedicated shell (Vercel can; Workers Assets cannot). See Deployment.
- **The intro.** Only a synchronous script can read `localStorage` early enough
  to cover prerendered markup without a flash, so the decision lives in an
  inline script in `index.html` and React reads it back through
  `useIntroGate` (a `useSyncExternalStore`, which is what keeps hydration in
  step). `PageTransition` skips its reveal cover on the first mount for the
  same reason.

`pnpm preview` mimics the real resolution — exact file, then the directory's
`index.html`, then the host's fallback. `vite preview` does not, and would serve
the prerendered home page for every route.

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

Content changes need a rebuild to reach the prerendered HTML. Until then the
fallback serves them client-rendered, with the site-level head.

## Hero image

`public/hero/` holds the LCP portrait as AVIF and WebP at two widths. It is
generated from `scripts/source/FotoFaidz.svg` — a 3.3 MB wrapper around a photo
and a luminance mask — by `pnpm hero:build`, which composites the mask into a
real alpha channel and crops to the region the original SVG showed. Do not ship
the SVG itself; it was the single largest asset on the site.

## Conventions

- Design rules and the motion/cursor contracts live in [DESIGN.md](DESIGN.md).
- Tailwind classes that only exist in CMS data must be listed in the
  `@source inline(...)` line in `src/index.css`, or they will not be generated —
  and `build-project-cards.js` reads its colours from that same output.
- Context files are split in two: `*-context.js` holds the context and its hook,
  `*Context.jsx` holds the provider. That keeps Fast Refresh working.
- `src/AppRoot.jsx` is the tree both entries share. Anything below it must
  render identically on the server and in the browser, or hydration breaks.

## Deployment

Cloudflare Workers Builds runs `pnpm run build`, then `wrangler deploy`. The
whole config is [wrangler.toml](wrangler.toml): an assets-only Worker pointed at
`dist`, with no `main` entry.

Two things are easy to get wrong here:

- **`wrangler.toml` must exist.** Without it, `wrangler deploy` tries to infer
  the project and falls back to parsing `vite.config.js`, which fails with
  `Error parsing file`. The Vite config is not the problem — the missing
  wrangler config is. Reproduce with
  `mv wrangler.toml wrangler.toml.off && npx wrangler deploy --dry-run`.
- **`not_found_handling = "single-page-application"` answers unknown paths with
  the prerendered home page**, not with `spa.html`. `src/main.jsx` compares the
  `data-route` stamped on `<html>` against `location.pathname` and, when they
  differ, clears the container and does a full client render instead of
  hydrating — and refetches the feed, because a path the build did not know
  about is exactly the case where the embedded copy may be missing it.

Headers live in [public/\_headers](public/_headers) for Cloudflare. `vercel.json`
carries the same rules for a Vercel deploy; if you change one, change the other.
`pnpm preview` defaults to Cloudflare's resolution — set `HOST=vercel` to
exercise the `spa.html` fallback instead.
