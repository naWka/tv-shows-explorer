import s from './Image.module.css'

type ImageProps = {
  src: string | null
  alt: string
  fallback: string
}

export function Image({ src, alt, fallback }: ImageProps) {
  return src ? (
    <img className={s.image} src={src} alt={alt} data-fallback={fallback} loading="lazy" />
  ) : (
    <div className={s.fallback}>{fallback}</div>
  )
}
