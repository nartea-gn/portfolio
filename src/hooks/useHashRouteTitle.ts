import { useEffect } from "react";

export function useHashRouteTitle(map: Record<string, string>) {
  useEffect(() => {
    const update = () => {
      const route = location.hash.replace("#", "") || "/";
      document.title = map[route] ?? map["/"] ?? "Portfolio";
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, [map]);
}
