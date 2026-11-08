import { readdirSync, readFileSync } from 'node:fs'
import { join, sep } from 'node:path'

// Вне ui-kit текст, кнопки, поля, ссылки, картинки и иконки — только через атомы (первое правило).
const RAW_TAG = /<(p|h[1-6]|span|em|strong|a|button|input|img|svg)[\s>/]/g
const ROOT = 'src'
const UI_KIT = join(ROOT, 'ui-kit') + sep

function findTsxFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) return findTsxFiles(path)
    return entry.name.endsWith('.tsx') ? [path] : []
  })
}

const found = findTsxFiles(ROOT)
  .filter((path) => !path.startsWith(UI_KIT))
  .flatMap((path) =>
    readFileSync(path, 'utf8')
      .split('\n')
      .flatMap((line, index) => [...line.matchAll(RAW_TAG)].map((match) => ({ path, line: index + 1, tag: match[1] }))),
  )

for (const { path, line, tag } of found) {
  process.stderr.write(`${path}:${line}: <${tag}> вне ui-kit, нужен атом\n`)
}

if (found.length > 0) process.exit(1)
