import { useState } from "react";
import { ImageOff } from "lucide-react";
import styles from "./ProjectCard.module.css";

type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
};

type Variant = "A" | "B";

/**
 * Two different designs controlled by image state.
 * - When image is OK => use `imageVariant`.
 * - When image fails => use `fallbackVariant`.
 */
type Props = {
  project: Project;
  imageVariant?: Variant; // default: "A"
  fallbackVariant?: Variant; // default: "B"
  className?: string; // extra classes (Tailwind)
};

export default function ProjectCard({
  project,
  imageVariant = "A",
  fallbackVariant = "B",
  className,
}: Props) {
  const [imgError, setImgError] = useState(false);
  const usingVariant: Variant = imgError ? fallbackVariant : imageVariant;

  const containerClass =
    usingVariant === "A"
      ? `${styles.card} ${styles.cardA}`
      : `${styles.card} ${styles.cardB}`;

  return (
    <article
      className={[
        "rounded-xl ring-1 ring-[var(--border)] bg-[var(--bg-elevated)] overflow-hidden",
        containerClass,
        className,
      ].join(" ")}
      aria-label={`Proyecto ${project.title}`}
    >
      {/* Media area */}
      {!imgError ? (
        <img
          src={project.cover}
          alt=""
          aria-hidden="true"
          className={styles.media}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={styles.fallbackBox} aria-hidden="true">
          <ImageOff className="w-8 h-8 text-[var(--fg-muted)]" />
        </div>
      )}

      {/* Content */}
      <div className={styles.body}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.description}</p>
      </div>
    </article>
  );
}
