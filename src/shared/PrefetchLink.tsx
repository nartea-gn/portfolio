import { Link, type LinkProps } from "react-router-dom";
import { useEffect, useRef } from "react";

/**
 * Network-aware prefetch policies:
 * - "always": always prefetch.
 * - "wifi-only": only when connection is unmetered / Wi-Fi (best-effort).
 * - "wifi-or-fast": Wi-Fi OR fast connection (4g / downlink > 2Mbps) and not save-data.
 * - "never": never prefetch.
 */
export type PrefetchPolicy = "always" | "wifi-only" | "wifi-or-fast" | "never";

type Props = LinkProps & {
  prefetch?: () => Promise<unknown>;
  rootMargin?: string; // viewport prefetch margin (default: "200px")
  prefetchPolicy?: PrefetchPolicy; // default: "wifi-or-fast"
};

export default function PrefetchLink({
  prefetch,
  onMouseEnter,
  onFocus,
  onPointerOver,
  onPointerDown,
  rootMargin = "200px",
  prefetchPolicy = "wifi-or-fast",
  ...props
}: Props) {
  const doneRef = useRef(false);
  const elRef = useRef<HTMLAnchorElement | null>(null);

  const canPrefetch = () => {
    if (!prefetch || prefetchPolicy === "never") return false;
    if (prefetchPolicy === "always") return true;

    // Best-effort Network Information API
    const navAny = navigator as any;
    const info =
      navAny?.connection ?? navAny?.mozConnection ?? navAny?.webkitConnection;

    // If unsupported, be conservative for wifi-only; permissive for wifi-or-fast.
    if (!info) return prefetchPolicy === "wifi-or-fast";

    const { effectiveType, saveData, downlink, type, metered } = info;
    const isMetered = Boolean(metered); // some browsers expose "metered"
    const isSaveData = Boolean(saveData); // user asked to save data
    const isWifiType =
      type === "wifi" || type === "ethernet" || type === "wimax";
    const isFast =
      effectiveType === "4g" || (typeof downlink === "number" && downlink >= 2);

    if (prefetchPolicy === "wifi-only") {
      // Prefer explicit wifi/ethernet and not metered/save-data.
      return (isWifiType || (!isMetered && isFast)) && !isSaveData;
    }

    // wifi-or-fast (default): allow fast & unmetered-ish connections, reject save-data.
    return !isSaveData && !isMetered && (isWifiType || isFast);
  };

  const runOnce = () => {
    if (doneRef.current || !canPrefetch()) return;
    doneRef.current = true;
    prefetch?.().catch(() => void 0);
  };

  // Prefetch on viewport (mobile/tablet friendly)
  useEffect(() => {
    if (!prefetch || doneRef.current || !elRef.current) return;

    const el = elRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            runOnce();
            io.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefetch, rootMargin, prefetchPolicy]);

  return (
    <Link
      ref={elRef}
      {...props}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        runOnce(); // desktop hover
      }}
      onFocus={(e) => {
        onFocus?.(e);
        runOnce(); // keyboard
      }}
      onPointerOver={(e) => {
        onPointerOver?.(e);
        runOnce(); // pointer hover
      }}
      onPointerDown={(e) => {
        onPointerDown?.(e);
        runOnce(); // touch tap (mobile/tablet)
      }}
      onTouchStart={() => runOnce()} // iOS redundancy
    />
  );
}
