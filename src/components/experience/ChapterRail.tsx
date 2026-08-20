import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { CHAPTERS, EASE, TIMING, useCinematics } from "./orchestrator";

/**
 * A quiet rail at the edge of the frame: where you are in the film,
 * named as chapters rather than as a scrollbar.
 */
export function ChapterRail() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const { enabled } = useCinematics();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: enabled ? 70 : 400,
    damping: enabled ? 24 : 40,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.nav
      aria-label="Главы"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
      transition={{ duration: TIMING.rise, ease: EASE }}
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      style={{ visibility: visible ? "visible" : "hidden" }}
    >
      <div className="relative flex gap-5">
        {/* The thread of the whole journey */}
        <div className="relative w-px shrink-0 bg-border/60">
          <motion.div
            style={{ scaleY: progress }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-primary/70 to-primary/25"
          />
        </div>

        <ol className="flex flex-col gap-5">
          {CHAPTERS.map((c) => {
            const on = active === c.id;
            return (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="pointer-events-auto group flex items-center gap-3"
                >
                  <motion.span
                    animate={{ opacity: on ? 1 : 0.35, width: on ? 18 : 8 }}
                    transition={{ duration: TIMING.surface, ease: EASE }}
                    className={`h-px ${on ? "bg-primary" : "bg-foreground/50"}`}
                  />
                  <motion.span
                    animate={{ opacity: on ? 1 : 0.4 }}
                    transition={{ duration: TIMING.surface, ease: EASE }}
                    className={`text-[0.6rem] uppercase tracking-[0.26em] transition-colors duration-700 group-hover:text-primary ${
                      on ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {c.label}
                  </motion.span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
}

/** Mobile: a hairline of progress with the current chapter's name. */
export function ChapterBar() {
  const [active, setActive] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const { enabled } = useCinematics();
  const progress = useSpring(scrollYProgress, {
    stiffness: enabled ? 80 : 400,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const label = CHAPTERS.find((c) => c.id === active)?.label;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 xl:hidden">
      <motion.div
        animate={{ opacity: label ? 1 : 0 }}
        transition={{ duration: TIMING.surface, ease: EASE }}
        className="flex justify-center pb-3"
      >
        <span className="rounded-full bg-ink/55 px-4 py-1.5 text-[0.55rem] uppercase tracking-[0.28em] text-primary backdrop-blur-md">
          {label ?? ""}
        </span>
      </motion.div>
      <div className="h-px w-full bg-border/50">
        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-primary/70" />
      </div>
    </div>
  );
}
