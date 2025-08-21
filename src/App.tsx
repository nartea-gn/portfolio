import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import NotFound from "./pages/notFound/NotFound";
import "./App.css";
import ErrorBoundary from "./shared/ErrorBoundary";
import { lazy } from "react";

const WorkSectionPage = lazy(() => import("./pages/work/WorkSectionPage"));

function App() {
  return (
    <>
      <div className="min-h-dvh flex flex-col">
        {/* Header NavBar */}
        <Header brand="Nartea GN" />

        {/* Rutas */}
        <main className="flex-1">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/work/:slug" element={<WorkSectionPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <footer className="px-5 py-6 text-center text-sm opacity-70">
          © {new Date().getFullYear()} Nartea GN. Todos los derechos
          reservados.
        </footer>
      </div>
    </>
  );
}
export default App;
