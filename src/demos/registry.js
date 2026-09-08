/**
 * Interactive demos that live inside this site rather than on a deployment of
 * their own.
 *
 * Each demo is a folder under `src/demos/` with an `index.jsx` whose default
 * export is a self-contained React component: real interaction, dummy data,
 * nothing persisted past a reload. A project opts in by putting the folder name
 * in its `sandboxid` field in PocketBase.
 *
 * The imports are lazy, so a visitor who never opens a demo never downloads
 * one. `import.meta.glob` — rather than a hand-written map — means adding a
 * folder is the whole registration step.
 */
const modules = import.meta.glob('./*/index.jsx')

const keyFor = (id) => `./${id}/index.jsx`

export const hasDemo = (id) => Boolean(id && modules[keyFor(id)])

/** Resolves to the demo's default export, or null when nothing is registered. */
export async function loadDemo(id) {
  const load = id ? modules[keyFor(id)] : null
  if (!load) return null
  const module = await load()
  return module.default ?? null
}
