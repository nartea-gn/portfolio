type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  className?: string;
  sizes?: string; // e.g. "(min-width: 1024px) 768px, 100vw"
  srcSet?: string; // provide if you export multiple widths
};

import styles from "./ResponsiveImage.module.css";

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
  sizes,
  srcSet,
}: Props) {
  const style =
    width && height ? { aspectRatio: `${width} / ${height}` } : undefined;

  return (
    <figure className={styles.figure}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        srcSet={srcSet}
        sizes={sizes ?? "(min-width: 1024px) 768px, 100vw"}
        style={style}
        className={[styles.img, className].filter(Boolean).join(" ")}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
