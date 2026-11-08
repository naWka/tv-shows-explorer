import s from './Image.module.css'

type ImageProps = {
  src: string | null
  alt: string
  fallback: string
}

export function Image({ src, alt, fallback }: ImageProps) {
  return src ? (
    // key по адресу: при смене картинки браузер не держит старую, пока грузится новая.
    <img key={src} className={s.image} src={src} alt={alt} data-fallback={fallback} loading="lazy" />
  ) : (
    <div className={s.fallback}>{fallback}</div>
  )
}
