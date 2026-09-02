import { StaticRouter } from 'react-router-dom'
import { prerenderToNodeStream } from 'react-dom/static'
import AppRoot from '@/AppRoot'
import { mapProjectRecord } from '@/lib/pb'

const collect = (stream) =>
  new Promise((resolve, reject) => {
    let html = ''
    stream.on('data', (chunk) => {
      html += chunk
    })
    stream.on('end', () => resolve(html))
    stream.on('error', reject)
  })

// React 19 hoists <title>, <meta>, <link> and JSON-LD itself, and emits them at
// the head of the stream. Because only the #root subtree is rendered here —
// not a whole document — they arrive in the body and have to be lifted out.
const LEADING_HEAD_TAG = new RegExp(
  '^(?:' +
    '<title[^>]*>[\\s\\S]*?<\\/title>' +
    '|<meta\\b[^>]*>' +
    '|<link\\b[^>]*>' +
    '|<script type="application\\/ld\\+json"[^>]*>[\\s\\S]*?<\\/script>' +
    ')'
)

function liftHead(rendered) {
  let html = rendered
  const tags = []

  for (;;) {
    const match = html.match(LEADING_HEAD_TAG)
    if (!match) break
    tags.push(match[0])
    html = html.slice(match[0].length)
  }

  return { head: tags.join('\n  '), html }
}

/**
 * Renders one route to static HTML.
 *
 * prerenderToNodeStream, not renderToString: it waits for every Suspense
 * boundary to settle, which is what makes the lazily imported route components
 * resolve into real markup instead of a fallback.
 */
export async function render(url, projects) {
  const { prelude } = await prerenderToNodeStream(
    <AppRoot router={StaticRouter} routerProps={{ location: url }} initialProjects={projects} />
  )

  return liftHead(await collect(prelude))
}

/** Same mapping the browser applies, so prerendered and hydrated data match. */
export function mapProjects(records) {
  return (records || []).map(mapProjectRecord)
}
