import type { HTMLAttributes } from "react";
import styles from "./Logo.module.css";

/**
 * Nartea GN logo (inline SVG).
 * - Inherits color via `currentColor` (controlled by parent text color).
 * - Size is controlled via className (we pass Header.module.css `.logo`).
 */
export default function Logo({
  className = "",
  ...rest
}: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      role="img"
      className={`${styles.root} ${className}`}
      {...rest}
    >
      {/* Removed Illustrator <defs>/<style>. We color via `fill="var(--link)"` */}
      <path
        className={styles.path}
        d="M704,296v47c-45.15.27-89.78-5.36-128.91,21.59-39.5,27.2-52.75,71.14-44.78,117.59,10.51,61.23,63.97,103.22,123.68,111.82l-.5-80h-39l-1.5-1.5v-40c0-.54,1.55-2.22,1-3.5h90l.04,134.54c-9.92,132.8-162.71,193.12-273.06,130.98-4.12-2.32-19.18-11.64-21.04-14.96-3.15-5.63-.91-14.28-.91-20.08,0-7.81-.5-15.63-.02-23.48,66.26,59.83,195.43,53.06,233.99-35-77.28-10.13-146.76-65.86-164.29-143.21l-105.7-123.8v267h-53v-342.5l1.5-1.5h56l102.49,119c13.39-66.28,68.71-108.13,133.68-117.83,29.6-4.42,60.42-1.16,90.33-2.17Z"
      />
    </svg>
  );
}
