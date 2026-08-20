import { useEffect, useRef } from "react";
import gal1 from "@/assets/gal-1.jpg";
import gal2 from "@/assets/gal-2.jpg";
import gal3 from "@/assets/gal-3.jpg";
import storyVilla from "@/assets/story-villa.jpg";
import { RevealText } from "./RevealText";

/** Inertial horizontal scrolling — the rail keeps gliding after you let go. */
function useRailInertia<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let velocity = 0;
    let raf = 0;
    let running = false;

    const glide = () => {
      velocity *= 0.94;
      if (Math.abs(velocity) < 0.06) {
        running = false;
        return;
      }
      el.scrollLeft += velocity;
      raf = requestAnimationFrame(glide);
    };

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const dx = e.deltaX * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      // Only hijack when the gesture is vertical — trackpad swipes stay native.
      if (Math.abs(dx) > Math.abs(dy)) return;
      const atStart = el.scrollLeft <= 0 && dy < 0;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 && dy > 0;
      if (atStart || atEnd) return;
      e.preventDefault();
      velocity += dy * 0.22;
      velocity = Math.max(-42, Math.min(42, velocity));
      if (!running) {
        running = true;
        raf = requestAnimationFrame(glide);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

const slides = [
  { image: gal1, caption: "Гостиная, Villa Serein", place: "Бодрум" },
  { image: gal2, caption: "Дворик с вековой оливой", place: "Калкан" },
  { image: storyVilla, caption: "Вечерняя терраса", place: "Кирения" },
  { image: gal3, caption: "Крыша, после заката", place: "Дубай" },
];

export function Gallery() {
  const railRef = useRailInertia<HTMLDivElement>();

  return (
    <section id="gallery" className="relative py-32 md:py-48">
      <div className="mx-auto mb-16 flex max-w-[1600px] flex-col gap-8 px-6 md:mb-24 md:flex-row md:items-end md:justify-between md:px-12">
        <div>
          <p className="eyebrow mb-8">Галерея</p>
          <h2 className="display-lg max-w-3xl">
            <RevealText text="Смотрите медленно. Листайте вбок." stagger={0.12} />
          </h2>
        </div>
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
          Скролл · вбок
        </p>
      </div>

      <div className="relative">
        <div
          ref={railRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-6 md:gap-14 md:px-12"
          style={{ scrollBehavior: "auto" }}
        >
          {slides.map((s) => (
            <figure
              key={s.caption}
              className="group relative w-[86vw] shrink-0 snap-center md:w-[72vw]"
            >
              <div className="overflow-hidden rounded-sm">
                <img
                  src={s.image}
                  alt={s.caption}
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={1000}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[2200ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.035]"
                />
              </div>
              <figcaption className="mt-6 flex items-baseline justify-between">
                <span className="text-sm text-foreground/75">{s.caption}</span>
                <span className="text-[0.6rem] uppercase tracking-[0.32em] text-primary/80">
                  {s.place}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        {/* Cinematic edge falloff */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-28" />
      </div>
    </section>
  );
}
