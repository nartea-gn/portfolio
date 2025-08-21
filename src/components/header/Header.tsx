import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "../logo/Logo";
import { Menu } from "lucide-react";

type Props = { brand: string };

export default function Header({ brand }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleLinkClick = () => setDrawerOpen(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquear scroll SOLO en móvil cuando el drawer está abierto
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (drawerOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Cerrar drawer al pasar a ≥ md (resize)
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");

    // 1) Estado inicial (sin disparar el listener con un tipo distinto)
    if (mql.matches) setDrawerOpen(false);

    // 2) Listener tipado correctamente
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setDrawerOpen(false);
    };

    // 3) Soporte moderno + fallback (Safari antiguo)
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    // opcional: solo en móvil
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) setDrawerOpen(false);
  }, [location.pathname]); // ✅ se ejecuta en cada navegación

  const linkBase =
    "btn-outline px-3 py-1 rounded-xl text-sm inline-flex items-center gap-2";
  const active = "border-white/50 opacity-100";
  const inactive =
    "border-white/20 opacity-80 hover:opacity-100 hover:border-white/40";

  return (
    <header
      className={`gh-header ${isScrolled ? "gh-header--elevated" : ""} ${
        styles.header
      }`}
      role="banner"
    >
      {/* <div className="w-full h-16 flex items-center justify-between px-4"> */}
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label={brand}
          onClick={handleLinkClick}
        >
          <Logo />
          {/* <span className="text-lg font-semibold tracking-tight">{brand}</span> */}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main">
          <NavLink
            to="/about"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Sobre mí
          </NavLink>
        </nav>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="rounded-xl border border-white/20 px-3 py-1 text-sm"
            aria-label="Abrir menú"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
          >
            <Menu className="size-4" aria-hidden />
          </button>
        </div>
      </div>

      {/* Overlay global via Portal (cierra al click en cualquier zona fuera) */}
      {drawerOpen &&
        createPortal(
          <button
            type="button"
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            aria-label="Cerrar menú"
            onClick={() => setDrawerOpen(false)}
            tabIndex={-1}
          />,
          document.body
        )}

      {/* Drawer móvil (por encima del overlay) */}
      <aside
        id="mobile-drawer"
        className={`
          md:hidden
          ${styles.drawer}
          ${drawerOpen ? styles.drawerOpen : ""}
          ${drawerOpen ? "flex flex-col" : ""}
          z-60
        `}
        aria-hidden={!drawerOpen}
        hidden={!drawerOpen}
      >
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">{brand}</span>
          <button
            className="rounded-xl border border-white/20 px-3 py-1 text-sm"
            aria-label="Cerrar menú"
            onClick={() => setDrawerOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mt-2 flex flex-col gap-2" aria-label="Drawer">
          <NavLink
            to="/about"
            onClick={() => setDrawerOpen(false)}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Sobre mí
          </NavLink>
        </nav>
      </aside>
    </header>
  );
}
