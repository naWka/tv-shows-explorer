// Снимки экрана поиска для ревью удобства: поднимает сервер и Vite, открывает приложение в Chrome на разных размерах окна,
// вводит запрос, снимает видимую часть окна (то, что человек видит без прокрутки), добавляет шоу в избранное,
// открывает панель избранного и переключает страницу. Порт 3001 должен быть свободен: остановите npm run dev.
// Рядом со снимками пишет report.json: что из главного видно без прокрутки и не обрезан ли постер.
//
//   node scripts/ux-shots.mjs --out /tmp/ux [--query 21 --query office]
//
// Chrome берётся установленный; другой браузер — переменная CHROME_PATH.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseArgs } from 'node:util'
import { chromium } from 'playwright-core'
import { createServer } from 'vite'
import app from '../server/app.ts'
import { measure } from './ux-measure.mjs'

const VIEWPORTS = [
  ['laptop-1280x720', 1280, 720],
  ['laptop-1366x768', 1366, 768],
  ['laptop-1440x900', 1440, 900],
  ['desktop-1920x1080', 1920, 1080],
  ['tablet-768x1024', 768, 1024],
  ['narrow-680x900', 680, 900],
  ['phone-390x844', 390, 844],
  ['phone-360x640', 360, 640],
  ['phone-side-844x390', 844, 390],
  ['phone-side-667x375', 667, 375],
]

const { values } = parseArgs({
  options: { out: { type: 'string' }, query: { type: 'string', multiple: true } },
})
if (!values.out) throw new Error('Нужен --out <папка для снимков>')
const queries = values.query ?? ['21', 'office']
mkdirSync(values.out, { recursive: true })

const api = app.listen(3001)
const server = await createServer({ logLevel: 'error', server: { port: 5310 } })
await server.listen()
const url = server.resolvedUrls.local[0]
// Полоса прокрутки видна и занимает место, как в Chrome на Windows и Linux: тогда видно, если страница шире окна
// (100vw полосу не учитывает). Chrome на macOS рисует полосу поверх страницы, поэтому её ширину задаёт стиль ниже.
const SCROLLBARS = { ignoreDefaultArgs: ['--hide-scrollbars'] }
const CLASSIC_SCROLLBAR = '::-webkit-scrollbar { width: 15px; height: 15px; background: #222 }'
const browser = process.env.CHROME_PATH
  ? await chromium.launch({ ...SCROLLBARS, executablePath: process.env.CHROME_PATH })
  : await chromium.launch({ ...SCROLLBARS, channel: 'chrome' })

const report = []
for (const query of queries) {
  for (const [name, width, height] of VIEWPORTS) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
    await page.goto(url)
    // На телефоне полоса прокрутки всегда поверх страницы, классическая — только в окнах компьютера.
    if (!name.startsWith('phone')) await page.addStyleTag({ content: CLASSIC_SCROLLBAR })
    await page.locator('input').fill(query)
    await page.waitForSelector('article, [role="status"]:not(:empty)', { timeout: 15000 }).catch(() => {})
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1500)
    const file = join(values.out, `${query}-${name}.png`)
    await page.screenshot({ path: file })
    const entry = { query, viewport: name, file, ...(await page.evaluate(measure)) }

    // Звёздочка первой карточки: на снимке сообщение и счётчик. Потом панель избранного, и шоу убираем обратно.
    await page.locator('main article button').first().click()
    await page.waitForTimeout(600)
    entry.starred = join(values.out, `${query}-${name}-starred.png`)
    await page.screenshot({ path: entry.starred })
    await page.locator('header button').first().click()
    await page.waitForTimeout(700)
    entry.favorites = join(values.out, `${query}-${name}-favorites.png`)
    await page.screenshot({ path: entry.favorites })
    await page.locator('dialog article button').first().click()
    await page.keyboard.press('Escape')
    await page.waitForTimeout(500)

    const next = page.locator('main nav button').last()
    if (await next.isEnabled().catch(() => false)) {
      await next.click()
      await page.waitForTimeout(1200)
      entry.page2 = join(values.out, `${query}-${name}-page2.png`)
      await page.screenshot({ path: entry.page2 })
    }
    report.push(entry)
    await page.close()
  }
}

await browser.close()
await server.close()
api.close()
writeFileSync(join(values.out, 'report.json'), JSON.stringify(report, null, 2))

for (const e of report) {
  const posters = e.cards.map((c) => `${c.poster}${c.posterInView === false ? ', ниже края окна' : ''}`).join('; ')
  const pager = typeof e.pager === 'string' ? e.pager : e.pager.inView ? 'видна' : `за краем (top ${e.pager.top})`
  const sideways = e.horizontalScroll ? '; ЕСТЬ ГОРИЗОНТАЛЬНАЯ ПРОКРУТКА' : ''
  console.log(`${e.query} ${e.viewport}: страницы ${pager}; постеры: ${posters}${sideways}`)
}
console.log(`Снимки и report.json: ${values.out}`)
