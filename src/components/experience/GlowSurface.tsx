import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

/** Very faint warm-gold light that follows the cursor. Almost invisible. */
export function GlowSurface({
  children,
  className = "",
  as: Tag = "div",
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Tag
      ref={ref as never}
      className={`glow-surface ${className}`}
      // Pointer tracking is a hover affordance only — touch devices skip it,
      // which keeps scroll frames free on phones.
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "mouse") return;
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
