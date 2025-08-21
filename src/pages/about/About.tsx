import { useEffect } from "react";
import { Linkedin, Mail, MapPin, Calendar } from "lucide-react";
import styles from "./About.module.css";
import ActionLinks, {
  type ActionLinkItem,
} from "../../components/actionLinks/ActionLinks";
import avatar from "../../assets/avatar/avatar.png";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const TIMELINE: TimelineItem[] = [
  {
    year: "2025",
    title: "Prácticas en Falke ESPORTS",
    description: "Realización de ilustraciones 2D y animaciones 2D y 3D.",
  },
];

const SKILLS = ["Blender", "Photoshop", "After Effects", "Canva"];

const LINKS: Readonly<ActionLinkItem[]> = [
  {
    href: "mailto:nacheva.g96@gmail.com",
    label: "Contáctame",
    aria: "Go to contact section",
    icon: <Mail className="size-4" aria-hidden />,
    external: false,
    variant: "primary",
  },
  {
    href: "https://www.linkedin.com/in/gergina-nacheva-228b09363",
    label: "LinkedIn",
    aria: "Open LinkedIn profile",
    icon: <Linkedin className="size-4" aria-hidden />,
    external: true,
    variant: "primary",
  },
];

export default function About() {
  // Optional: add a small “enter” animation on mount
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-dvh pb-24" aria-labelledby="about-title">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 pt-10">
        <div
          className={`mx-auto max-w-5xl rounded-2xl border bg-[var(--bg-canvas)]/60 backdrop-blur-md shadow-sm ${styles.cardShine}`}
          role="region"
          aria-label="About me hero"
        >
          <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 p-6 md:p-8 items-center">
            {/* Avatar (optional: replace src) */}
            <div className="justify-self-center md:justify-self-start">
              <div className="size-28 md:size-32 rounded-full ring-1 ring-[var(--border)] overflow-hidden">
                <img
                  src={avatar}
                  alt="Profile avatar"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Title + actions */}
            <div>
              <h1
                id="about-title"
                className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-tight"
              >
                Ilustradora digital, modeladora y animadora 2D y 3D
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)]">
                  <MapPin className="size-4" aria-hidden />
                  Madrid, España
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-[var(--fg-muted)]">
                  <Calendar className="size-4" aria-hidden />
                  Disponible
                </span>
              </div>
              <section className="mt-5 flex flex-wrap gap-3">
                <ActionLinks links={LINKS} />
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY + FACTS */}
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-5xl grid gap-6">
          <article
            className={`md:col-span-2 rounded-2xl p-6 md:p-8 ring-1 ring-[var(--border)] bg-[var(--bg-elevated)] ${styles.fadeInUp}`}
            aria-label="Short bio"
          >
            <h2 className="text-xl font-semibold">Sobre mi</h2>
            <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">
              Soy una artista 2D y 3D, graduada con Matrícula de Honor en
              Animación 3D, Juegos y Entornos Interactivos. Manejo tanto dibujo
              tradicional como digital, con una sólida base artística y gran
              capacidad para adaptarme rápidamente a nuevas herramientas y
              programas.
            </p>
            <p className="mt-3 leading-relaxed text-[var(--fg-muted)]">
              Día a día, sigo aprendiendo y buscando nuevas formas de poder
              mejorar profesionalmente.
            </p>
          </article>
        </div>
      </section>

      {/* SKILLS */}
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-5xl rounded-2xl p-6 md:p-8 ring-1 ring-[var(--border)] bg-[var(--bg-elevated)]">
          <h2 className="text-xl font-semibold">Herramientas</h2>
          <div
            role="list"
            className="mt-4 flex flex-wrap justify-center gap-2"
            aria-label="Skills list"
          >
            {SKILLS.map((skill) => (
              <span
                role="listitem"
                key={skill}
                className="px-3 py-1.5 text-sm rounded-full ring-1 ring-[var(--border)] bg-[var(--bg-canvas)]/70"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div className="mx-auto max-w-5xl rounded-2xl p-6 md:p-8 ring-1 ring-[var(--border)] bg-[var(--bg-elevated)]">
          <h2 className="text-xl font-semibold">Línea de tiempo</h2>

          <ol role="list" className="mt-6 relative pl-10">
            {/* Línea vertical */}
            <div
              className="absolute left-3 top-2 bottom-2 w-px bg-[var(--border)]"
              aria-hidden
            />
            {TIMELINE.map((t) => (
              <li key={t.year} className="relative mb-6 last:mb-0">
                {/* Fila 1: punto azul + año */}
                <div className="flex items-center gap-x-3">
                  <div
                    className="size-3 rounded-full bg-[var(--accent)]"
                    aria-hidden
                  />
                  <div className="grid grid-rows-[auto_auto_auto] gap-y-1 text-left">
                    {/* Año */}
                    <span className="text-sm text-[var(--fg-muted)]">
                      {t.year}
                    </span>

                    {/* Título */}
                    <span className="font-medium">{t.title}</span>

                    {/* Descripción */}
                    <p className="text-[var(--fg-muted)]">{t.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-4 sm:px-6 lg:px-8 mt-10">
        <div
          className={`mx-auto max-w-5xl rounded-2xl p-6 md:p-8 ring-1 ring-[var(--border)] bg-[var(--bg-elevated)] text-center ${styles.fadeInUp}`}
        >
          <h2 className="text-xl font-semibold">¿Hablamos?</h2>
          <p className="mt-2 text-[var(--fg-muted)]">
            Si te encaja mi perfil, estaré encantada de escuchar tu proyecto.
          </p>
          <section className="mt-5 flex justify-center gap-3">
            <ActionLinks links={LINKS} />
          </section>
        </div>
      </section>
    </main>
  );
}
