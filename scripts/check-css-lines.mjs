import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const MAX_LINES = 120
const ROOT = 'src'

function findCssFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return findCssFiles(path)
    return entry.name.endsWith('.css') ? [path] : []
  })
}

const tooLong = findCssFiles(ROOT)
  .map((path) => ({ path, lines: readFileSync(path, 'utf8').trimEnd().split('\n').length }))
  .filter(({ lines }) => lines > MAX_LINES)

for (const { path, lines } of tooLong) {
  process.stderr.write(`${path}: ${lines} строк, максимум ${MAX_LINES}\n`)
}

if (tooLong.length > 0) process.exit(1)
