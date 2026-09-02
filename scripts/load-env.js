import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * Loads the same configuration Vite would.
 *
 * `.env` is gitignored and holds the real secrets, so it does not exist in CI;
 * `.env.production` is committed and carries the public VITE_ values. Listing
 * `.env` first means a local override still wins, because dotenv does not
 * overwrite a key it has already set.
 */
config({
  path: [path.join(root, '.env'), path.join(root, '.env.production')],
  quiet: true,
})
