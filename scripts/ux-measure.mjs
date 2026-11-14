// Что из главного видно без прокрутки. Постер считается по нарисованной картинке, а не по рамке img.
export function measure() {
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
    favoritesInView: inView(box(document.querySelector('header button'))),
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
