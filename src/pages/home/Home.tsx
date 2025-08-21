import styles from "./Home.module.css";
import { projects } from "../../utils/projects";
import PrefetchLink from "../../shared/PrefetchLink";
import ProjectCard from "../../components/projectCard/ProjectCard";
import portada from "../../assets/portada/Portada.png";

const prefetchWorkPage = () => import("../work/WorkSectionPage");

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={`mx-auto max-w-6xl px-5 ${styles.hero}`}>
        <div className="grid min-h-[60dvh] place-items-center text-center">
          <div className="space-y-5">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Nartea GN — Portfolio
            </h1>
            <img src={portada} alt="Portada" loading="lazy" />
            <p className="opacity-80 max-w-2xl mx-auto">
              Ilustración digital · Modelado 3D · Animación 3D · Renders &amp;
              Lighting
            </p>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="text-xl font-semibold mb-4">Proyectos destacados</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <PrefetchLink
              key={p.id}
              to={`/work/${p.slug}`}
              prefetch={prefetchWorkPage}
              prefetchPolicy="wifi-or-fast"
              rootMargin="256px"
              className="group block text-inherit focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--text)] focus-visible:ring-offset-2 rounded-xl"
              aria-label={`Abrir proyecto ${p.title}`}
            >
              <ProjectCard project={p} imageVariant="B" fallbackVariant="A" />
            </PrefetchLink>
          ))}
        </div>
      </section>
    </>
  );
}
