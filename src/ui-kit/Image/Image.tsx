import s from './Image.module.css'

type ImageProps = {
  src: string | null
  alt: string
  fallback: string
  fit: 'contain' | 'cover'
}

export function Image({ src, alt, fallback, fit }: ImageProps) {
  return src ? (
    // key по адресу: при смене картинки браузер не держит старую, пока грузится новая.
    <img
      key={src}
      className={s.image}
      data-fit={fit}
      src={src}
      alt={alt}
      data-fallback={fallback}
      loading="lazy"
    />
  ) : (
    <div className={s.fallback}>{fallback}</div>
  )
}
