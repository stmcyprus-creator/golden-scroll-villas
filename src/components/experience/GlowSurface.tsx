import { useRef, type ReactNode } from "react";

/** Very faint warm-gold light that follows the cursor. Almost invisible. */
export function GlowSurface({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Tag
      ref={ref as never}
      className={`glow-surface ${className}`}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </Tag>
  );
}
