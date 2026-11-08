// Снимки экрана поиска для ревью удобства: поднимает Vite, открывает приложение в Chrome на разных размерах окна,
// вводит запрос, снимает видимую часть окна (то, что человек видит без прокрутки) и переключает страницу.
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

// Что из главного видно без прокрутки. Постер считается по нарисованной картинке, а не по рамке img.
function measure() {
  const vh = window.innerHeight
  const vw = window.innerWidth
  const inView = (r) => r.top >= 0 && r.left >= 0 && r.bottom <= vh + 0.5 && r.right <= vw + 0.5
  const box = (el) => (el ? el.getBoundingClientRect() : null)
  const pager = box(document.querySelector('main nav'))
  const posters = [...document.querySelectorAll('article img[data-fit="contain"], article img:not([data-fit])')]
  return {
    scrollHeight: document.documentElement.scrollHeight,
    horizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    searchInView: inView(box(document.querySelector('input'))),
    pager: pager ? { inView: inView(pager), top: Math.round(pager.top) } : 'нет',
    cards: [...document.querySelectorAll('article')].map((card, i) => {
      const img = posters[i]
      const title = card.querySelector('h2')
      const result = { title: title?.textContent, cardInView: inView(box(card)), titleInView: inView(box(title)) }
      if (!img || !img.naturalWidth) return { ...result, poster: 'нет картинки' }
      const r = img.getBoundingClientRect()
      const fit = getComputedStyle(img).objectFit
      const scale = Math.min(r.width / img.naturalWidth, r.height / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      const drawn = { top: r.top + (r.height - h) / 2, left: r.left + (r.width - w) / 2 }
      drawn.bottom = drawn.top + h
      drawn.right = drawn.left + w
      return {
        ...result,
        poster: fit === 'contain' ? 'целиком' : `обрезан (object-fit: ${fit})`,
        posterSize: `${Math.round(w)}x${Math.round(h)} в рамке ${Math.round(r.width)}x${Math.round(r.height)}`,
        posterInView: inView(drawn),
      }
    }),
  }
}

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
writeFileSync(join(values.out, 'report.json'), JSON.stringify(report, null, 2))

for (const e of report) {
  const posters = e.cards.map((c) => `${c.poster}${c.posterInView === false ? ', ниже края окна' : ''}`).join('; ')
  const pager = typeof e.pager === 'string' ? e.pager : e.pager.inView ? 'видна' : `за краем (top ${e.pager.top})`
  const sideways = e.horizontalScroll ? '; ЕСТЬ ГОРИЗОНТАЛЬНАЯ ПРОКРУТКА' : ''
  console.log(`${e.query} ${e.viewport}: страницы ${pager}; постеры: ${posters}${sideways}`)
}
console.log(`Снимки и report.json: ${values.out}`)
