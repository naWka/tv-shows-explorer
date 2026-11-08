import s from './Image.module.css'

type ImageProps = {
  src: string | null
  /** Файл покрупнее и условие экрана, при котором браузер берёт его вместо src, например `(min-width: 721px)`. */
  largeSrc?: string
  largeMedia?: string
  alt: string
  fallback: string
  fit: 'contain' | 'cover'
}

export function Image({ src, largeSrc, largeMedia, alt, fallback, fit }: ImageProps) {
  return src ? (
    // key по адресу: при смене картинки браузер не держит старую, пока грузится новая.
    <picture key={src} className={s.frame}>
      {largeSrc && largeMedia && <source media={largeMedia} srcSet={largeSrc} />}
      <img
        className={s.image}
        data-fit={fit}
        src={src}
        alt={alt}
        data-fallback={fallback}
        loading="lazy"
      />
    </picture>
  ) : (
    <div className={s.fallback}>{fallback}</div>
  )
}
