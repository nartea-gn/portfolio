type Props = {
  src: string;
  poster?: string;
  caption?: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: "none" | "metadata" | "auto";
  ariaLabel?: string;
};

import styles from "./SmartVideo.module.css";

export default function SmartVideo({
  src,
  poster,
  caption,
  className = "",
  loop = false,
  muted = true,
  controls = true,
  preload = "metadata",
  ariaLabel,
}: Props) {
  return (
    <figure className={styles.figure}>
      <video
        className={[styles.video, className].filter(Boolean).join(" ")}
        src={src}
        poster={poster}
        controls={controls}
        muted={muted}
        loop={loop}
        playsInline
        preload={preload}
        controlsList="nodownload noremoteplayback"
        aria-label={ariaLabel}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
