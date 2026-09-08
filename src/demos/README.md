# Interactive demos

A demo is the project's own interface, rebuilt small enough to live in this
repository and wired to data that only exists in memory. Every control works —
forms submit, filters filter, records appear and disappear — and a reload wipes
the lot. It exists so a visitor can judge the work without being handed a URL
into a system that is not theirs to open.

## Contract

```
src/demos/<sandboxid>/index.jsx     default export: a React component
src/demos/<sandboxid>/seed.js       the fixtures it starts from
```

The component receives no props and must:

- hold all state locally (`useState` / `useReducer`); no fetch, no storage, no
  network of any kind
- reset completely when React remounts it — the preview chrome resets a demo by
  changing its `key`, so anything kept in a module-level variable will survive
  when it should not
- work from 360px upwards; it is rendered inline in the case study, not in a
  desktop-sized frame
- fake latency on anything that would have been a request (150–400ms). Without
  it the loading and empty states never appear, and those are part of the work
- honour `prefers-reduced-motion`, like the rest of the site

## Wiring one up

1. Build the folder.
2. Set `sandboxid` on the project record to the folder name.
3. Set `previewmode` to `sandbox` — or leave it on `auto`, which picks the
   sandbox as soon as a registered `sandboxid` is present.

Nothing else registers the demo: `registry.js` globs this directory.

## Why not the real frontend

A build of the real application with a mocked data layer is the more faithful
option, and where the code is yours to publish it is the better one — it belongs
on a separate origin and gets pointed at through `demourl` with `access: demo`.
This directory is for the cases where publishing the original is not on the
table: client work, or an application whose backend cannot be stubbed out
honestly. A rewritten flow under neutral branding says the same thing about the
work without shipping someone else's product.
