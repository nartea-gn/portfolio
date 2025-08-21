import { useMemo, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { worksRegistry, type MediaItem as Media } from "../../utils/works";
import styles from "./WorkSectionPage.module.css";

export default function WorkSectionPage() {
  const { slug } = useParams<{ slug: string }>();

  const work = useMemo(() => (slug ? worksRegistry[slug] : undefined), [slug]);

  // Scroll to top on mount (same UX as About)
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!work) {
    return <Navigate to="/#/not-found" replace />;
  }

  // Sort so that images come first and videos after
  const sortedItems: Media[] = useMemo(() => {
    const order = (t: Media["type"]) => (t === "image" ? 0 : 1);
    return [...work.items].sort((a, b) => order(a.type) - order(b.type));
  }, [work.items]);

  return (
    <main className="min-h-dvh pb-24" aria-labelledby="work-title">
      {/* Header card (same visual style as About boxes) */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10">
        <div
          className={`mx-auto max-w-5xl rounded-2xl ring-1 ring-[var(--border)] bg-[var(--bg-elevated)] shadow-sm ${styles.cardShine}`}
          role="region"
          aria-label="Work header"
        >
          <div className="p-6 md:p-8">
            <h1
              id="work-title"
              className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight"
            >
              {work.title}
            </h1>
            {work.subtitle && (
              <p className="mt-2 text-[var(--fg-muted)]">{work.subtitle}</p>
            )}
            {work.description && (
              <p className="mt-4 text-[var(--fg-muted)] leading-relaxed">
                {work.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Vertical feed: images first, then videos; each item in its own card */}
      <section
        className="px-4 sm:px-6 lg:px-8 mt-10"
        aria-label="Work media feed"
      >
        <div className="mx-auto max-w-5xl grid gap-6">
          {sortedItems.map((item) => (
            <article
              key={item.id}
              className={`rounded-2xl ring-1 ring-[var(--border)] bg-[var(--bg-elevated)] p-3 md:p-4 ${styles.fadeInUp}`}
            >
              {item.type === "image" ? (
                <figure>
                  <img
                    src={item.src}
                    alt={item.alt ?? ""}
                    loading="lazy"
                    width={item.width}
                    height={item.height}
                    className="w-full h-auto rounded-xl"
                  />
                  {item.caption && (
                    <figcaption className="mt-2 text-sm text-[var(--fg-muted)]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <figure>
                  <video
                    className="w-full h-auto rounded-xl"
                    src={item.src}
                    poster={item.poster}
                    controls={item.controls ?? true}
                    muted={item.muted ?? true}
                    loop={item.loop ?? false}
                    playsInline
                    preload={item.preload ?? "metadata"}
                    controlsList="nodownload noremoteplayback"
                    aria-label={item.caption ?? "Work video"}
                  />
                  {item.caption && (
                    <figcaption className="mt-2 text-sm text-[var(--fg-muted)]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
