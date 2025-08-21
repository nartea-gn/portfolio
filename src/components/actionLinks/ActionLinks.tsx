import React from "react";
import styles from "./ActionLinks.module.css";

export type ActionLinkItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  aria?: string;
  /** Visual style of the button-like link */
  variant?: "primary" | "secondary" | "accent" | "ghost";
  /** Force external behavior (target _blank). If undefined, it will be inferred from href. */
  external?: boolean;
  /** Set download attribute (for local files like CV) */
  download?: boolean | string;
};

export type ActionLinksProps = {
  links: Readonly<ActionLinkItem[]>;
  /** Container className override */
  className?: string;
  /** Semantic spacing between items (replaces gapClass). Default: "md" */
  gap?: "xs" | "sm" | "md" | "lg" | "xl";
  /** DEPRECATED: Tailwind gap-* string. Use `gap` instead. */
  gapClass?: string;
  /** Size of the items */
  size?: "sm" | "md";
  /** Rounded radius */
  rounded?: "md" | "xl" | "2xl" | "full";
  /** If true, renders a <ul>/<li> for semantics */
  asList?: boolean;
};

function isExternalHref(href: string): boolean {
  // Heurística simple: http(s), mailto, tel
  return (
    /^(https?:)?\/\//.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

/** Map semantic gap → numeric used in CSS data attribute. */
function gapToNumber(gap: NonNullable<ActionLinksProps["gap"]>): string {
  switch (gap) {
    case "xs":
      return "2"; // 0.5rem
    case "sm":
      return "3"; // 0.75rem
    case "md":
      return "4"; // 1rem
    case "lg":
      return "5"; // 1.25rem
    case "xl":
      return "6"; // 1.5rem
  }
}

/** Backward-compat: translate gapClass ("gap-3") → numeric. */
function deprecatedGapClassToNumber(gapClass?: string): string | null {
  if (!gapClass) return null;
  const m = gapClass.match(/gap-(\d+)/);
  return m?.[1] ?? null;
}

function classesFor(
  variant: NonNullable<ActionLinkItem["variant"]>,
  size: NonNullable<ActionLinksProps["size"]>,
  rounded: NonNullable<ActionLinksProps["rounded"]>
): string {
  const sizeCls = size === "sm" ? styles["size--sm"] : styles["size--md"];
  const radiusCls =
    rounded === "md"
      ? styles["rounded--md"]
      : rounded === "xl"
      ? styles["rounded--xl"]
      : rounded === "2xl"
      ? styles["rounded--2xl"]
      : styles["rounded--full"];

  const variantCls =
    variant === "primary"
      ? styles["variant--primary"]
      : variant === "secondary"
      ? styles["variant--secondary"]
      : variant === "accent"
      ? styles["variant--accent"]
      : styles["variant--ghost"];

  return [styles.item, sizeCls, radiusCls, variantCls].join(" ");
}

export default function ActionLinks({
  links,
  className = "",
  gap = "md",
  gapClass, // deprecated
  size = "md",
  rounded = "xl",
  asList = false,
}: ActionLinksProps) {
  const Container = asList ? "ul" : ("div" as const);
  const numericFromDeprecated = deprecatedGapClassToNumber(gapClass);
  const gapValue = numericFromDeprecated ?? gapToNumber(gap);

  return (
    <Container
      className={[styles.container, className].join(" ")}
      data-gap={gapValue}
    >
      {links.map((l) => {
        const variant = l.variant ?? "primary";
        const external = l.external ?? isExternalHref(l.href);
        const commonProps = {
          "aria-label": l.aria ?? l.label,
          className: classesFor(variant, size, rounded),
        };

        const content = (
          <>
            {l.icon}
            <span className={styles.label}>{l.label}</span>
          </>
        );

        if (asList) {
          return (
            <li key={l.label} className={styles.listItem}>
              <a
                href={l.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                {...commonProps}
                download={l.download}
              >
                {content}
              </a>
            </li>
          );
        }

        return (
          <a
            key={l.label}
            href={l.href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            {...commonProps}
            download={l.download}
          >
            {content}
          </a>
        );
      })}
    </Container>
  );
}
